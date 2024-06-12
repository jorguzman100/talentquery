import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors({
  origin: ['https://talentquery.io', 'https://www.talentquery.io', 'http://localhost:3000'], // Replace with your actual domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://www.google-analytics.com"],
      connectSrc: ["'self'", "https://talentquery.io"],
    }
  }
}));

app.use(express.static(path.join(__dirname, 'public_html')));

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  console.log('Received message:', message);

  try {
    // Step 1: Create an Assistant
    const assistant = await openai.beta.assistants.create({
      name: "TalentQuery IT Startups Recruitment Agency Assistant",
      instructions: "You are an assistant that helps with IT recruitment queries.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o"
    });
    console.log('Assistant created:', assistant);

    // Step 2: Create a Thread
    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread);

    // Step 3: Add a Message to the Thread
    const userMessage = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: [{ type: 'text', text: message }]
    });
    console.log('User message added:', userMessage);

    // Step 4: Create a Run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });
    console.log('Run created:', run);

    // Polling for the completion of the run
    let runStatus = run.status;
    let runResult;

    while (runStatus !== 'completed' && runStatus !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
      runResult = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      runStatus = runResult.status;
    }

    if (runStatus === 'completed') {
      console.log('Run completed:', runResult);

      // Extracting assistant's response from the completed run
      const messages = await openai.beta.threads.messages.list(thread.id);
      const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');

      let assistantResponse = "";
      assistantMessages.forEach(msg => {
        msg.content.forEach(content => {
          if (content.type === 'text') {
            console.log('Assistant response:', content.text.value);
            assistantResponse += content.text.value + "\n";
          }
        });
      });

      console.log('assistantResponse: ', assistantResponse)

      res.json({reply: assistantResponse.trim()});


    } else {
      console.log('Run failed:', runResult);
      return res.status(500).json({ error: 'Run failed' });
    }

  } catch (error) {
    console.error('+++++++++ Message from your server side ++++++++++');
    console.error('Error in /chat endpoint:)', error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

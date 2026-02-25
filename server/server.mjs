import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const clientDir = path.join(rootDir, 'client');

dotenv.config({ path: path.join(rootDir, '.env') });

const app = express();
const port = Number(process.env.PORT) || 3000;
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  'http://localhost:3000,https://talentquery.io,https://www.talentquery.io')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json({ limit: '1mb' }));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://www.googletagmanager.com',
          'https://cdnjs.cloudflare.com',
          'https://cdn.jsdelivr.net',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', 'https://www.google-analytics.com'],
        connectSrc: [
          "'self'",
          'https://talentquery.io',
          'https://www.talentquery.io',
          'https://www.google-analytics.com',
          'https://region1.google-analytics.com',
        ],
      },
    },
  }),
);

// Serve the static website from the client folder.
app.use(express.static(clientDir));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/chat', async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    res.status(400).json({ error: 'Message is required.' });
    return;
  }

  if (!openai) {
    res.status(503).json({ error: 'Chatbot is not configured yet. Add OPENAI_API_KEY in .env.' });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: openaiModel,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content:
            'You are TalentQuery assistant. Help clients and candidates with questions about TalentQuery services, recruiting process, and contact options. Be concise, friendly, and professional.',
        },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      res.status(502).json({ error: 'Empty response from AI provider.' });
      return;
    }

    res.json({ reply });
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({ error: 'Unable to process chat request right now.' });
  }
});

app.listen(port, () => {
  console.log(`TalentQuery server running on port ${port}`);
  if (!openaiApiKey) {
    console.log('OPENAI_API_KEY not set. /chat will return a setup message until configured.');
  }
});

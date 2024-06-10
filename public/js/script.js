// script.js

// ********** Smooth scrolling **********

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




// ********** FAQs **********

let isAnimating = false;

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        if (isAnimating) return;

        const target = item.getAttribute('data-target');
        const newAnswer = document.querySelector(target);

        // If the clicked item is already active, do nothing
        if (newAnswer.classList.contains('active')) return;

        // Hide all answers first
        const activeAnswers = document.querySelectorAll('.faq-answer.active');
        activeAnswers.forEach(answer => {
            answer.style.opacity = '0';
            answer.style.maxHeight = '0';
            answer.classList.remove('active');
        });

        // Wait for the fade-out transition to complete
        isAnimating = true;
        setTimeout(() => {
            activeAnswers.forEach(answer => {
                answer.style.display = 'none';
            });

            // Show the new answer
            newAnswer.style.display = 'block';
            newAnswer.style.opacity = '0';
            newAnswer.style.maxHeight = '0';
            newAnswer.classList.add('active');

            // Start fade-in transition
            setTimeout(() => {
                newAnswer.style.opacity = '1';
                newAnswer.style.maxHeight = '300px'; /* Adjust as needed */
                isAnimating = false;
            }, 10); // Small delay to ensure the display style is set before starting the fade-in
        }, 500); // Match this duration with the CSS transition duration for the fade-out
    });
});




// ********** Scrollup Arrow Btn **********

document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const rootElement = document.documentElement;

    const handleScroll = () => {
        // Show button when page is scrolled down 200px from the top
        if (rootElement.scrollTop > 200) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    const scrollToTop = (e) => {
        e.preventDefault();
        rootElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    document.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', scrollToTop);
});




// ********** Chatbot ChatGPT OpenAI Assistant  **********

document.getElementById('chatbotButton').addEventListener('click', function () {
    document.getElementById('chatbotContainer').style.display = 'flex';
});

document.getElementById('closeChatbot').addEventListener('click', function () {
    document.getElementById('chatbotContainer').style.display = 'none';
});

document.getElementById('sendMessageButton').addEventListener('click', sendMessage);

document.getElementById('userMessage').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    if (userMessage.trim() !== '') {
        const chatBox = document.getElementById('chatBox');
        const userBubble = document.createElement('div');
        userBubble.classList.add('chat-message', 'user');
        userBubble.innerHTML = `<div class="message-bubble">${userMessage}</div>`;
        chatBox.appendChild(userBubble);
        document.getElementById('userMessage').value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        console.log('Sending message:', userMessage);

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            console.log('Received response:', data);

            const assistantBubble = document.createElement('div');
            assistantBubble.classList.add('chat-message', 'assistant');
            assistantBubble.innerHTML = `<div class="message-bubble">${data.reply}</div>`;
            chatBox.appendChild(assistantBubble);
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            const errorBubble = document.createElement('div');
            errorBubble.classList.add('chat-message', 'error');
            errorBubble.innerHTML = `<div class="message-bubble">Error: ${error.message}</div>`;
            chatBox.appendChild(errorBubble);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Emoji picker setup
    const emojiPicker = document.createElement('emoji-picker');
    document.body.appendChild(emojiPicker);
    emojiPicker.style.position = 'absolute';
    emojiPicker.style.display = 'none';
    emojiPicker.style.zIndex = '1000'; // Ensure it's above other elements
    console.log('Emoji picker element created and appended to DOM');

    const emojiButton = document.querySelector('.emoji-button');
    emojiButton.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Emoji button clicked');
        if (emojiPicker.style.display === 'block') {
            emojiPicker.style.display = 'none';
            console.log('Emoji picker hidden');
        } else {
            emojiPicker.style.display = 'block';
            const rect = emojiButton.getBoundingClientRect();
            emojiPicker.style.left = `${rect.left}px`;
            emojiPicker.style.top = `${rect.bottom}px`;
            console.log('Emoji picker shown at:', emojiPicker.style.left, emojiPicker.style.top);
        }
    });

    emojiPicker.addEventListener('emoji-click', event => {
        console.log('Emoji clicked:', event.detail);
        const input = document.querySelector('#userMessage');
        input.value += event.detail.unicode;
        emojiPicker.style.display = 'none';
        console.log('Emoji picker hidden after selection');
    });

    // Hide emoji picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!emojiPicker.contains(e.target) && !emojiButton.contains(e.target)) {
            emojiPicker.style.display = 'none';
            console.log('Emoji picker hidden on outside click');
        }
    });

    // File attachment setup
    const attachButton = document.querySelector('.attach-button');
    attachButton.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        fileInput.click();
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                alert('File selected: ' + file.name);
                // Handle the file upload logic here
            }
            document.body.removeChild(fileInput);
        });
    });
});






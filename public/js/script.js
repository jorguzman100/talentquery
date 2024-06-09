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




// ********** OpenAI Assistant Bot **********
// https://platform.openai.com/docs/assistants/overview?lang=node.js

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sendMessageButton').addEventListener('click', async () => {
        const message = document.getElementById('userMessage').value;

        console.log('Sending message:', message);

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            console.log('Received response:', data);
            document.getElementById('chatBox').innerHTML += `<p>User: ${message}</p><p>Assistant: ${data.reply}</p>`;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('chatBox').innerHTML += `<p>Error: ${error.message}</p>`;
        }
    });
});


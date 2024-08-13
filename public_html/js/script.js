// script.js

// ********** Initialize Google Analytics **********

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-E5DPBJ3KSE');



// ********** Charts **********
document.addEventListener('DOMContentLoaded', function () {
    var ctx1 = document.getElementById('talentShortageChart').getContext('2d');
    var talentShortageChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Talent Shortage', 'Other'],
            datasets: [{
                data: [26, 74],
                backgroundColor: ['rgba(165, 129, 224, 0.5)', 'rgba(165, 129, 224, 0.1)'], // $chartColor1
                borderColor: ['rgba(165, 129, 224, 1)', 'rgba(165, 129, 224, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '69%', // Make the chart thinner
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });

    var ctx2 = document.getElementById('skillsGapChart').getContext('2d');
    var skillsGapChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Struggle to Hire', 'Other'],
            datasets: [{
                data: [42, 58],
                backgroundColor: ['rgba(105, 49, 199, 0.5)', 'rgba(105, 49, 199, 0.1)'], // $chartColor2
                borderColor: ['rgba(105, 49, 199, 1)', 'rgba(105, 49, 199, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '69%', // Make the chart thinner
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });

    var ctx3 = document.getElementById('burnoutChart').getContext('2d');
    var burnoutChart = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ['Burnout', 'Other'],
            datasets: [{
                data: [48, 52],
                backgroundColor: ['rgba(147, 147, 237, 0.5)', 'rgba(147, 147, 237, 0.1)'], // $chartColor4
                borderColor: ['rgba(147, 147, 237, 1)', 'rgba(147, 147, 237, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '69%', // Make the chart thinner
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });

    var ctx4 = document.getElementById('retentionChart').getContext('2d');
    var retentionChart = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['Likely to Look for Another Job', 'Other'],
            datasets: [{
                data: [53, 47],
                backgroundColor: ['rgba(74, 76, 225, 0.5)', 'rgba(74, 76, 225, 0.1)'], // $chartColor5
                borderColor: ['rgba(74, 76, 225, 1)', 'rgba(74, 76, 225, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '69%', // Make the chart thinner
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
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

const apiUrl = window.location.hostname === 'localhost' ?
    'http://localhost:3000/chat' :
    (window.location.hostname === 'www.talentquery.io' ?
        'https://www.talentquery.io/chat' :
        'https://talentquery.io/chat');

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
            // const response = await fetch('https://talentquery.io/chat', { // Ensure this URL matches your backend
            const response = await fetch(apiUrl, { // Ensure this URL matches your backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

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





// ********** Google Analytics Event Tracking **********

// Smooth scrolling with event tracking
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the href attribute
        const href = this.getAttribute('href');

        // Check if href is valid and not just "#"
        if (href && href.length > 1) {
            // Try to find the element
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                gtag('event', 'navigation_click', {
                    event_category: 'Navigation',
                    event_label: href.substring(1)
                });
            } else {
                console.warn(`Element not found for selector: ${href}`);
            }
        } else {
            console.warn(`Invalid href: ${href}`);
        }
    });
});


// Jumbotron button click tracking
document.querySelectorAll('.jumbotron a.btn').forEach(button => {
    button.addEventListener('click', function () {
        gtag('event', 'jumbotron_click', {
            event_category: 'Jumbotron',
            event_label: this.textContent.trim()
        });
    });
});



// Contact Us section interaction tracking
document.querySelectorAll('#contact .contact-method, #contact h3, #contact p, #contact a').forEach(element => {
    element.addEventListener('click', function () {
        gtag('event', 'contact_us_interaction', {
            event_category: 'Contact Us',
            event_label: this.textContent.trim() || 'Contact Element'
        });
    });
});

// Track FAQ item clicks
let isAnimating2 = false;
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        if (isAnimating2) return;
        const target = item.getAttribute('data-target');
        const newAnswer = document.querySelector(target);
        if (newAnswer.classList.contains('active')) return;
        const activeAnswers = document.querySelectorAll('.faq-answer.active');
        activeAnswers.forEach(answer => {
            answer.style.opacity = '0';
            answer.style.maxHeight = '0';
            answer.classList.remove('active');
        });
        isAnimating2 = true;
        setTimeout(() => {
            activeAnswers.forEach(answer => {
                answer.style.display = 'none';
            });
            newAnswer.style.display = 'block';
            newAnswer.style.opacity = '0';
            newAnswer.style.maxHeight = '0';
            newAnswer.classList.add('active');
            setTimeout(() => {
                newAnswer.style.opacity = '1';
                newAnswer.style.maxHeight = '300px';
                isAnimating2 = false;
            }, 10);
        }, 500);

        gtag('event', 'faq_click', {
            event_category: 'FAQ',
            event_label: target
        });
    });
});

// Scroll to top button with event tracking
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const rootElement = document.documentElement;

    const handleScroll = () => {
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
        gtag('event', 'scroll_to_top', {
            event_category: 'Button',
            event_label: 'Scroll to Top'
        });
    };

    document.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', scrollToTop);
});


// Track all button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        gtag('event', 'button_click', {
            event_category: 'Button',
            event_label: this.textContent.trim()
        });
    });
});

// Track video plays
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', function () {
        gtag('event', 'video_play', {
            event_category: 'Video',
            event_label: this.getAttribute('id') || 'Video'
        });
    });
});

// Track WhatsApp clicks
document.querySelector('.whatsapp-button').addEventListener('click', function () {
    gtag('event', 'whatsapp_click', {
        event_category: 'WhatsApp',
        event_label: 'WhatsApp Button'
    });
});

// Track ChatGPT bot interactions
document.getElementById('chatbotButton').addEventListener('click', function () {
    gtag('event', 'chatbot_open', {
        event_category: 'ChatBot',
        event_label: 'ChatBot Open'
    });
});

document.getElementById('closeChatbot').addEventListener('click', function () {
    gtag('event', 'chatbot_close', {
        event_category: 'ChatBot',
        event_label: 'ChatBot Close'
    });
});

// Track all other clickable links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
        gtag('event', 'link_click', {
            event_category: 'Link',
            event_label: this.href
        });
    });
});
const CHAT_ENDPOINT = '/chat';

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initCharts();
  initFaqs();
  initScrollToTop();
  initChatbot();
  initEmojiPicker();
  initSmoothScroll();
  initTracking();
});

function byId(id) {
  return document.getElementById(id);
}

function trackEvent(name, details = {}) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', name, details);
}

function initLanguage() {
  const englishButton = byId('lang-en');
  const spanishButton = byId('lang-es');

  if (!englishButton || !spanishButton) {
    return;
  }

  const savedLanguage = localStorage.getItem('lang');
  const browserLanguage = navigator.language || navigator.userLanguage || 'en';
  const initialLanguage = (savedLanguage || browserLanguage).startsWith('es') ? 'es' : 'en';

  loadLanguageContent(initialLanguage);

  englishButton.addEventListener('click', () => changeLanguage('en'));
  spanishButton.addEventListener('click', () => changeLanguage('es'));
}

async function loadLanguageContent(lang) {
  try {
    const response = await fetch(`lang/content.${lang}.json`);

    if (!response.ok) {
      throw new Error(`Failed to load language file (${response.status})`);
    }

    const content = await response.json();

    for (const [id, text] of Object.entries(content)) {
      updateElement(id, text);
    }

    document.documentElement.lang = lang;
    updateLanguageButtons(lang);
  } catch (error) {
    console.error('Error loading language content:', error);
  }
}

function updateElement(id, text) {
  const element = byId(id);

  if (element) {
    element.innerHTML = text;
  }
}

function changeLanguage(lang) {
  localStorage.setItem('lang', lang);
  loadLanguageContent(lang);
}

function updateLanguageButtons(lang) {
  const englishButton = byId('lang-en');
  const spanishButton = byId('lang-es');

  if (!englishButton || !spanishButton) {
    return;
  }

  englishButton.classList.toggle('active', lang === 'en');
  spanishButton.classList.toggle('active', lang === 'es');
}

function initCharts() {
  if (typeof window.Chart === 'undefined') {
    return;
  }

  createDoughnutChart('talentShortageChart', 26, ['Talent Shortage', 'Other'], ['rgba(165, 129, 224, 0.5)', 'rgba(165, 129, 224, 0.1)'], ['rgba(165, 129, 224, 1)', 'rgba(165, 129, 224, 0.2)']);
  createDoughnutChart('skillsGapChart', 42, ['Struggle to Hire', 'Other'], ['rgba(105, 49, 199, 0.5)', 'rgba(105, 49, 199, 0.1)'], ['rgba(105, 49, 199, 1)', 'rgba(105, 49, 199, 0.2)']);
  createDoughnutChart('burnoutChart', 48, ['Burnout', 'Other'], ['rgba(147, 147, 237, 0.5)', 'rgba(147, 147, 237, 0.1)'], ['rgba(147, 147, 237, 1)', 'rgba(147, 147, 237, 0.2)']);
  createDoughnutChart('retentionChart', 53, ['Likely to Look for Another Job', 'Other'], ['rgba(74, 76, 225, 0.5)', 'rgba(74, 76, 225, 0.1)'], ['rgba(74, 76, 225, 1)', 'rgba(74, 76, 225, 0.2)']);
}

function createDoughnutChart(canvasId, value, labels, backgroundColor, borderColor) {
  const canvas = byId(canvasId);

  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');

  new window.Chart(context, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '69%',
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function initFaqs() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) {
    return;
  }

  let isAnimating = false;

  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (isAnimating) {
        return;
      }

      const targetSelector = item.getAttribute('data-target');
      const nextAnswer = targetSelector ? document.querySelector(targetSelector) : null;

      if (!nextAnswer || nextAnswer.classList.contains('active')) {
        return;
      }

      const activeAnswers = document.querySelectorAll('.faq-answer.active');

      activeAnswers.forEach((answer) => {
        answer.style.opacity = '0';
        answer.style.maxHeight = '0';
        answer.classList.remove('active');
      });

      isAnimating = true;

      setTimeout(() => {
        activeAnswers.forEach((answer) => {
          answer.style.display = 'none';
        });

        nextAnswer.style.display = 'block';
        nextAnswer.style.opacity = '0';
        nextAnswer.style.maxHeight = '0';
        nextAnswer.classList.add('active');

        setTimeout(() => {
          nextAnswer.style.opacity = '1';
          nextAnswer.style.maxHeight = '300px';
          isAnimating = false;
        }, 10);
      }, 500);

      trackEvent('faq_click', {
        event_category: 'FAQ',
        event_label: targetSelector || 'FAQ',
      });
    });
  });
}

function initScrollToTop() {
  const scrollToTopButton = byId('scrollToTopBtn');

  if (!scrollToTopButton) {
    return;
  }

  const rootElement = document.documentElement;

  document.addEventListener('scroll', () => {
    scrollToTopButton.classList.toggle('show', rootElement.scrollTop > 200);
  });

  scrollToTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    rootElement.scrollTo({ top: 0, behavior: 'smooth' });

    trackEvent('scroll_to_top', {
      event_category: 'Button',
      event_label: 'Scroll to Top',
    });
  });
}

function initChatbot() {
  const chatbotButton = byId('chatbotButton');
  const closeChatbotButton = byId('closeChatbot');
  const chatbotContainer = byId('chatbotContainer');
  const sendMessageButton = byId('sendMessageButton');
  const userMessageInput = byId('userMessage');

  if (!chatbotButton || !closeChatbotButton || !chatbotContainer || !sendMessageButton || !userMessageInput) {
    return;
  }

  chatbotButton.addEventListener('click', (event) => {
    event.preventDefault();
    chatbotContainer.style.display = 'flex';
    trackEvent('chatbot_open', {
      event_category: 'ChatBot',
      event_label: 'ChatBot Open',
    });
  });

  closeChatbotButton.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    trackEvent('chatbot_close', {
      event_category: 'ChatBot',
      event_label: 'ChatBot Close',
    });
  });

  sendMessageButton.addEventListener('click', sendMessage);

  userMessageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });
}

async function sendMessage() {
  const userMessageInput = byId('userMessage');
  const chatBox = byId('chatBox');
  const sendMessageButton = byId('sendMessageButton');

  if (!userMessageInput || !chatBox || !sendMessageButton) {
    return;
  }

  const message = userMessageInput.value.trim();

  if (!message) {
    return;
  }

  appendChatMessage(chatBox, 'user', message);
  userMessageInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  sendMessageButton.disabled = true;

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    appendChatMessage(chatBox, 'assistant', data.reply || 'No response received.');
  } catch (error) {
    appendChatMessage(chatBox, 'error', `Error: ${error.message}`);
  } finally {
    sendMessageButton.disabled = false;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function appendChatMessage(chatBox, role, text) {
  const messageRow = document.createElement('div');
  messageRow.classList.add('chat-message', role);

  const bubble = document.createElement('div');
  bubble.classList.add('message-bubble');
  bubble.textContent = text;

  messageRow.appendChild(bubble);
  chatBox.appendChild(messageRow);
}

function initEmojiPicker() {
  const emojiButton = document.querySelector('.emoji-button');
  const attachButton = document.querySelector('.attach-button');
  const userMessageInput = byId('userMessage');

  if (!emojiButton || !userMessageInput) {
    return;
  }

  const emojiPicker = document.createElement('emoji-picker');
  emojiPicker.style.position = 'absolute';
  emojiPicker.style.display = 'none';
  emojiPicker.style.zIndex = '1000';
  document.body.appendChild(emojiPicker);

  emojiButton.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = emojiPicker.style.display === 'block';

    if (isOpen) {
      emojiPicker.style.display = 'none';
      return;
    }

    const buttonRect = emojiButton.getBoundingClientRect();
    emojiPicker.style.left = `${buttonRect.left}px`;
    emojiPicker.style.top = `${buttonRect.bottom}px`;
    emojiPicker.style.display = 'block';
  });

  emojiPicker.addEventListener('emoji-click', (event) => {
    userMessageInput.value += event.detail.unicode;
    emojiPicker.style.display = 'none';
  });

  document.addEventListener('click', (event) => {
    if (!emojiPicker.contains(event.target) && !emojiButton.contains(event.target)) {
      emojiPicker.style.display = 'none';
    }
  });

  if (attachButton) {
    attachButton.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);
      fileInput.click();

      fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];

        if (file) {
          alert(`File selected: ${file.name}`);
        }

        document.body.removeChild(fileInput);
      });
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      trackEvent('navigation_click', {
        event_category: 'Navigation',
        event_label: href.slice(1),
      });
    });
  });
}

function initTracking() {
  document.querySelectorAll('.jumbotron a.btn').forEach((button) => {
    button.addEventListener('click', () => {
      trackEvent('jumbotron_click', {
        event_category: 'Jumbotron',
        event_label: button.textContent.trim(),
      });
    });
  });

  document.querySelectorAll('#contact .contact-method, #contact a').forEach((element) => {
    element.addEventListener('click', () => {
      trackEvent('contact_us_interaction', {
        event_category: 'Contact Us',
        event_label: element.textContent.trim() || 'Contact Element',
      });
    });
  });

  const whatsappButton = document.querySelector('.whatsapp-button');

  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      trackEvent('whatsapp_click', {
        event_category: 'WhatsApp',
        event_label: 'WhatsApp Button',
      });
    });
  }

  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      trackEvent('button_click', {
        event_category: 'Button',
        event_label: button.textContent.trim() || 'Button',
      });
    });
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener('click', () => {
      trackEvent('link_click', {
        event_category: 'Link',
        event_label: link.href,
      });
    });
  });
}

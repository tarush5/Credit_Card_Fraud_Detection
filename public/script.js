// Scroll to fraud detection form on hero button click
document.getElementById('scrollToDetectBtn').addEventListener('click', () => {
  const detectSection = document.getElementById('detect');
  detectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('cardNumber').focus();
});

// Handle fraud detection form submission
const form = document.getElementById('fraudDetectForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const formData = new FormData(form);
  const payload = {
    cardNumber: formData.get('cardNumber').replace(/\s+/g, ''),
    transactionAmount: parseFloat(formData.get('transactionAmount')),
    merchant: formData.get('merchant').trim(),
    transactionDate: formData.get('transactionDate'),
    location: formData.get('location').trim(),
  };

  // Show loading state
  result.hidden = false;
  result.textContent = 'Analyzing transaction...';
  result.classList.remove('result-fraud', 'result-safe');

  try {
    // Call backend fraud detection API
    const response = await fetch('/api/detect-fraud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Network response was not OK');
    const data = await response.json();

    if (data.fraud) {
      result.textContent = `⚠️ Warning: This transaction is likely fraudulent (confidence: ${(data.confidence * 100).toFixed(0)}%)`;
      result.classList.add('result-fraud');
      result.classList.remove('result-safe');
    } else {
      result.textContent = `✅ This transaction appears safe (confidence: ${(100 - data.confidence * 100).toFixed(0)}%)`;
      result.classList.add('result-safe');
      result.classList.remove('result-fraud');
    }
  } catch (error) {
    result.textContent = '❌ Error analyzing transaction. Please try again later.';
    result.classList.remove('result-fraud', 'result-safe');
    console.error(error);
  }
});

// Chatbot widget functionality
const chatbotContainer = document.getElementById('chatbot');
const chatbotToggleBtn = document.getElementById('toggleChatbot');
const chatbotCloseBtn = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotForm = document.getElementById('chatbotForm');
const chatInput = document.getElementById('chatInput');

function addChatMessage(message, sender = 'bot') {
  const messageEl = document.createElement('div');
  messageEl.className = `chatbot-message ${sender}`;
  messageEl.textContent = message;
  chatbotMessages.appendChild(messageEl);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotToggleBtn.addEventListener('click', () => {
  chatbotContainer.classList.remove('closed');
  chatbotToggleBtn.style.display = 'none';
  chatInput.focus();
});

chatbotCloseBtn.addEventListener('click', () => {
  chatbotContainer.classList.add('closed');
  chatbotToggleBtn.style.display = 'flex';
  chatbotToggleBtn.focus();
});

chatbotForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  addChatMessage(message, 'user');
  chatInput.value = '';

  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Network response was not OK');
    const data = await response.json();
    addChatMessage(data.reply || "Sorry, I didn't understand that. Can you please rephrase?", 'bot');
  } catch (error) {
    addChatMessage('❌ Sorry, the chatbot is currently unavailable.', 'bot');
    console.error(error);
  }
});

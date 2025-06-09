import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve directory path (ES module support)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fraud detection logic (same as frontend simulation but backend side)
function detectFraud(data) {
  const suspiciousLocations = ['Unknown', 'Narnia', 'Atlantis', 'Gotham'];

  let fraudScore = 0;

  if (data.transactionAmount > 1000) {
    fraudScore += 0.4;
  }

  if (
    typeof data.location === 'string' &&
    suspiciousLocations.some((loc) =>
      data.location.toLowerCase().includes(loc.toLowerCase())
    )
  ) {
    fraudScore += 0.35;
  }

  if (typeof data.cardNumber === 'string' && data.cardNumber.startsWith('0000')) {
    fraudScore += 0.6;
  }

  try {
    const t = new Date(data.transactionDate);
    const hour = t.getUTCHours();
    if (hour >= 22 || hour < 6) {
      fraudScore += 0.25;
    }
  } catch {
    // Invalid date, do nothing
  }

  fraudScore = Math.min(fraudScore, 1);

  return {
    fraud: fraudScore > 0.5,
    confidence: fraudScore,
  };
}

// Chatbot knowledge base keywords and replies
const chatbotKnowledgeBase = [
  {
    keywords: ['fraud', 'detect', 'detection'],
    reply:
      'Our system uses advanced AI models to detect credit card fraud in real time.',
  },
  {
    keywords: ['how', 'work'],
    reply:
      'The fraud detection analyzes transaction patterns, location, amount, and time to identify suspicious activity.',
  },
  {
    keywords: ['accuracy', 'false', 'alerts'],
    reply:
      'We have trained our AI to minimize false alerts, providing accurate fraud predictions.',
  },
  {
    keywords: ['secure', 'privacy', 'data'],
    reply: 'Your data is completely secure and we follow strict privacy guidelines.',
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    reply:
      'Hello! How can I assist you with credit card fraud detection today?',
  },
];

// Helper to find chatbot reply based on keywords
function findChatbotReply(input) {
  const lowerInput = input.toLowerCase();
  for (const kb of chatbotKnowledgeBase) {
    if (kb.keywords.some((k) => lowerInput.includes(k))) {
      return kb.reply;
    }
  }
  return "Sorry, I didn't understand that. Can you please rephrase?";
}

// API Endpoint to detect fraud
app.post('/api/detect-fraud', (req, res) => {
  const data = req.body;
  if (
    !data ||
    typeof data.cardNumber !== 'string' ||
    typeof data.transactionAmount !== 'number' ||
    !data.transactionDate ||
    typeof data.location !== 'string' ||
    typeof data.merchant !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    const prediction = detectFraud(data);
    return res.json(prediction);
  } catch (err) {
    console.error('Fraud detection error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API Endpoint for chatbot interaction
app.post('/api/chatbot', (req, res) => {
  const message = req.body?.message;
  if (typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    const reply = findChatbotReply(message);
    return res.json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Fallback route: Serve index.html for all other non-API routes (SPA style)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

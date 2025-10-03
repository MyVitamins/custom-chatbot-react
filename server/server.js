require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// BotDojo API configuration
const BOTDOJO_API_KEY = process.env.BOTDOJO_API_KEY || 'your-api-key-here';
const BOTDOJO_ENDPOINT = process.env.BOTDOJO_ENDPOINT || 'https://api.botdojo.com/v1/chat';

// Function to normalize BotDojo response into our message format
function normalizeBotDojoResponse(botdojoResponse) {
  const messages = [];
  
  // Handle different response structures from BotDojo
  if (botdojoResponse.messages && Array.isArray(botdojoResponse.messages)) {
    // If BotDojo returns an array of messages
    botdojoResponse.messages.forEach(msg => {
      messages.push({
        role: 'bot',
        type: msg.type || 'text',
        content: msg.content || msg.text || msg.message
      });
    });
  } else if (botdojoResponse.text || botdojoResponse.message) {
    // If BotDojo returns a simple text response
    messages.push({
      role: 'bot',
      type: 'text',
      content: botdojoResponse.text || botdojoResponse.message
    });
  } else if (botdojoResponse.response) {
    // If BotDojo wraps response in a 'response' field
    if (Array.isArray(botdojoResponse.response)) {
      botdojoResponse.response.forEach(msg => {
        messages.push({
          role: 'bot',
          type: msg.type || 'text',
          content: msg.content || msg.text || msg.message
        });
      });
    } else {
      messages.push({
        role: 'bot',
        type: 'text',
        content: botdojoResponse.response
      });
    }
  } else {
    // Fallback for unknown response structure
    messages.push({
      role: 'bot',
      type: 'text',
      content: JSON.stringify(botdojoResponse)
    });
  }
  
  return messages;
}

// POST /chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    console.log('Received message:', message);

    // Call BotDojo API
    const botdojoResponse = await fetch(BOTDOJO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BOTDOJO_API_KEY}`,
        // Add other headers as required by BotDojo API
      },
      body: JSON.stringify({
        message: message,
        // Add other parameters as required by BotDojo API
      })
    });

    if (!botdojoResponse.ok) {
      throw new Error(`BotDojo API error: ${botdojoResponse.status} ${botdojoResponse.statusText}`);
    }

    const botdojoData = await botdojoResponse.json();
    console.log('BotDojo response:', botdojoData);

    // Normalize the response
    const messages = normalizeBotDojoResponse(botdojoData);

    // Return normalized response
    res.json({ messages });

  } catch (error) {
    console.error('Error processing chat request:', error);
    
    // Return error message in our format
    res.json({
      messages: [{
        role: 'bot',
        type: 'text',
        content: `Sorry, there was an error processing your message: ${error.message}`
      }]
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/chat`);
  console.log('Make sure to set BOTDOJO_API_KEY and BOTDOJO_ENDPOINT environment variables');
});

module.exports = app;

import express from 'express';
import { resolve } from 'path';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model fallback order
const MODEL_FALLBACK_ORDER = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite', 
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash'
];

// Function to get model with fallback
function getModelWithFallback(modelIndex = 0) {
  const modelName = MODEL_FALLBACK_ORDER[modelIndex];
  console.log(`[${new Date().toISOString()}] Using model: ${modelName}`);
  
  return genAI.getGenerativeModel({ 
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 150,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });
}

// Function to check if error is rate limit or overload
function isRateLimitOrOverloadError(error) {
  const errorMessage = error.message?.toLowerCase() || '';
  const errorCode = error.status || error.code;
  
  // Check for rate limit (429) or service unavailable (503) errors
  if (errorCode === 429 || errorCode === 503) {
    return true;
  }
  
  // Check for common overload/rate limit error messages
  const overloadKeywords = [
    'rate limit',
    'quota exceeded',
    'too many requests',
    'service unavailable',
    'overloaded',
    'resource exhausted',
    'temporarily unavailable'
  ];
  
  return overloadKeywords.some(keyword => errorMessage.includes(keyword));
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('static'));
app.use(express.json());

// Store chat histories in Gemini API format (in production, use a proper database)
const chatHistories = new Map();

app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;
    
    console.log(`[${new Date().toISOString()}] Received message:`, { message, sessionId });
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create chat history for this session
    let history = chatHistories.get(sessionId);
    
    if (!history) {
      // Initialize new chat history with system prompt
      history = [
        {
          role: "user",
          parts: [{ text: "sistem: kamu adalah customer service dari coffee shop, selalu hangat kepada customer, dan selalu beri jawaban kurang dari 1 kalimat" }],
        },
        {
          role: "model",
          parts: [{ text: "Siap! Saya akan membantu Anda sebagai customer service coffee shop yang ramah. ☕" }],
        },
      ];
      chatHistories.set(sessionId, history);
    }

    // Add user message to history
    history.push({
      role: "user",
      parts: [{ text: message }]
    });

    console.log(`[${new Date().toISOString()}] Chat history length:`, history.length);

    // Retry mechanism for API calls
    let text = '';
    let modelIndex = 0;
    const maxModelFallbacks = MODEL_FALLBACK_ORDER.length;
    
    while (modelIndex < maxModelFallbacks) {
      try {
        console.log(`[${new Date().toISOString()}] Trying model ${modelIndex + 1}/${maxModelFallbacks}: ${MODEL_FALLBACK_ORDER[modelIndex]}`);
        
        // Get model for current attempt
        const model = getModelWithFallback(modelIndex);
        
        // Create chat with current history  
        const chat = model.startChat({
          history: history.slice(0, -1) // Don't include the current message in history
        });

        // Get response from model
        const result = await chat.sendMessage(message);
        const response = result.response;
        text = response.text();
        
        console.log(`[${new Date().toISOString()}] Raw response:`, text);
        
        // Check if response is empty or just whitespace
        if (!text || text.trim().length === 0) {
          throw new Error('Empty response from API');
        }
        
        // Success - break out of retry loop
        break;
        
      } catch (apiError) {
        console.error(`[${new Date().toISOString()}] API Error with ${MODEL_FALLBACK_ORDER[modelIndex]}:`, apiError.message);
        
        // Check if this is a rate limit or overload error
        const shouldFallback = isRateLimitOrOverloadError(apiError);
        
        if (shouldFallback) {
          console.log(`[${new Date().toISOString()}] Rate limit/overload detected, trying next model...`);
          modelIndex++;
          
          if (modelIndex < maxModelFallbacks) {
            // Wait before trying next model
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
        } else {
          // For non-rate-limit errors, try the same model once more
          console.log(`[${new Date().toISOString()}] Non-rate-limit error, retrying same model once...`);
          modelIndex++;
          
          if (modelIndex < maxModelFallbacks) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
        }
        
        if (modelIndex >= maxModelFallbacks) {
          // Remove the user message from history since we couldn't get a response
          history.pop();
          chatHistories.set(sessionId, history);
          
          throw new Error(`Failed to get response after trying all ${maxModelFallbacks} models. Last error: ${apiError.message}`);
        }
      }
    }
    
    // Ensure we have a valid response
    if (!text || text.trim().length === 0) {
      // Remove the user message from history since we couldn't get a response
      history.pop();
      chatHistories.set(sessionId, history);
      
      return res.status(500).json({ 
        error: 'Maaf, saya tidak bisa memberikan respons saat ini. Silakan coba lagi.' 
      });
    }
    
    console.log(`[${new Date().toISOString()}] Final response:`, text);

    // Add model response to history
    history.push({
      role: "model",
      parts: [{ text: text }]
    });

    // Update stored history
    chatHistories.set(sessionId, history);
    
    console.log(`[${new Date().toISOString()}] Response sent successfully`);

    res.json({ 
      response: text,
      sessionId: sessionId 
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Server Error:`, error);
    res.status(500).json({ 
      error: 'Maaf, terjadi kesalahan sistem. Silakan coba lagi dalam beberapa saat.' 
    });
  }
});

// Optional: Add endpoint to get chat history
app.get('/chat/:sessionId/history', (req, res) => {
  const { sessionId } = req.params;
  const history = chatHistories.get(sessionId);
  
  if (!history) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({ 
    sessionId: sessionId,
    history: history 
  });
});

// Optional: Add endpoint to clear chat history
app.delete('/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const deleted = chatHistories.delete(sessionId);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({ 
    message: 'Chat history cleared',
    sessionId: sessionId 
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Make sure to set GEMINI_API_KEY environment variable');
});
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const newConversationBtn = document.getElementById('new-conversation-btn');

// Generate unique session ID for this browser session
let sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Function to generate new session ID
function generateNewSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Function to clear chat box
function clearChatBox() {
  chatBox.innerHTML = '';
}

// Function to start new conversation
function startNewConversation() {
  sessionId = generateNewSessionId();
  clearChatBox();
  appendMessage('bot', 'Halo! Selamat datang di coffee shop kami! ☕ Ada yang bisa saya bantu?');
}

// New conversation button event listener
newConversationBtn.addEventListener('click', startNewConversation);

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  appendMessage('user', userMessage);
  input.value = '';

  // Show typing indicator
  const typingIndicator = appendMessage('bot', 'Mengetik...');
  
  // Disable form while processing
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Mengirim...';
  input.disabled = true;
  
  try {
    // Send message to server
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId: sessionId
      }),
    });

    const data = await response.json();
    
    // Remove typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      chatBox.removeChild(typingIndicator);
    }
    
    if (response.ok) {
      // Check if response is empty
      if (!data.response || data.response.trim().length === 0) {
        appendMessage('bot', 'Maaf, saya tidak mendapat respons yang valid. Silakan coba lagi.');
      } else {
        // Show bot response
        appendMessage('bot', data.response);
      }
    } else {
      // Show error message
      appendMessage('bot', data.error || 'Terjadi kesalahan, silakan coba lagi.');
    }
    
  } catch (error) {
    console.error('Error:', error);
    // Remove typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      chatBox.removeChild(typingIndicator);
    }
    appendMessage('bot', 'Koneksi bermasalah, silakan coba lagi dalam beberapa saat.');
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    input.disabled = false;
    input.focus();
  }
});

function appendMessage(sender, text) {
  const messageContainer = document.createElement('div');
  messageContainer.style.width = '100%';
  messageContainer.style.overflow = 'hidden';
  
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  
  messageContainer.appendChild(msg);
  chatBox.appendChild(messageContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  return messageContainer;
}

// Add welcome message when page loads
window.addEventListener('load', () => {
  appendMessage('bot', 'Halo! Selamat datang di coffee shop kami! ☕ Ada yang bisa saya bantu?');
});
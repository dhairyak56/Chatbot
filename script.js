// Bots first message
function addBotMessage(messageText) {
    const chatDisplay = document.getElementById('chatDisplay');
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.textContent = messageText;
    chatDisplay.appendChild(botMessage);

    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }

//send button
document.getElementById('sendButton').addEventListener('click', sendMessage);
//enter keypress functionality
document.getElementById('messageInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        const messageInput = document.getElementById('messageInput');
        const currentValue = messageInput.value;
        messageInput.value = currentValue + '\n'; 
        event.preventDefault(); 
      } else {
        sendMessage(); 
        event.preventDefault();
      }
    }
  });
  
//send button functionality
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        const chatDisplay = document.getElementById('chatDisplay');
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = `${message}`;
        chatDisplay.appendChild(userMessage);

        // Save user message to array
        chatMessages.push({ sender: `User ${userID}`, text: message });

        messageInput.value = '';
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        addBotMessage("That's interesting! Tell me more.");
    }
}

function addBotMessage(botMessage) {
    const chatDisplay = document.getElementById('chatDisplay');
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('message', 'bot-message');
    botMessageDiv.textContent = botMessage;
    chatDisplay.appendChild(botMessageDiv);

    // Save bot message to array
    chatMessages.push({ sender: "Bot", text: botMessage });

    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}


document.addEventListener('DOMContentLoaded',() => {
    addBotMessage("Hello there! Welcome to Mirror XR, nice to meet you.");
  });


const userID = Math.floor(Math.random() * 1000000); // Random 6-digit ID
console.log("User ID:", userID); // For debugging
  

const chatMessages = [];
function downloadCSV() {
    const csvContent = chatMessages
        .map(msg => `${msg.sender},${msg.text}`)
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'chat_log.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('downloadChat').addEventListener('click', downloadCSV);

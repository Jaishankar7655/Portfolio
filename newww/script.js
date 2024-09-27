document.addEventListener('DOMContentLoaded', () => {
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const chatBox = document.getElementById('chat-box');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageBtn = document.getElementById('send-message');
    
    if (!openChatBtn || !closeChatBtn || !chatBox || !chatMessages || !userInput || !sendMessageBtn) {
        console.error('One or more chat elements are missing');
        return;
    }

    openChatBtn.addEventListener('click', () => {
        chatBox.style.display = 'flex';
        openChatBtn.style.display = 'none';
    });

    closeChatBtn.addEventListener('click', () => {
        chatBox.style.display = 'none';
        openChatBtn.style.display = 'block';
    });

    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            
            // Show loading indicator
            const loadingIndicator = createLoadingIndicator();
            chatMessages.appendChild(loadingIndicator);
            
            try {
                const response = await getAIResponse(message);
                addMessage('ai', response);
            } catch (error) {
                console.error('Error getting AI response:', error);
                addMessage('ai', "Sorry, I'm having trouble connecting right now. Please try again later.");
            } finally {
                // Remove loading indicator
                loadingIndicator.remove();
            }
        }
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function createLoadingIndicator() {
        const loadingElement = document.createElement('div');
        loadingElement.classList.add('loading-indicator');
        loadingElement.textContent = 'AI is thinking...';
        return loadingElement;
    }

    async function getAIResponse(message) {
        // This is a placeholder for the actual API call
        // In a real implementation, this should be done server-side to protect your API key
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY_HERE'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{role: "user", content: message}],
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                throw new Error('AI API request failed');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error in AI API call:', error);
            return getAutoReply(message); // Fallback to local auto-reply
        }
    }

    function getAutoReply(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('projects')) {
            return "I have worked on various projects including web development and Python programming. You can check them out in the Projects section of my portfolio.";
        } else if (lowerMessage.includes('skills')) {
            return "My skills include HTML, CSS, JavaScript, React, Node.js, and Python. I'm always learning and expanding my skillset!";
        } else if (lowerMessage.includes('contact')) {
            return "You can contact me through the form in the Contact section of my portfolio. I'm always open to new opportunities and collaborations!";
        } else {
            return "I'm sorry, I didn't quite understand that. Could you please rephrase or ask about my projects, skills, or how to contact me?";
        }
    }

    console.log('Chat functionality initialized');
});

// Rest of your JavaScript code (animations, dark mode toggle, etc.) goes here
// ...

gsap.registerPlugin(ScrollTrigger);

// GSAP animations
gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});

// ... (rest of your GSAP animations)

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const root = document.documentElement;

function toggleDarkMode() {
    root.classList.toggle('dark-mode');
    const isDarkMode = root.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeToggle();
}

function updateDarkModeToggle() {
    const isDarkMode = root.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
}

darkModeToggle.addEventListener('click', toggleDarkMode);

const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    root.classList.add('dark-mode');
    updateDarkModeToggle();
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});
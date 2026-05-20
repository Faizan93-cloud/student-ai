// Educational responses for different topics
const aiResponses = {
    heart: {
        text: "The human heart is a muscular organ about the size of a closed fist. It pumps blood throughout your body, delivering oxygen and nutrients to every cell. Your heart beats approximately 100,000 times per day! 💓",
        model: "models/heart.glb",
        label: "3D Human Heart"
    },
    solar: {
        text: "Our solar system consists of the Sun and eight planets orbiting around it. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. The Sun contains 99.86% of the solar system's mass! ☀️",
        model: "models/earth.glb",
        label: "3D Solar System"
    },
    atom: {
        text: "An atom is the smallest unit of matter. It consists of a nucleus (containing protons and neutrons) surrounded by electrons in electron shells. Everything in the universe is made of atoms! ⚛️",
        model: "models/atom.glb",
        label: "3D Atom Model"
    },
    skeleton: {
        text: "The human skeleton is a framework of 206 bones that supports your body, protects vital organs, and enables movement. Bones are living tissue that constantly repair and rebuild themselves! 💀",
        model: "models/skeleton.glb",
        label: "3D Human Skeleton"
    },
    engine: {
        text: "An internal combustion engine converts fuel into mechanical energy through controlled explosions. The four-stroke cycle includes intake, compression, combustion, and exhaust strokes. 🚗",
        model: "models/engine.glb",
        label: "3D Engine Model"
    }
};

// Send message function
function sendMessage() {
    const input = document.getElementById('userInput');
    const userText = input.value.trim();
    
    if (!userText) return;
    
    // Add user message to chat
    addMessage(userText, 'user');
    input.value = '';
    
    // Process input and get AI response
    const response = getAIResponse(userText);
    
    // Add AI response after a short delay for better UX
    setTimeout(() => {
        addMessage(response.text, 'ai');
        
        // Load 3D model
        if (response.model) {
            loadModel(response.model, response.label);
        }
    }, 500);
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Get AI response based on keywords
function getAIResponse(input) {
    const lowerInput = input.toLowerCase();
    
    // Check for keywords
    if (lowerInput.includes('heart') || lowerInput.includes('cardiac')) {
        return aiResponses.heart;
    } else if (lowerInput.includes('solar') || lowerInput.includes('planet') || lowerInput.includes('sun')) {
        return aiResponses.solar;
    } else if (lowerInput.includes('atom') || lowerInput.includes('atomic') || lowerInput.includes('molecule')) {
        return aiResponses.atom;
    } else if (lowerInput.includes('skeleton') || lowerInput.includes('bone') || lowerInput.includes('bones')) {
        return aiResponses.skeleton;
    } else if (lowerInput.includes('engine') || lowerInput.includes('motor') || lowerInput.includes('combustion')) {
        return aiResponses.engine;
    } else {
        return {
            text: "I understand you're curious! Try asking me about: heart, solar system, atoms, skeleton, or engines. I'll show you amazing 3D models! 🎓",
            model: null
        };
    }
}

// Add message to chat box
function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
    
    const messageP = document.createElement('p');
    messageP.textContent = text;
    messageDiv.appendChild(messageP);
    chatBox.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Load 3D model
function loadModel(modelPath, modelLabel) {
    const label = document.getElementById('modelLabel');
    label.textContent = modelLabel || 'Loading model...';
    
    // Call viewer function
    if (typeof initViewer === 'function') {
        initViewer(modelPath);
    }
}

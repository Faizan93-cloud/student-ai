# Student AI 🤖

An interactive educational chatbot with 3D model visualization.

## Features

✨ **AI Chat Interface** - Ask questions about science topics  
🎨 **3D Model Viewer** - See interactive 3D models using Three.js  
🧠 **Smart Keyword Detection** - AI recognizes topics and loads relevant models  
📚 **Educational Content** - Learn about hearts, solar systems, atoms, skeletons, and engines  

## Topics Supported

- **Heart** 💓 - Learn about the human cardiovascular system
- **Solar System** ☀️ - Explore planets and the sun
- **Atoms** ⚛️ - Understand atomic structure
- **Skeleton** 💀 - Study the human skeletal system
- **Engine** 🚗 - Discover how combustion engines work

## How to Use

1. Open the website
2. Type a question about any topic (e.g., "Show me the heart")
3. The AI responds with educational content
4. A 3D model automatically appears on the right
5. The 3D model rotates for better visualization

## Project Structure

```
student-ai/
├── index.html          # Main chat UI
├── style.css           # Styling and layout
├── script.js           # AI logic and message handling
├── three/
│   └── viewer.js      # Three.js 3D model viewer
├── models/            # 3D GLB model files
│   ├── heart.glb
│   ├── earth.glb
│   ├── atom.glb
│   ├── skeleton.glb
│   └── engine.glb
└── README.md
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and responsive design
- **JavaScript** - Logic and interactivity
- **Three.js** - 3D model rendering
- **GLB Format** - 3D model files

## Getting Started

1. Clone this repository
2. Add your 3D model files (.glb format) to the `models/` folder
3. Open `index.html` in a web browser
4. Start asking questions!

## Adding More Topics

To add a new topic:

1. Add a new entry to the `aiResponses` object in `script.js`
2. Include the model path and educational text
3. Add a keyword detection in the `getAIResponse()` function

## License

MIT License - Feel free to use for educational purposes!

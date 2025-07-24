# Voice-to-Action Assistant

A modern, web-based voice assistant featuring 3D animated feedback, powered by Node.js, Express, Web Speech API, and OpenAI's GPT models. 
This project demonstrates natural language command recognition, dynamic action execution, and real-time 3D interface interaction—all in a full-stack JS environment.

## Features

- **Conversational Voice Recognition:** Uses the browser's Web Speech API for capturing and transcribing spoken commands.
- **Dynamic Natural Language Understanding:** Integrates OpenAI GPT (with API key) to interpret and respond to a variety of spoken requests.
- **3D Animated Feedback:** Implements a 3D orb animation (via Three.js) that visually responds to user and assistant events.
- **Rich UI:** Clean, responsive interface styled with modern CSS conventions and easily adaptable to Tailwind CSS or React frameworks.
- **Extensible Action Engine:** Capable of opening websites, telling jokes, performing math, providing the date, and more.
- **Easy Backend Customization:** Modular Express route structure, straightforward to extend for new APIs or logic.

## Tech Stack

| Layer       | Technology                                 |
|-------------|--------------------------------------------|
| Frontend    | HTML, CSS, JavaScript, Three.js            |
| Backend     | Node.js, Express, dotenv                   |
| AI/NLU      | OpenAI GPT (API key)                       |
| Speech      | Web Speech API (browser’s TTS and STT)     |
| Styling     | Modern CSS, easily adaptable to Tailwind    |

## Local Setup

1. **Clone the repository**
git clone https://github.com/<your-username>/voice-to-action-assistant.git
cd voice-to-action-assistant

2. **Install dependencies**
npm install

3. **Configure environment variables**  
Create a `server/.env` file and add your OpenAI key:
OPENAI_API_KEY=your-openai-api-key

4. **Start the server**
node server/app.js

6. **Run the frontend**
cd client
python -m http.server 8000
Visit `http://localhost:8000` in your browser.

## Usage

- Click the microphone button or use the UI to start listening.
- Speak natural language commands such as:
- "Open YouTube"
- "Tell me a joke"
- "What's the date today?"
- "Open my LinkedIn"
- Visual 3D orb reflects listening and response states.

## Limitations

- **Requires OpenAI API Key:** Usage incurs costs; no built-in free quota.
- **No Local App Launch:** For security, the browser and backend cannot launch native desktop apps.
- **Depends on Browser APIs:** Speech recognition only works in browsers supporting the Web Speech API (best in Chrome/Edge).
- **Latency:** OpenAI API calls may introduce some delay (internet required).
- **No Persistent User State:** Does not store user data or session context out of the box.
- **Not Mobile-Optimized:** UI is currently desktop-first; mobile UX may be basic.

## Extending & Extra Features

Consider these future enhancements or contributions:

- **React Conversion**: Migrate the frontend to React (using Tailwind CSS for styling) for easier component-based development.
- **Authentication & User Profiles**: Add user login, personalized history, or cloud config.
- **Advanced NLU/LLMs**: Integrate custom prompt engineering, function calling, or connect to other LLMs (Anthropic, Cohere, etc.).
- **Smart Home Integration**: Connect with APIs for IoT device control, scheduling, or reminders.
- **Custom Actions**: Add weather/news APIs, calculator, reminders, or custom enterprise actions.
- **3D Avatars**: Swap the orb for a 3D assistant/character using GLTFLoader.
- **Dark Mode Switching**: Enhance UI with toggle on top of OS dark mode preference.
- **Mobile Support**: Make UI fully responsive with improved touch targets.
- **Offline STT/TTS**: Explore integration with local/offline engines for voice processing.
- **Accessibility**: Add ARIA labeling and keyboard navigation.

---

## Project Structure

voice-to-action-assistant/
├── client/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── server/
│ ├── app.js
│ └── routes/
│ └── actionRouter.js
├── .env
├── package.json

## Contributing

Pull requests and feature suggestions are welcome!  
If you use React, Tailwind, or want to integrate advanced 3D/AI features, feel free to fork this template and extend it.

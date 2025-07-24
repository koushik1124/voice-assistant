document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const startBtn = document.getElementById('startBtn');
  const transcript = document.getElementById('transcript');
  const response = document.getElementById('response');

  // Web Speech API setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    response.textContent = "Web Speech API is not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Text-to-speech
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }

  // Talk to backend
  async function handleAssistantAction(voiceText) {
    try {
      const res = await fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: voiceText })
      });

      const { reply, url } = await res.json();

      response.textContent = reply;
      speak(reply);

      if (url) {
        window.open(url, '_blank');
      }

    } catch (error) {
      response.textContent = '❌ Error connecting to the assistant. Try again later.';
      console.error('Backend error:', error);
    }
  }

  // Start listening
  startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.style.background = '#ff3b30';
    transcript.textContent = '🎙️ Listening...';
    response.textContent = '';
  });

  recognition.onresult = (event) => {
    const userSpeech = event.results[0][0].transcript;
    transcript.textContent = `🗣️ You said: "${userSpeech}"`;
    handleAssistantAction(userSpeech);
  };

  recognition.onerror = (event) => {
    transcript.textContent = '❗ Error: ' + event.error;
    startBtn.style.background = '#007aff';
  };

  recognition.onend = () => {
    startBtn.style.background = '#007aff';
  };
});

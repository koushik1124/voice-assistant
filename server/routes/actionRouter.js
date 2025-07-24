import express from 'express';
const router = express.Router();

// Helper: Clean and normalize voice text for flexible matching
function cleanVoiceText(text) {
  return text.replace(/[^\w\s]/g, '').trim().toLowerCase();
}

router.post('/', (req, res) => {
  const voiceTextRaw = req.body.message?.trim() || '';
  const voiceText = cleanVoiceText(voiceTextRaw);
  let reply = "I didn't understand that.";
  let url = null;

  // Log the cleaned voice text for debugging
  // console.log('Voice command received:', voiceText);

  // Define all actions in one place for clarity and easy expansion
  const actionHandlers = [
    // Open URLs (flexible matching)
    {
      test: (text) =>
        text.includes('youtube') ||
        text.includes('open youtube') ||
        text.includes('go to youtube') ||
        text.includes('for youtube'),
      reply: "Opening YouTube...",
      url: "https://youtube.com"
    },
    {
      test: (text) =>
        text.includes('google') ||
        text.includes('open google') ||
        text.includes('go to google') ||
        text.includes('for google'),
      reply: "Opening Google...",
      url: "https://google.com"
    },
    {
      test: (text) =>
        text.includes('github') ||
        text.includes('open github') ||
        text.includes('go to github') ||
        text.includes('for github') ||
        text.includes('github com'), // catches "github.com" after cleaning
      reply: "Opening GitHub...",
      url: "https://github.com"
    },
    {
      test: (text) =>
        text.includes('linkedin') ||
        text.includes('open linkedin') ||
        text.includes('go to linkedin') ||
        text.includes('for linkedin') ||
        text.includes('linkedin com'),
      reply: "Opening LinkedIn...",
      url: "https://linkedin.com"
    },
    {
      test: (text) =>
        text.includes('stackoverflow') ||
        text.includes('open stackoverflow') ||
        text.includes('stack overflow') ||
        text.includes('go to stackoverflow'),
      reply: "Opening Stack Overflow...",
      url: "https://stackoverflow.com"
    },
    {
      test: (text) =>
        text.includes('gmail') ||
        text.includes('open gmail') ||
        text.includes('go to gmail') ||
        text.includes('for gmail'),
      reply: "Opening Gmail...",
      url: "https://mail.google.com"
    },
    // Date
    {
      test: (text) =>
        text.includes('what is the date') ||
        text.includes('current date') ||
        text.includes('date today'),
      reply: () => `Today's date is ${new Date().toLocaleDateString()}`,
      url: null
    },
    // Joke
    {
      test: (text) =>
        text.includes('tell me a joke') ||
        text.includes('joke'),
      reply: () => "Why did the developer go broke? Because he used up all his cache!",
      url: null
    },
    // Math (simple)
    {
      test: (text) =>
        text.match(/(what is|calculate)\s+(\d+)\s*([+\-/*])\s*(\d+)/),
      reply: (text) => {
        const match = text.match(/(what is|calculate)\s+(\d+)\s*([+\-/*])\s*(\d+)/);
        if (!match) return "Sorry, I couldn't calculate that.";
        const a = parseInt(match[2]);
        const op = match[3];
        const b = parseInt(match[4]);
        let result;
        switch (op) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = b !== 0 ? a / b : "undefined (divide by zero)"; break;
          default: result = "Unknown operation";
        }
        return `The result is ${result}.`;
      },
      url: null
    },
    // Greeting
    {
      test: (text) =>
        text.includes('hello') ||
        text.includes('hi'),
      reply: "Hello! How can I help you today?",
      url: null
    },
    // (Add more handlers here as needed)
    // ...
    // Catch-all (MUST BE LAST)
    {
      test: () => true,
      reply: "I didn't understand that.",
      url: null
    }
  ];

  // Test each handler in order, until one matches
  for (const handler of actionHandlers) {
    if (handler.test(voiceText)) {
      reply = typeof handler.reply === 'function'
        ? handler.reply(voiceText)
        : handler.reply;
      url = handler.url;
      return res.json({ reply, url });
    }
  }

  // Fallback (should never reach here if catch-all is last)
  return res.json({ reply });
});

export default router;

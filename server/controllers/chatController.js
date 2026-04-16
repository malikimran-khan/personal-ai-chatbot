const ChatSession = require('../models/ChatSession');
const { runChat } = require('../langchain/chatAgent');

exports.chat = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // 1. Get or Create Session
    let session = await ChatSession.findOne({ userId });
    const history = session ? session.history : [];

    // 2. Run Chat with History
    const result = await runChat(message, history);

    // 3. Update Session History
    if (!session) {
      session = new ChatSession({ userId });
    }

    session.history.push({ role: 'user', content: message });
    session.history.push({ role: 'assistant', content: result.response });
    
    // Optional: limit history size to prevent context overflow (e.g. keep last 20 messages)
    if (session.history.length > 30) {
      session.history = session.history.slice(-30);
    }

    await session.save();

    res.json({ response: result.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat failed' });
  }
};

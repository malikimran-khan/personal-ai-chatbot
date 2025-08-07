const ChatSession = require('../models/ChatSession');
const { runChat } = require('../langchain/chatAgent');

exports.chat = async (req, res) => {
  try {
    const { message, userId } = req.body;

    const response = await runChat(message);

    await ChatSession.findOneAndUpdate(
      { userId },
      { $push: { history: message }, summary: response.response },
      { upsert: true, new: true }
    );

    res.json({ response: response.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat failed' });
  }
};

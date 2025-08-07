import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot, FaUserCircle, FaPaperPlane } from 'react-icons/fa';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: input,
        userId: 'user1',
      });

      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Unable to get a response from AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 flex justify-center items-center">
      <div className="w-full h-full bg-white text-gray-800 p-6 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-6 flex items-center justify-center gap-2">
            <FaRobot className="text-orange-400 text-3xl" />
            AI Learning Assistant
          </h2>

          <div className="h-[60vh] overflow-y-auto bg-orange-50 p-4 rounded-xl mb-5 space-y-3 border border-orange-200 shadow-inner">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-xl shadow ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-yellow-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.sender === 'user' ? (
                      <FaUserCircle className="mt-1 text-white" />
                    ) : (
                      <FaRobot className="mt-1 text-orange-500" />
                    )}
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="flex-1 p-3 border-2 border-orange-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition duration-300 ${
                loading
                  ? 'bg-orange-300 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              <FaPaperPlane />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

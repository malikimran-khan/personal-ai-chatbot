import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRobot, FaUserCircle, FaPaperPlane, FaTrash, FaPlus, FaMagic } from 'react-icons/fa';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let storedId = localStorage.getItem('chat_user_id');
    if (!storedId) {
      storedId = `user_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('chat_user_id', storedId);
    }
    setUserId(storedId);

    const storedMessages = JSON.parse(localStorage.getItem(`chat_history_${storedId}`) || '[]');
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    } else {
      setMessages([{ sender: 'bot', text: 'Hello! I am your personal AI assistant. How can I help you today?' }]);
    }
  }, []);

  useEffect(() => {
    if (userId && messages.length > 0) {
      localStorage.setItem(`chat_history_${userId}`, JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/chat`, {
        message: input,
        userId: userId,
      });

      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "⚠️ I'm having trouble connecting to my brain. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      setMessages([{ sender: 'bot', text: 'History cleared. How can I help you now?' }]);
      localStorage.removeItem(`chat_history_${userId}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white bg-gradient-to-br from-indigo-50/50 via-white to-teal-50/30 flex justify-center items-center p-6 md:p-12">
      {/* Background Ornaments */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-indigo-200/20 blur-[120px] rounded-full -z-10 animate-float"></div>
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-teal-200/20 blur-[120px] rounded-full -z-10 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-5xl h-[85vh] glass-card flex flex-col relative overflow-hidden backdrop-blur-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-indigo-100/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 animate-float">
              <FaMagic className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Assistant</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Intelligence</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100/50 text-indigo-400 font-bold text-sm border border-indigo-50 shadow-sm" title="User Profile">
              {userId.substring(5, 7).toUpperCase()}
            </button>
            <button 
              onClick={clearChat}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300"
              title="Clear Chat"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto pr-4 mb-8 space-y-8 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`mt-1 shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'bg-teal-50 text-teal-600 shadow-sm'
                }`}>
                  {msg.sender === 'user' ? <FaUserCircle size={24} /> : <FaRobot size={24} />}
                </div>
                <div className={`px-6 py-4 rounded-3xl message-shadow ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-[16px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 animate-pulse">
                  <FaRobot size={24} />
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="relative pt-2">
          <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] p-2 flex items-center shadow-sm focus-within:shadow-md focus-within:border-indigo-200 transition-all duration-300">
            <button className="p-4 text-slate-300 hover:text-indigo-400 transition-colors">
              <FaPlus size={18} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="How can I assist you today?"
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 resize-none py-3 px-2 max-h-32 text-lg"
              rows="1"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 mr-1 shadow-lg ${
                loading || !input.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:translate-y-[-2px] hover:shadow-indigo-200'
              }`}
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
          <p className="text-center text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-6">
            Intelligent Personal Assistant System
          </p>
        </div>
      </div>
    </div>
  );
}

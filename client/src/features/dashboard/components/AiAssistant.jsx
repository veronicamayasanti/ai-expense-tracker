import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { motion, AnimatePresence } from 'framer-motion';
import { parseInformalNumber } from '../../../utils/formatters';

const AiAssistant = ({ onTransactionAdded }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      { role: 'assistant', content: 'Halo! Saya Artha, asisten keuangan Anda. Ada yang bisa saya bantu catat hari ini?' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom when messages or loading changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = parseInformalNumber(input);
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await aiService.chat(userMessage);
      const data = response.data;
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      
      if (data.results && data.results.length > 0) {
        onTransactionAdded && onTransactionAdded();
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan saat menghubungi server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-[650px]">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Artha Assistant</h3>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest leading-none">Online • AI Intelligence</p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none shadow-sm' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200/50'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 border border-slate-100">
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-slate-50 rounded-b-[2rem] border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-grow">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan... (misal: Beli kopi 25rb)"
              className="w-full bg-white border-none focus:ring-2 focus:ring-primary/20 rounded-xl pl-4 pr-12 py-3 text-sm font-medium shadow-sm transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center disabled:opacity-30 shadow-md shadow-primary/20 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AiAssistant;

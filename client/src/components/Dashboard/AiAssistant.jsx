import React, { useState } from 'react';
import { aiService } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const AiAssistant = ({ onTransactionAdded }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! Saya Artha, asisten keuangan Anda. Ada yang bisa saya bantu catat hari ini?' }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
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
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-[500px]">
      <div className="p-6 border-b border-slate-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <span className="material-icons">auto_awesome</span>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Artha Assistant</h3>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest leading-none">Online • AI Intelligence</p>
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
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-slate-50 rounded-b-[2rem] border-t border-slate-100">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan... (misal: Beli kopi 25rb)"
            className="w-full bg-white border-none focus:ring-2 focus:ring-primary/20 rounded-xl pl-4 pr-12 py-3 text-sm font-medium"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center disabled:opacity-50 transition-opacity"
          >
            <span className="material-icons text-sm">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistant;

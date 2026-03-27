import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, PlusCircle, Search, PieChart, Coffee, Utensils, Loader2 } from 'lucide-react';

const App = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/chat', { input });
      if (response.data.success) {
        setResults((prev) => [...response.data.results, ...prev]);
        setInput('');
      } else {
        setError(response.data.message || 'AI tidak mengenali perintah ini.');
      }
    } catch (err) {
      setError('Gagal menghubungkan ke backend. Pastikan server aktif.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Wallet size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              AI Expense Tracker
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Input Section */}
        <section className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 mb-8 transition-all hover:shadow-2xl hover:shadow-slate-300/40">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PlusCircle className="text-emerald-500" size={20} />
            Catat Pengeluaran
          </h2>
          <div className="relative group">
            <textarea
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pr-12 focus:outline-none focus:border-emerald-500 transition-colors resize-none text-slate-700"
              placeholder='Contoh: "Makan siang bakso 35rb" atau "Beli kopi 20k"'
              rows="3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center disabled:bg-slate-300 disabled:shadow-none hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </button>
          </div>
          {error && <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>}
        </section>

        {/* Results Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Aktivitas Terakhir</h3>
          </div>
          
          {results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <PieChart size={32} />
              </div>
              <p className="text-slate-400">Belum ada transaksi. Silakan masukkan input!</p>
            </div>
          ) : (
            results.map((res, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${res.type === 'create' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {res.type === 'create' ? (
                      res.data.description.toLowerCase().includes('makan') ? <Utensils size={24} /> : <Coffee size={24} />
                    ) : (
                      <PieChart size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      {res.type === 'create' ? res.data.description : `Laporan Total`}
                    </p>
                    <p className="text-sm text-slate-400">
                      {res.type === 'create' ? new Date(res.data.createdAt).toLocaleString() : `${res.start} s/d ${res.end}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-black ${res.type === 'create' ? 'text-slate-900' : 'text-emerald-700'}`}>
                    {res.type === 'create' ? `Rp ${res.data.amount.toLocaleString()}` : `Rp ${res.data.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">
                    {res.type === 'create' ? 'Terbayar' : 'Total'}
                  </p>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default App;

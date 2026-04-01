import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const Landing = () => {
  const [email, setEmail] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="bg-surface font-manrope text-slate-900 selection:bg-primary-light selection:text-primary-dark overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/arthaku.png" alt="ArthaKu Symbol" className="w-10 h-10 object-contain" />
            <img src="/tulisan arthaku.png" alt="ArthaKu" className="h-8 object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-primary hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">Login</Link>
            <Link to="/register" className="bg-primary text-white px-6 py-2 rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all">Sign Up</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-8 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/30 text-primary font-bold text-xs tracking-wider uppercase">
                <span className="material-icons text-sm">verified</span>
                Precision Financial Control
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] flex flex-wrap items-center gap-x-4">
                Architect your wealth with 
                <img src="/tulisan arthaku.png" alt="ArthaKu" className="h-12 md:h-16 inline-block align-middle" />.
              </h1>
              <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed">
                The ultimate financial broadsheet for modern professionals. Manage records via WhatsApp and generate boardroom-ready reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('login-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-primary/10"
                >
                  Start for Free
                  <span className="material-icons">arrow_forward</span>
                </button>
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <span className="material-icons">chat</span>
                  Connect WhatsApp
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl"></div>
              <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 backdrop-blur-sm relative overflow-hidden text-center">
                <img src="/arthaku.png" alt="ArthaKu Symbol" className="w-32 h-32 mx-auto mb-8 animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bbda3865cbb0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dashboard" 
                  className="rounded-xl shadow-2xl border border-white/20"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="bg-slate-50 py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Precision-Engineered Features</h2>
              <p className="text-slate-600 max-w-2xl">Tailored tools for orang-orang yang menganggap manajemen keuangan sebagai kerajinan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-8 rounded-2xl flex flex-col justify-between border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary-light/30 flex items-center justify-center text-primary mb-6">
                    <span className="material-icons">photo_camera</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Receipt Intelligence</h3>
                  <p className="text-slate-600 max-w-sm">Simply snap a photo of any receipt. Our AI extracts date, vendor, and amount automatically, filing it into your ledger instantly.</p>
                </div>
              </div>
              <div className="bg-primary p-8 rounded-2xl text-white flex flex-col justify-between shadow-xl shadow-primary/20">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white mb-6">
                  <span className="material-icons">picture_as_pdf</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Boardroom Ready</h3>
                <p className="text-white/80 text-sm leading-relaxed">Generate sophisticated PDF financial reports with custom branding.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section id="login-section" className="py-24 px-8 max-w-7xl mx-auto">
          <div className="max-w-xl mx-auto bg-white p-10 rounded-[2rem] border border-slate-100 shadow-xl">
            <div className="text-center mb-8">
              <img src="/arthaku.png" alt="ArthaKu Symbol" className="w-16 h-16 mx-auto mb-4" />
              <img src="/tulisan arthaku.png" alt="ArthaKu" className="h-8 mx-auto mb-2" />
              <h4 className="text-xl font-bold text-slate-900">Welcome Back</h4>
              <p className="text-slate-500 text-sm">Sign in to your architectural ledger</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest px-1">Corporate Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-slate-900 font-medium" 
                  placeholder="name@company.com" 
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm tracking-tight active:scale-95 transition-all shadow-lg shadow-primary/10"
              >
                Sign In Now
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white w-full py-12 border-t border-slate-100 mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
          <p>© 2026 ArthaKu Financial Architecture. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

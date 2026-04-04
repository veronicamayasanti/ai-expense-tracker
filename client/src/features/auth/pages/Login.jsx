import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../store/UserContext';
import { authService } from '../services/authService';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(formData.email, formData.password);
      login(formData.email);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login gagal. Periksa kembali email dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 font-manrope selection:bg-primary/20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100 p-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/arthaku.png" alt="ArthaKu Symbol" className="w-24 h-24 mx-auto shadow-xl shadow-primary/10 rounded-3xl" />
          </Link>
          <div className="flex flex-col items-center gap-2 mb-2">
            <img src="/tulisan arthaku.png" alt="ArthaKu" className="h-12 object-contain" />
          </div>
          <p className="text-slate-500 font-medium mt-4 italic">Masuk ke ruang arsitektur keuangan Anda</p>
        </div>

        <form onSubmit={handleManualLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Corporate Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="name@company.com"
                className="w-full bg-slate-50 border-0 border-b-2 border-slate-100 focus:border-primary focus:ring-0 transition-all px-4 py-4 text-slate-900 font-semibold rounded-t-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Security Key (Password)</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-0 border-b-2 border-slate-100 focus:border-primary focus:ring-0 transition-all px-4 py-4 text-slate-900 font-semibold rounded-t-xl"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-rose-600 text-xs font-bold flex items-center gap-2"
            >
              <span className="material-icons text-sm">error</span>
              {error}
            </motion.div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In Now'}
          </button>
        </form>

        <p className="text-center mt-10 text-sm font-medium text-slate-500 italic">
          Belum menjadi anggota? <Link to="/register" className="text-primary font-black hover:underline not-italic ml-1">Buka Rekening Baru</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

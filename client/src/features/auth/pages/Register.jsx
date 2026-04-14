import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../store/UserContext';
import { authService } from '../services/authService';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (formData.password.length < 6) {
        throw new Error('Password minimal 6 karakter');
      }
      const response = await authService.register(formData.name, formData.email, formData.password);
      const { user, token } = response.data.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || err.message || 'Gagal registrasi. Coba email lain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-arthaku-body min-h-screen flex flex-col items-center justify-center relative overflow-hidden selection:bg-secondary-container/30">
      {/* Ambient Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>

      {/* Main Registration Shell */}
      <main className="w-full max-w-md px-6 py-12 z-10">
        {/* Brand Header Section */}
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="w-60 h-60 mb-6 flex items-center justify-center hover:scale-105 transition-transform">
            <img 
              alt="ArthaKu Logo" 
              className="w-full h-full object-contain" 
              src="/arthaku.png" 
            />
          </Link>
          <h1 className="font-arthaku-headline text-4xl font-extrabold tracking-tight text-primary">ArthaKu</h1>
        </div>

        {/* Registration Card */}
        <div className="glass-panel border border-outline-variant/15 p-8 rounded-xl whisper-shadow">
          <header className="mb-8 text-center md:text-left">
            <h2 className="font-arthaku-headline text-2xl font-bold text-primary">Daftar Akun ArthaKu</h2>
            <p className="text-sm text-on-surface-variant mt-1">Lengkapi data diri Anda untuk memulai perjalanan.</p>
          </header>

          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant/80 px-1" htmlFor="full_name">
                Nama Lengkap
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/60 group-focus-within:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-highest/50 border border-transparent focus:border-secondary focus:ring-0 rounded-lg transition-all font-arthaku-body text-on-surface placeholder:text-outline/50" 
                  id="full_name" 
                  type="text" 
                  placeholder="Alexander Hamilton"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant/80 px-1" htmlFor="email">
                Alamat Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/60 group-focus-within:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-highest/50 border border-transparent focus:border-secondary focus:ring-0 rounded-lg transition-all font-arthaku-body text-on-surface placeholder:text-outline/50" 
                  id="email" 
                  type="email" 
                  placeholder="warisan@arthaku.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant/80 px-1" htmlFor="password">
                Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/60 group-focus-within:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <input 
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-container-highest/50 border border-transparent focus:border-secondary focus:ring-0 rounded-lg transition-all font-arthaku-body text-on-surface placeholder:text-outline/50" 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant/60 hover:text-primary transition-colors" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant/50 italic px-1">*Minimal 6 karakter</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-error/10 border border-error/20 p-3 rounded-lg text-error text-xs font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </motion.div>
            )}

            {/* Terms/Privacy */}
            <div className="flex items-start gap-3 px-1 pt-2">
              <div className="flex items-center h-5">
                <input 
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-secondary cursor-pointer" 
                  id="terms" 
                  type="checkbox" 
                  required
                />
              </div>
              <div className="text-xs leading-5 text-on-surface-variant">
                Dengan mendaftar, Anda menyetujui 
                <a className="text-primary font-semibold hover:text-secondary transition-colors ml-1" href="#">Syarat dan Ketentuan</a> 
                serta 
                <a className="text-primary font-semibold hover:text-secondary transition-colors ml-1" href="#">Kebijakan Privasi</a> kami.
              </div>
            </div>

            {/* Primary Action */}
            <button 
              className="w-full py-4 px-6 bg-secondary-container text-on-secondary-container font-arthaku-headline font-bold text-lg rounded-lg shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          {/* Secondary Action */}
          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-sm text-on-surface-variant">
              Sudah punya akun? 
              <Link className="text-primary font-bold hover:text-secondary transition-colors ml-1" to="/login">Masuk</Link>
            </p>
          </div>
        </div>

        {/* Footer Help Links */}
        <footer className="mt-12 flex justify-center gap-8">
          <a className="text-xs font-semibold text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-widest" href="#">Pusat Bantuan</a>
          <a className="text-xs font-semibold text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-widest" href="#">Keamanan</a>
          <a className="text-xs font-semibold text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-widest" href="#">Privasi</a>
        </footer>
      </main>

      {/* Visual Identity Toast (Floating) */}
      <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-4 bg-primary text-on-primary px-5 py-3 rounded-full whisper-shadow border border-white/5">
        <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
        <span className="text-xs font-arthaku-headline font-semibold tracking-wider uppercase">Sovereign Asset Management</span>
      </div>
    </div>
  );
};

export default Register;

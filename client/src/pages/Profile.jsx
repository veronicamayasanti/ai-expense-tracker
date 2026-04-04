import React, { useState, useEffect } from 'react';
import Layout from '../layouts/MainLayout';
import TopBar from '../layouts/components/TopBar';
import { userService } from '../features/auth/services/authService';
import { useUser } from '../store/UserContext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    avatar: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        whatsapp: user.whatsapp || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await userService.updateProfile(formData);
      setUser(prev => ({ ...prev, ...res.data.data }));
      setMessage('Profil berhasil diperbarui');
    } catch (err) {
      console.error(err);
      setMessage('Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <TopBar title="Account Settings" />
      
      <main className="pt-24 px-4 md:px-8 pb-32 md:pb-12 max-w-7xl mx-auto">
        <header className="mb-10 md:mb-12">
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-slate-900 mb-2 md:mb-4 tracking-tighter">Account Settings</h1>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl font-bold italic leading-none opacity-70">Manage your ArthaKu financial identity.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <section className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm transition-all">
              <div className="flex flex-col md:flex-row items-center md:items-start md:gap-6 mb-8 md:mb-10 text-center md:text-left gap-4">
                <div className="relative">
                  <img 
                    src={formData.avatar || "https://ui-avatars.com/api/?name=" + formData.name} 
                    alt="Profile" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-slate-50 shadow-sm"
                  />
                  <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-lg shadow-lg hover:scale-110 transition-transform">
                    <span className="material-icons text-sm">photo_camera</span>
                  </button>
                </div>
                <div className="pt-2">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900">Identity Details</h2>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 opacity-60">Verified ArthaKu Professional</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl p-4 font-bold text-slate-900 text-sm" 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 opacity-50">Email Address</label>
                    <input 
                      disabled
                      className="w-full bg-slate-50 border-0 focus:ring-0 opacity-40 rounded-xl p-4 font-bold text-slate-900 text-sm cursor-not-allowed" 
                      type="email" 
                      value={formData.email}
                    />
                  </div>
                </div>

                <div className="bg-emerald-50/50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="p-3 bg-white rounded-xl md:rounded-2xl text-emerald-600 shadow-sm">
                        <span className="material-icons text-xl md:text-2xl">chat</span>
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-none">WhatsApp</h2>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest italic opacity-60">ArthaKu Direct Alerts</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full space-y-2">
                      <label className="text-[10px] font-black text-emerald-800/60 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">+</span>
                        <input 
                          className="w-full bg-white border-0 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-xl pl-8 p-4 font-bold text-slate-900 text-sm" 
                          placeholder="62 812 3456 7890" 
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-50 gap-4">
                  {message && <p className={`text-xs font-black uppercase tracking-widest ${message.includes('Gagal') ? 'text-rose-600' : 'text-emerald-600'}`}>{message}</p>}
                  <button 
                    disabled={saving}
                    className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-50"
                  >
                    {saving ? 'Saving Data...' : 'Save ArthaKu Profile'}
                  </button>
                </div>
              </form>
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="bg-primary rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-[10px] font-black mb-6 tracking-[0.2em] leading-none uppercase opacity-60">Security Overview</h3>
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span>Encryption Status</span>
                      <span className="text-emerald-400">92%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[92%] rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <span className="material-icons text-emerald-400 text-sm">verified_user</span>
                    <span className="text-[9px] font-black uppercase tracking-widest italic opacity-70">SSL Protocol Active</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;

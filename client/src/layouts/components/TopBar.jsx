import React from 'react';
import { useUser } from '../../store/UserContext';

const TopBar = ({ title }) => {
  const { user } = useUser();

  return (
    <header className="fixed top-0 md:left-64 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-black tracking-tight text-slate-900 leading-none truncate max-w-[200px] md:max-w-none">
            {title || 'Overview'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex bg-slate-50 rounded-full px-4 py-2 items-center gap-2 border border-slate-100 opacity-50 cursor-not-allowed" title="Coming Soon">
            <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
            <input 
              type="text" 
              disabled
              className="bg-transparent border-none focus:ring-0 text-sm w-32 md:w-48 placeholder-slate-400 cursor-not-allowed" 
              placeholder="Search (coming soon)"
            />
          </div>
          
          <button className="md:hidden w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </button>

          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 md:hidden">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

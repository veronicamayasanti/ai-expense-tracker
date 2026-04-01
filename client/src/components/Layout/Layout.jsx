import React from 'react';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="md:ml-64 flex flex-col min-h-screen px-4 md:px-0">
        {children}
      </div>
      
      {/* Mobile Nav Simulation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-50 flex justify-around items-center py-3 px-4 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1.5 transition-all ${isActive ? 'text-primary' : 'text-slate-400 opacity-70'}`}>
          <span className="material-icons text-[24px]">dashboard</span>
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Home</span>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => `flex flex-col items-center gap-1.5 transition-all ${isActive ? 'text-primary' : 'text-slate-400 opacity-70'}`}>
          <span className="material-icons text-[24px]">receipt_long</span>
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Records</span>
        </NavLink>
        <div className="relative -mt-10">
          <div className="bg-primary p-4 rounded-[1.5rem] shadow-2xl shadow-primary/40 text-white cursor-pointer active:scale-90 transition-all ring-8 ring-white">
            <span className="material-icons text-2xl font-bold">add</span>
          </div>
        </div>
        <NavLink to="/analysis" className={({ isActive }) => `flex flex-col items-center gap-1.5 transition-all ${isActive ? 'text-primary' : 'text-slate-400 opacity-70'}`}>
          <span className="material-icons text-[24px]">insert_chart</span>
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Stats</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center gap-1.5 transition-all ${isActive ? 'text-primary' : 'text-slate-400 opacity-70'}`}>
          <span className="material-icons text-[24px]">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../store/UserContext';

const Sidebar = () => {
  const { logout, user } = useUser();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Overview', icon: 'dashboard', path: '/dashboard' },
    { name: 'Transactions', icon: 'receipt_long', path: '/transactions' },
    { name: 'Analysis', icon: 'insert_chart', path: '/analysis' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-slate-100 pt-4 px-8 pb-8 gap-y-6 z-40">
      <div className="mb-0">
        <img src="/arthaku logo.png" alt="ArthaKu Logo" className="w-full h-auto object-contain" />
      </div>

      <nav className="flex flex-col gap-y-3 flex-grow">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-sm font-bold tracking-tight ${
                isActive
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-primary hover:translate-x-1'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px] leading-none shrink-0">
              {item.icon}
            </span>
            <span className="leading-none pt-0.5">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-8 px-2 group cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 overflow-hidden ring-4 ring-primary/5 group-hover:ring-primary/10 transition-all shrink-0">
            <img 
              src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-black text-slate-900 truncate tracking-tight block">
              {user?.name || 'Guest'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-rose-600 transition-all w-full text-sm font-bold group"
        >
          <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">logout</span>
          <span className="leading-none pt-0.5">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

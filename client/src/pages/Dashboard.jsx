import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import TopBar from '../components/Layout/TopBar';
import AiAssistant from '../components/Dashboard/AiAssistant';
import { transactionService } from '../services/api';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const [statsRes, historyRes] = await Promise.all([
        transactionService.getStats(monthAgo, today),
        transactionService.getHistory(5)
      ]);
      
      setStats(statsRes.data.data);
      setHistory(historyRes.data.data);
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <TopBar title="Dashboard Overview" />
      
      <div className="pt-24 px-4 md:px-8 pb-32 md:pb-12 max-w-7xl mx-auto space-y-6 md:space-y-10">
        {/* Wealth Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-primary/5 border border-primary/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary/60 mb-2 md:mb-3 block px-1">Available Balance</span>
              <div className="flex items-baseline gap-1.5 md:gap-2">
                <span className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">$</span>
                <span className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
                  {stats.balance.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-8 md:mt-10 flex gap-4 md:gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Input</span>
                <span className="text-emerald-600 font-black flex items-center text-base md:text-lg leading-none">
                  +12.4% <span className="material-icons text-sm md:text-[18px] ml-1 align-middle leading-none">trending_up</span>
                </span>
              </div>
              <div className="flex flex-col border-l border-primary/10 pl-4 md:pl-8">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Credit Score</span>
                <span className="text-primary font-black text-base md:text-lg leading-none pt-1">782</span>
              </div>
            </div>
            <span className="material-icons absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 text-[150px] md:text-[200px] text-primary/5 rotate-12 pointer-events-none select-none">account_balance</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5 border border-slate-100 shadow-sm transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-icons text-primary text-2xl md:text-3xl">cloud_upload</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-base md:text-lg text-primary mb-1">Receipt Photos</h3>
              <p className="text-xs text-slate-500 leading-relaxed md:px-4">Instant AI entry via photo upload</p>
            </div>
            <button className="hidden md:flex text-sm font-bold text-primary items-center gap-2 hover:translate-x-1 transition-transform group mt-2">
              Browse Files <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-0.5">Total Income</span>
                  <span className="text-xl md:text-2xl font-black text-emerald-800">${stats.totalIncome.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-icons text-xl">payments</span>
                </div>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-0.5">Total Expenses</span>
                  <span className="text-xl md:text-2xl font-black text-rose-800">${stats.totalExpense.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                  <span className="material-icons text-xl">shopping_cart</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-50 bg-slate-50/10">
                <h2 className="text-lg md:text-xl font-bold text-primary tracking-tight">Recent Transactions</h2>
                <button className="text-xs md:text-sm font-bold text-primary hover:underline">View All</button>
              </div>
              
              <div className="p-3 md:p-4 space-y-1">
                {history.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 font-medium italic">Belum ada transaksi...</div>
                ) : (
                  history.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all text-slate-600 shrink-0">
                          <span className="material-icons text-[20px] md:text-[22px]">
                            {tx.type === 'INCOME' ? 'payments' : 'shopping_bag'}
                          </span>
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-slate-900 leading-none mb-1 md:mb-1.5 truncate">{tx.description}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            {tx.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end shrink-0 ml-2">
                        <p className={`font-black text-base md:text-lg leading-none mb-1 md:mb-1.5 ${tx.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </p>
                        <p className="hidden md:block text-[9px] uppercase font-bold tracking-widest text-slate-400 leading-none">Processed</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <AiAssistant onTransactionAdded={fetchData} />
            <div className="bg-primary rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-primary/10">
              <div className="relative z-10">
                <h3 className="font-bold text-lg md:text-xl mb-2 tracking-tight">Smart Savings</h3>
                <p className="text-primary-light/80 text-xs md:text-sm mb-6 leading-relaxed">ArthaKu architecture: Stable Growth on track.</p>
                <div className="w-full bg-primary-dark/30 rounded-full h-2 mb-3">
                  <div className="bg-emerald-400 h-2 rounded-full w-[65%] shadow-[0_0_8px_rgba(52,211,153,0.3)]"></div>
                </div>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none">65% OF TARGET</span>
              </div>
              <span className="material-icons absolute -bottom-6 -right-6 text-7xl md:text-9xl text-white/10 rotate-[-15deg] pointer-events-none select-none">savings</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

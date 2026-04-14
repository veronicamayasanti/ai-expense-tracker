import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../layouts/MainLayout';
import TopBar from '../../../layouts/components/TopBar';
import AiAssistant from '../components/AiAssistant';
import { transactionService } from '../../transactions/services/transactionService';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';

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
      setHistory(historyRes.data.data.transactions || []);
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
            className="md:col-span-3 bg-primary/5 border border-primary/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary/60 mb-2 md:mb-3 block px-1">Available Balance</span>
              <div className="flex items-baseline gap-1.5 md:gap-2">
                <span className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
                  {formatCurrency(stats.balance)}
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-8 md:mt-10 flex gap-4 md:gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Input</span>
                <span className="text-slate-400 font-bold flex items-center text-base md:text-lg leading-none">
                  Live View <span className="material-symbols-outlined text-sm md:text-[18px] ml-1 align-middle leading-none">analytics</span>
                </span>
              </div>
              <div className="flex flex-col border-l border-primary/10 pl-4 md:pl-8">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Credit Score</span>
                <span className="text-primary font-black text-base md:text-lg leading-none pt-1">Active</span>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 text-[150px] md:text-[200px] text-primary/5 rotate-12 pointer-events-none select-none">account_balance</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-0.5">Total Income</span>
                  <span className="text-xl md:text-2xl font-black text-emerald-800">{formatCurrency(stats.totalIncome)}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-0.5">Total Expenses</span>
                  <span className="text-xl md:text-2xl font-black text-rose-800">{formatCurrency(stats.totalExpense)}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                  <span className="material-symbols-outlined text-xl">shopping_cart</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-50 bg-slate-50/10">
                <h2 className="text-lg md:text-xl font-bold text-primary tracking-tight">Recent Transactions</h2>
                <Link to="/transactions" className="text-xs md:text-sm font-bold text-primary hover:underline">View All</Link>
              </div>
              
              <div className="p-3 md:p-4 space-y-1">
                {history.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 font-medium italic">Belum ada transaksi...</div>
                ) : (
                  history.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all text-slate-600 shrink-0">
                          <span className="material-symbols-outlined text-[20px] md:text-[22px]">
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
                          {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </p>
                        <p className="hidden md:block text-[9px] uppercase font-bold tracking-widest text-slate-400 leading-none">Status: Success</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <AiAssistant onTransactionAdded={fetchData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

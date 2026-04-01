import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import TopBar from '../components/Layout/TopBar';
import { transactionService } from '../services/api';

const Records = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await transactionService.getHistory(50);
        setHistory(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Layout>
      <TopBar title="Financial Records" />
      
      <section className="p-4 md:p-8 pt-24 max-w-7xl mx-auto pb-32 md:pb-12">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-1">Financial Archive</h2>
            <p className="text-slate-500 text-xs md:text-sm font-bold italic opacity-70">Detailed auditing for ArthaKu Intelligence</p>
          </div>
          
          <div className="bg-white p-1 md:p-2 rounded-xl md:rounded-2xl shadow-sm border border-slate-50 flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-slate-50 rounded-lg md:rounded-xl border border-slate-100">
              <span className="material-icons text-slate-400 text-sm md:text-lg">calendar_today</span>
              <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest leading-none pt-0.5">Jan 01 — Dec 31, 2026</span>
              <span className="material-icons text-slate-400 text-sm cursor-pointer ml-1">expand_more</span>
            </div>
          </div>
        </div>

        {/* Mobile-First Card View (Visible on small screens) */}
        <div className="md:hidden space-y-4">
          {history.length === 0 ? (
            <div className="py-20 text-center text-slate-400 font-bold italic uppercase tracking-widest text-xs">No records found...</div>
          ) : (
            history.map((tx) => (
              <div key={tx.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      <span className="material-icons text-xl">{tx.type === 'INCOME' ? 'payments' : 'shopping_bag'}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-none mb-1">{tx.description}</h3>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{tx.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-lg leading-none mb-1 ${tx.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </p>
                    <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-400 px-1.5 py-0.5 bg-slate-50 rounded-full border border-slate-100 italic">Confirmed</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="material-icons text-xs">schedule</span>
                    {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-icons text-xs text-emerald-500">verified</span>
                    Blockchain Verified
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Sophisticated Table (Visible on md and up) */}
        <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Transaction Detail</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Asset Category</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Institutional Type</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 text-right">Credit/Debit</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-900 leading-none mb-1.5">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })} • {new Date(tx.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`flex items-center gap-2 ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="material-icons text-sm font-black">
                          {tx.type === 'INCOME' ? 'arrow_upward' : 'arrow_downward'}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className={`text-base font-black tracking-tighter ${tx.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="material-icons text-slate-200 group-hover:text-emerald-400 transition-colors">verified_user</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div>Audit Trail: <span className="text-primary">{history.length}</span> entries logged</div>
            <div className="flex gap-6">
              <button className="text-primary hover:underline hover:opacity-80 transition-all">Download Audit PDF</button>
              <button className="hover:text-primary transition-all">Previous</button>
              <button className="hover:text-primary transition-all">Next</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Records;

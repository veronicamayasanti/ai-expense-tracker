import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import TopBar from '../components/Layout/TopBar';
import { transactionService } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const res = await transactionService.getStats(monthAgo, today);
        const historyRes = await transactionService.getHistory(100);
        
        setStats(res.data.data);
        
        const chartMap = {};
        const categoryMap = {};
        
        historyRes.data.data.forEach(tx => {
          const date = new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short' });
          if (!chartMap[date]) chartMap[date] = { name: date, income: 0, expense: 0 };
          if (tx.type === 'INCOME') chartMap[date].income += tx.amount;
          else chartMap[date].expense += tx.amount;

          if (!categoryMap[tx.category]) categoryMap[tx.category] = 0;
          categoryMap[tx.category] += tx.amount;
        });

        setData(Object.values(chartMap));
        setPieData(Object.entries(categoryMap).map(([name, value]) => ({ name, value })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#004B44', '#6b3a26', '#b1eee4', '#edeeef'];

  return (
    <Layout>
      <TopBar title="Financial Reports" />
      
      <div className="pt-24 px-4 md:px-8 pb-32 md:pb-12 max-w-7xl mx-auto space-y-6 md:space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="md:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-extrabold mb-2">Total Net Worth</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-primary truncate">${stats.balance.toLocaleString()}</h2>
              <div className="mt-4 flex items-center gap-2 text-primary font-black">
                <span className="material-icons text-sm">trending_up</span>
                <span className="text-xs md:text-sm uppercase tracking-widest">+12.4% vs last period</span>
              </div>
            </div>
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl shrink-0"></div>
          </div>
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-l-[6px] border-primary shadow-sm border-y border-r border-slate-100">
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-extrabold mb-1 md:mb-2">Income</p>
            <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight">${stats.totalIncome.toLocaleString()}</h3>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest opacity-60">Verified Deposits</p>
          </div>
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-l-[6px] border-rose-800 shadow-sm border-y border-r border-slate-100">
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-extrabold mb-1 md:mb-2 italic">Expenses</p>
            <h3 className="text-2xl md:text-3xl font-black text-rose-900 tracking-tight">${stats.totalExpense.toLocaleString()}</h3>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest opacity-60">Outbound Assets</p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black tracking-tight mb-8 uppercase text-slate-400 text-[10px] tracking-[0.3em]">Institutional Flux (Income vs Expenses)</h3>
            <div className="h-64 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#cbd5e1' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }} />
                  <Bar dataKey="income" fill="#004B44" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="expense" fill="#6b3a26" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-black tracking-tight mb-8 uppercase text-slate-400 text-[10px] tracking-[0.3em]">Capital Allocation</h3>
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Total</span>
                <span className="text-xl font-black text-primary tracking-tight">${stats.totalExpense.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                    <span className="truncate max-w-[120px]">{d.name}</span>
                  </div>
                  <span className="text-primary font-black">${d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Analytics;

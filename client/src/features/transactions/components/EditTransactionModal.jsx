import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EditTransactionModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'EXPENSE'
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || '',
        amount: transaction.amount || '',
        category: transaction.category || '',
        type: transaction.type || 'EXPENSE'
      });
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(transaction.id, formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Transaction</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Description</label>
                  <input
                    type="text"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900"
                    placeholder="E.g., Dinner at Cafe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Amount</label>
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-black text-slate-900"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900"
                      placeholder="E.g., Food"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Type</label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'EXPENSE' })}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'EXPENSE' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'
                        }`}
                    >
                      Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'INCOME' })}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'INCOME' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'
                        }`}
                    >
                      Income
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditTransactionModal;

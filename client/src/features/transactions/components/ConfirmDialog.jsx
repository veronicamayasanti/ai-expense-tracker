import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
            className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-3xl">delete_forever</span>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title || 'Are you sure?'}</h3>
              <p className="text-slate-500 font-medium mb-8">
                {message || 'This action cannot be undone. This transaction will be permanently removed from your records.'}
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-[0.98]"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;

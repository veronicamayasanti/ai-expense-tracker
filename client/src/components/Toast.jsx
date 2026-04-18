import React, { useState, useCallback } from 'react';

// ─── Toast Hook ───────────────────────────────────────────────────────────────
let _addToast = null;

export function useToast() {
  return {
    success: (msg) => _addToast?.({ type: 'success', message: msg }),
    error: (msg) => _addToast?.({ type: 'error', message: msg }),
    info: (msg) => _addToast?.({ type: 'info', message: msg }),
  };
}

// ─── Toast Provider ──────────────────────────────────────────────────────────
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, message }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  _addToast = addToast;

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  };
  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const iconColors = {
    success: 'text-emerald-500',
    error: 'text-rose-500',
    info: 'text-blue-500',
  };

  return (
    <>
      {children}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg text-sm font-semibold backdrop-blur-sm pointer-events-auto animate-fade-in-down ${colors[toast.type]}`}
          >
            <span className={`material-symbols-outlined text-lg ${iconColors[toast.type]}`}>
              {icons[toast.type]}
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}

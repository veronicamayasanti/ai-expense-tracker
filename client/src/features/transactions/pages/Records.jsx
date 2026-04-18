import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../layouts/MainLayout';
import TopBar from '../../../layouts/components/TopBar';
import { transactionService } from '../services/transactionService';
import { formatCurrency } from '../../../utils/formatters';
import EditTransactionModal from '../components/EditTransactionModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../../../components/Toast';

const Records = () => {
  const toast = useToast();
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const limit = 10;

  // Single canonical fetchHistory – uses useCallback to stay stable
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transactionService.getHistory(limit, currentPage);
      const { transactions = [], totalPages = 1, totalCount = 0 } = res.data.data || {};
      setHistory(transactions);
      setTotalPages(totalPages);
      setTotalCount(totalCount);
    } catch (err) {
      console.error(err);
      toast.error('Gagal memuat data transaksi.');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleEditClick = (tx) => {
    setEditingTransaction(tx);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (txId) => {
    setDeletingTransactionId(txId);
    setIsConfirmDialogOpen(true);
  };

  const handleSaveEdit = async (id, data) => {
    try {
      await transactionService.update(id, data);
      setIsEditModalOpen(false);
      toast.success('Transaksi berhasil diperbarui.');
      fetchHistory();
    } catch (err) {
      console.error('Update Error:', err);
      toast.error('Gagal memperbarui transaksi.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await transactionService.delete(deletingTransactionId);
      setIsConfirmDialogOpen(false);
      toast.success('Transaksi berhasil dihapus.');
      fetchHistory();
    } catch (err) {
      console.error('Delete Error:', err);
      toast.error('Gagal menghapus transaksi.');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Sliding window pagination: show max 5 page buttons around current page
  const getPageNumbers = useCallback(() => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    
    if (end > totalPages) {
      end = totalPages;
      start = end - maxVisible + 1;
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  // CSV Download
  const handleDownloadCSV = async () => {
    try {
      const res = await transactionService.getHistory(1000, 1);
      const transactions = res.data.data.transactions || [];
      
      if (transactions.length === 0) {
        toast.info('Tidak ada data transaksi untuk diunduh.');
        return;
      }

      const headers = ['Date', 'Time', 'Category', 'Description', 'Type', 'Amount'];
      const rows = transactions.map(tx => [
        new Date(tx.createdAt).toLocaleDateString('id-ID'),
        new Date(tx.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        tx.category || '-',
        `"${(tx.description || '').replace(/"/g, '""')}"`,
        tx.type,
        tx.type === 'INCOME' ? tx.amount : -tx.amount,
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `arthaku_transactions_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('CSV berhasil diunduh!');
    } catch (err) {
      console.error('CSV Download Error:', err);
      toast.error('Gagal mengunduh CSV.');
    }
  };

  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalCount);

  return (
    <Layout>
      <TopBar title="Financial Records" />
      
      <section className="px-4 md:px-8 pt-24 pb-32 md:pb-12 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-1">Financial Archive</h2>
            <p className="text-slate-500 text-xs md:text-sm font-bold italic opacity-70">Detailed auditing for ArthaKu Intelligence</p>
          </div>
          
          <div className="bg-white p-1 md:p-2 rounded-xl md:rounded-2xl shadow-sm border border-slate-50 flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-slate-50 rounded-lg md:rounded-xl border border-slate-100">
              <span className="material-symbols-outlined text-slate-400 text-sm md:text-lg">calendar_today</span>
              <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest leading-none pt-0.5">Filter Records</span>
              <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer ml-1">expand_more</span>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Date</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Category</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Description</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Type</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-right">Amount</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="5" className="px-8 py-6 h-20 bg-slate-50/20"></td>
                    </tr>
                  ))
                ) : history.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-900 leading-none mb-1.5 whitespace-nowrap">
                        {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-70">
                        {new Date(tx.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        tx.type === 'INCOME' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-rose-50 text-rose-700 border-rose-100'
                      }`}>
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-900 leading-none mb-1.5">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 font-medium italic truncate max-w-[200px]">
                        Official Transaction Record
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`flex items-center gap-2 ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="material-symbols-outlined text-sm font-black">
                          {tx.type === 'INCOME' ? 'trending_up' : 'trending_down'}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className={`text-base font-black tracking-tighter ${tx.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleEditClick(tx)}
                          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-base">edit_note</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(tx.id)}
                          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-all"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-base">delete_outline</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-8 py-6 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
              Showing <span className="text-slate-900">{totalCount > 0 ? startIndex : 0}-{endIndex}</span> of <span className="text-slate-900">{totalCount}</span> transactions
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-slate-50 rounded-xl border border-slate-100 mr-4">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-all disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                
                {/* First page + ellipsis */}
                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="w-8 h-8 rounded-lg text-xs font-black text-slate-400 hover:bg-white hover:text-primary transition-all"
                    >1</button>
                    {getPageNumbers()[0] > 2 && (
                      <span className="w-8 h-8 flex items-center justify-center text-slate-300 text-xs">…</span>
                    )}
                  </>
                )}

                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                      currentPage === pageNum 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-slate-400 hover:bg-white hover:text-primary'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Last page + ellipsis */}
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                      <span className="w-8 h-8 flex items-center justify-center text-slate-300 text-xs">…</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-8 h-8 rounded-lg text-xs font-black text-slate-400 hover:bg-white hover:text-primary transition-all"
                    >{totalPages}</button>
                  </>
                )}

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-all disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
              
              <button 
                onClick={handleDownloadCSV}
                className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest px-4 py-2 hover:bg-primary/5 transition-all rounded-xl flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download CSV
              </button>
            </div>
          </div>
        </div>
        
        {/* Modals and Dialogs */}
        <EditTransactionModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={handleSaveEdit}
          transaction={editingTransaction}
        />
        <ConfirmDialog 
          isOpen={isConfirmDialogOpen} 
          onClose={() => setIsConfirmDialogOpen(false)} 
          onConfirm={handleConfirmDelete}
          title="Delete Transaction"
          message="Are you sure you want to delete this transaction historical record?"
        />
      </section>
    </Layout>
  );
};

export default Records;


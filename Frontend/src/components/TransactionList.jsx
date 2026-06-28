import React, { useContext, useState } from 'react' // --- Added useState ---
import { TransactionContext } from '../context/TransactionContext'
import * as api from '../services/api';

// --- Category SVGs mapping ---
const categoryIcons = {
  Food: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  Transport: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  Entertainment: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  ),
  Bills: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Salary: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Freelance: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Investment: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Others: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
};

const TransactionList = ({ setEditingTransaction }) => {
    const { transactions, deleteTransaction } = useContext(TransactionContext);

    // --- Search & Filter states ---
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'

    const formatDate = (dateStr) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    const handleEditClick = async (id) => {
        try {
            const res = await api.getTransactionById(id);
            setEditingTransaction(res.data.transaction);
        } catch (err) {
            console.error("Failed to fetch transaction details:", err);
        }
    };

    // --- Filter logic ---
    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || t.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className='bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-lg'>
            
            {/* Header with Search and Type Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className='text-xl font-semibold text-gray-200'>Recent Transactions</h2>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
                    <input 
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />

                    {/* Filter Pills */}
                    <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-700 text-xs">
                        {['all', 'income', 'expense'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                className={`px-3 py-1 rounded-md capitalize font-medium cursor-pointer transition-colors duration-150 ${
                                    typeFilter === type 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredTransactions.length === 0 ? (
                <p className="text-gray-400 text-center py-6">No transactions match your search/filter.</p>
            ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                    {filteredTransactions.map((t) => (
                        <div key={t._id}
                            className="flex items-center justify-between p-4 bg-gray-900/60 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-200"
                        >
                            <div className="flex items-center gap-4">
                                {/* SVG Category Icon (Updated) */}
                                <div className={`p-3 rounded-xl ${
                                    t.type === 'income' 
                                        ? 'bg-emerald-500/10 text-emerald-400' 
                                        : 'bg-rose-500/10 text-rose-400'
                                }`}>
                                    {categoryIcons[t.category] || categoryIcons.Others}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{t.title}</h4>
                                    <div className="flex gap-2 text-xs text-gray-400 mt-0.5">
                                        <span>{t.category}</span>
                                        <span>•</span>
                                        <span>{formatDate(t.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <span className={`font-bold text-lg ${
                                    t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                    {t.type === 'income' ? '+' : '-'} &#x20B9;{t.amount.toLocaleString()}
                                </span>

                                {/* EDIT BUTTON */}
                                <button onClick={() => handleEditClick(t._id)}
                                    className='p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all cursor-pointer'
                                    title="Edit Transaction"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>

                                {/* DELETE BUTTON */}
                                <button onClick={() => deleteTransaction(t._id)}
                                    className='p-2 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer'
                                    title="Delete Transaction"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TransactionList

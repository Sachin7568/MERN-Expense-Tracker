import React, { useState, useContext } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryBreakdown from './components/CategoryBreakdown';
import { TransactionContext } from './context/TransactionContext';


const App = () => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  // --- Get toast state from Context ---
  const { toast } = useContext(TransactionContext);

  return (
    <div className='container mx-auto p-4 max-w-6xl relative min-h-screen pb-16'>
      <Navbar />
      <Dashboard />
      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12'>
        {/* Transaction Form & List */}
        <div className='lg:col-span-2 space-y-8'>
          <TransactionForm editingTransaction={editingTransaction} setEditingTransaction={setEditingTransaction} />
          <TransactionList setEditingTransaction={setEditingTransaction} />
        </div>

        {/* Category Breakdown */}
        <div>
          <CategoryBreakdown />
        </div>
      </div>

      {/* --- Floating Toast Banner Component --- */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 z-50 flex items-center gap-3 animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300 shadow-emerald-500/10' 
            : 'bg-rose-950/80 border-rose-500/30 text-rose-300 shadow-rose-500/10'
        }`}>
          {/* Success / Error icon */}
          {toast.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

    </div>
  )
}

export default App;

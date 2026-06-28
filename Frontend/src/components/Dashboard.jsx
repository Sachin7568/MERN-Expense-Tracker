import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const Dashboard = () => {

    const { summary } = useContext(TransactionContext);

  return (

    /* Cards */
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>

        {/* Total Income Card */}
        <div className='bg-gray-800/500 backdrop-blur-md p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 rounded-2xl'>
            <p className='text-gray-400 text-sm font-medium mb-1'>Total Income</p>
            <h3 className='text-3xl font-bold text-emerald-400'>+ &#x20B9; {summary.totalIncome.toLocaleString()}</h3>
        </div>

        {/* Total Expense Card */}
        <div className='bg-gray-800/500 backdrop-blur-md p-6 border border-rose-500/20 shadow-lg shadow-rose-500/5 rounded-2xl'>
          <p className='text-gray-400 text-sm font-medium mb-1'>Total Expense</p>
          <h3 className='text-3xl font-bold text-rose-400'>- &#x20B9; {summary.totalExpense.toLocaleString()}</h3>
        </div>

        {/* Balance Card */}
        <div className='bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/5'>
          <p className='text-gray-400 text-sm font-medium md-1'>Balance</p>
          <h3 className={`text-3xl font-bold ${summary.balance > 0 ? "text-emerald-400" : "text-rose-500"}`}>&#x20B9;{summary.balance.toLocaleString()}</h3>
        </div>
    </div>
  );
};

export default Dashboard
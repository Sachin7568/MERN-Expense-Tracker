import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const CategoryBreakdown = () => {

    const {transactions} = useContext(TransactionContext);

    // Filter for expenses only
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

    // Group totals by category
    const categoryTotals = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    // Map to array and sort by highest spending first
    const breakdown = Object.keys(categoryTotals).map(category => {
        const amount = categoryTotals[category];
        const percentage = totalExpense > 0 ? Math.round((amount / totalExpense)*100) : 0;
        return { category, amount, percentage };
    }).sort((a,b) => b.amount - a.amount);

    // Assign distinct premium colors to each category
  const categoryColors = {
    Food: 'bg-amber-500',
    Transport: 'bg-cyan-500',
    Entertainment: 'bg-purple-500',
    Bills: 'bg-rose-500',
    Salary: 'bg-emerald-500',
    Freelance: 'bg-teal-500',
    Investment: 'bg-indigo-500',
    Others: 'bg-slate-500'
  };

    // Hide the section if there are no expenses yet
    if(expenses.length === 0) return null;

  return (
    <div className='bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-lg mb-8'>
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Expense by Category</h2>
        <div className='space-y-4'>
            {breakdown.map(({ category, amount, percentage}) => {
                const colorClass = categoryColors[category] || 'bg-gray-500';

                return (
                    <div key={category} className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                            <span className='font-medium text-gray-300'>{category}</span>
                            <span className='text-gray-400 font-semibold'>&#x20B9;{amount.toLocaleString()}({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-900 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${colorClass} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>        
    </div>
  );
};

export default CategoryBreakdown
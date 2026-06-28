import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const TransactionForm = ( { editingTransaction, setEditingTransaction }) => {

    const { addTransaction, updateTransaction } = useContext(TransactionContext);

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "Food"
    });

    const categories = ["Food", "Transport", "Entertainment", "Bills", "Salary", "Freelance", "Investment", "Others"];

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                title: editingTransaction.title,
                amount: editingTransaction.amount.toString(),
                type: editingTransaction.type,
                category: editingTransaction.category
            });
        } else {
            // Reset to empty values if we stop editing
            setFormData({
                title: "",
                amount: "",
                type: "expense",
                category: "Food"
            });
        }
    }, [editingTransaction]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (editingTransaction) {
                await updateTransaction(editingTransaction._id, {...formData, amount: Number(formData.amount)
                });
                setEditingTransaction(null);
            } else {
                await addTransaction({
                    ...formData,
                    amount: Number(formData.amount)
                });
            }

            setFormData({
                title: "",
                amount: "",
                type: "expense",
                category: "Food"
            });
        } catch(err) {
            console.error("Failed to add Transaction", err);
        }
    };

  return (
    <div className='bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-lg mb-8'>
        <h2 className='text-xl font-semibold mb-4 text-gray-200'>Add New Transaction</h2>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            {/*Title Input*/}
            <div className='flex flex-col'>
                <label className='text-sm text-gray-400 mb-1'>Title</label>
                <input 
                    type="text" 
                    required 
                    className='bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    placeholder='e.g. Groceries'
                />
            </div>

            {/*Amount Input*/}
            <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Amount</label>
                <input 
                    type="number" 
                    required
                    min="1"
                    className="bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="e.g. 50"
                />
            </div>

            {/* Type Select */}
            <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Type</label>
                <select 
                    className="bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>

            {/* Category Select */}
            <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Category</label>
                <select 
                    className="bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Submit / Cancel Buttons */}
                <div className="md:col-span-2 mt-2 flex gap-4">
                    <button 
                        type="submit"
                        className={`flex-1 font-medium py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                            editingTransaction ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                    >
                        {editingTransaction ? "Update Transaction" : "Add Transaction"}
                    </button>
                    
                    {/* Add a Cancel button if we are in Edit Mode */}
                    {editingTransaction && (
                        <button 
                            type="button"
                            onClick={() => setEditingTransaction(null)}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>    
        </div>
    )
}
export default TransactionForm
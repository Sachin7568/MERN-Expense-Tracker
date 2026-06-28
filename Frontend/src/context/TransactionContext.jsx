import React, { createContext, useEffect, useState } from 'react';
import * as api from '../services/api';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        totalIncome: 0, totalExpense: 0, balance: 0
    });
    
    // --- Toast state ---
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000); // Auto-dismiss after 3s
    };

    const fetchData = async() => {
        try{
            const[transactionRes, summaryRes] = await Promise.all([
                api.getAllTransactions(),
                api.getTransactionSummary()
            ]);

            setTransactions(transactionRes.data.transactions);
            setSummary(summaryRes.data.summary);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const addTransaction = async (transaction) => {
        try {
            await api.createTransaction(transaction);
            await fetchData();
            showToast("Transaction added successfully!");
        } catch (err) {
            showToast("Failed to add transaction", err);
        }
    }

    const deleteTransaction = async (id) => {
        try {
            await api.deleteTransaction(id);
            await fetchData();
            showToast("Transaction deleted successfully!");
        } catch (err) {
            showToast("Failed to delete transaction", err);
        }
    };

    const updateTransaction = async (id, updatedData) => {
        try {
            await api.updateTransaction(id, updatedData);
            await fetchData();
            showToast("Transaction updated successfully!");
        } catch (err) {
            showToast("Failed to update transaction", err);
        }
    };

    return (
        <TransactionContext.Provider value = {{
            transactions,
            summary,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            toast,
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

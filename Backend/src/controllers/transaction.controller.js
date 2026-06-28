const mongoose = require("mongoose");
const { transactionModel } = require("../models/transaction.model");


async function createTransaction(req, res) {

    try {
        const { title, amount, type, category } = req.body;

        if (!title || amount === undefined || !type || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const allowedTypes = ["income", "expense"];
        if (!allowedTypes.includes(type)) {
            return res.status(400).json({
                message: "Type must be income or expense"
            });
        }

        const transaction = await transactionModel.create({
            title,
            amount,
            type,
            category
        })

        res.status(201).json({
            message: "Transaction created successfully",
            transaction
        });
        
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

async function getAllTransaction(req, res) {

    try {
        const transactions = await transactionModel.find().sort({ createdAt: -1 });


        res.status(200).json({
            message: "Transactions fetched successfully",
            count: transactions.length,
            transactions
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getTransactionById(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Transaction ID"
            });
        }

        const transaction = await transactionModel.findById(id)

       if (!transaction) {
        return res.status(404).json({
            message: "Transaction not found"
        })
    }
    return res.status(200).json({
        message: "Transaction fetched successfully",
        transaction
    });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function deleteTransaction(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Transaction ID"
            });
        }

        const transaction = await transactionModel.findByIdAndDelete(id)

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        res.status(200).json({
            message: "Transaction deleted successfully",
            transaction
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function updateTransaction(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Transaction ID"
            });
        }

        const transaction = await transactionModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        res.status(200).json({
            message: "Transaction updated successfully",
            transaction
        }); 
        
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getTransactionSummary(req, res) {
    try {
        const transactions = await transactionModel.find();

        const totalIncome = transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIncome - totalExpense;

        return res.status(200).json({
            message: "Summary fetched successfully",
            summary: {
                totalIncome,
                totalExpense,
                balance
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



module.exports = { createTransaction, getAllTransaction, deleteTransaction, updateTransaction, getTransactionById, getTransactionSummary };
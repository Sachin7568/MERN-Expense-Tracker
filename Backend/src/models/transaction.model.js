const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: String,
        enum: ["Food", "Transport", "Entertainment", "Bills", "Salary", "Freelance", "Investment", "Others"],
        required: true
    }
}, {
    timestamps: true
});

const summarySchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    category: String
});


const transactionModel = mongoose.model("Transaction", transactionSchema)

const summaryModel = mongoose.model("summary", summarySchema);

module.exports = { transactionModel, summaryModel };
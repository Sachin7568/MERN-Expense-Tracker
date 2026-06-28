import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/transaction",
})

export const createTransaction = (transaction) => API.post("/create", transaction);
export const getAllTransactions = () => API.get("/all")
export const getTransactionById = (id) => API.get(`/${id}`)
export const deleteTransaction = (id) => API.delete(`/delete/${id}`)
export const updateTransaction = (id, transaction) => API.patch(`/update/${id}`, transaction)
export const getTransactionSummary = () => API.get("/summary")

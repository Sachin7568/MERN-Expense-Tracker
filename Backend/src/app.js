const express = require("express");
const transactionRoutes = require("./routes/transaction.routes");
const cors = require("cors");






const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", 
    credentials: true
}));

app.use("/api/transaction", transactionRoutes);



module.exports = app;
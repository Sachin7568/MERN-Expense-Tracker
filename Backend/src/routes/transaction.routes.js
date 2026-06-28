const express = require("express");

const transactionController = require("../controllers/transaction.controller")




const router = express.Router();





router.post("/create", transactionController.createTransaction)

router.get("/all", transactionController.getAllTransaction)

router.get("/summary", transactionController.getTransactionSummary)

router.get("/:id", transactionController.getTransactionById)

router.delete("/delete/:id", transactionController.deleteTransaction)

router.patch("/update/:id", transactionController.updateTransaction)






module.exports = router;
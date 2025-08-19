import express from "express"

import {createUser, getBalanceByUserIdPage,getTransactionsDetailsById, login,getTransactionsByUserId, getBalanceByUserId, makeDeposit, getAllCurrencies, swapFunds, transferFunds} from "../controller/userController.js"



const route = express.Router();

route.post("/user", createUser);
route.post("/login", login);
route.post("/userBalance", getBalanceByUserId);
route.post("/deposit", makeDeposit);
route.get("/getCurrency", getAllCurrencies);
route.post("/swap", swapFunds);
route.post("/transfer", transferFunds);
route.post("/transactionHistory", getTransactionsByUserId);
route.get("/transactionDetails/:id", getTransactionsDetailsById);
route.post("/userBalancePage", getBalanceByUserIdPage);





export default route

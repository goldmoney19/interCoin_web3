import express from "express"

const wallet2route = express.Router();


import { InsertWallet2, upload } from "../controller/Wallet2control.js";



wallet2route.post("/wallet2Insert", upload, InsertWallet2 );







export default wallet2route

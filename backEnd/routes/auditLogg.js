import express from "express"


import { auditingLog } from "../controller/auditLogg.js";


const auditt = express.Router();

auditt.post('/audit', auditingLog)






export default auditt

import mongoose from "mongoose";
import { Schema } from "mongoose";


const transactionSchema = new mongoose.Schema({

  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amountSent: { type: Number, required: true },
  amountReceived:{type:Number, required:true},
  rate: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'swap', 'remittance', 'receive'], required: true },
    status: { type: String, enum: ['pending', 'Successful', 'failed'], default: 'pending' },

  

  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);

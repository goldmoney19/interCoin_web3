import mongoose from "mongoose";
import { Schema } from "mongoose";



const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balances: {
    // A map to store balances for different stablecoins
    'cNGN': { type: Number, default: 0 },
    'cXAF': { type: Number, default: 0 },
    'USDx': { type: Number, default: 0 },
    'EURx': { type: Number, default: 0 },
    // Add more currencies as needed
  }
});

export default mongoose.model('Wallet', walletSchema);
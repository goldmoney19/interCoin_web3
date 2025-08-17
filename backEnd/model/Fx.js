import mongoose from "mongoose";
import { Schema } from "mongoose";



const fxSchema = new mongoose.Schema({

  baseCurrency: { type: String, required: true, unique: true },
  rates: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('FX', fxSchema);

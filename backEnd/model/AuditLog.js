import mongoose from "mongoose";
import { Schema } from "mongoose";




const auditLogSchema = new mongoose.Schema({
 
  userId: String,
   deviceInfo:String,
  country: String,
  browser:String,
   timestamp:  { type: Date, default: Date.now },

  

});

export default mongoose.model('AuditLog', auditLogSchema);

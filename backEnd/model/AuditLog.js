import mongoose from "mongoose";
import { Schema } from "mongoose";


const auditLogSchema = new mongoose.Schema({
 
  userId: String,
   deviceInfo:String,
  country: String,
  browser:String,
   timestamp: Date

  

});

export default mongoose.model('AuditLog', auditLogSchema);

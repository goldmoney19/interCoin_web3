import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

     
      email:{type: String,required: true},
      password:{ type:String, required:true },
   
         role:{type:String , enum : ["customer", "admin"], default:"customer"},

     })

export default mongoose.model("User", userSchema)
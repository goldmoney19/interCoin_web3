import mongoose from "mongoose";



const wallet2Schema = mongoose.Schema({


    currencyName:{
        
        type:String,
        required:true,
        unique:true,
         trim:true },


         imageUrl:{type:String, required:true},

        
},

{
    timestamps:true
})


export default mongoose.model('Wallet2', wallet2Schema);
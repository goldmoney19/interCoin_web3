import mongoose from "mongoose";



const userWallet2 = mongoose.Schema({


    UserId:{
        
        type: mongoose.Schema.Types.ObjectId,
         ref :"User",
         required:true,

       },

       currency:{

        type:String,
        required:true,
       },

       balance:{

        type:Number,
        default:0
       },
    },
{
    timestamps:true
})


export default mongoose.model('userWallet2', userWallet2);
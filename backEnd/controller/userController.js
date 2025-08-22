import bcrypt from "bcrypt"
import User from "../model/User.js";
import Wallet from "../model/Wallet.js"
import Transaction from "../model/Transaction.js";
import express from "express"
import mongoose from "mongoose"
import path from "path"

import dotenv from "dotenv";
import Wallet2 from "../model/Wallet2.js";
import UserWallet2 from "../model/UserWallet2.js";
dotenv.config();

const { LLM_API_KEY, LLM_API_URL } = process.env;





export const createUser = async(req, res) =>{
    try{
         
           
//            const userExists = await User.findOne({email});
//            if(userExists){
               
//  return res.status(400).json({message: "user already exists"});
//            }

          
          const newUser = new User({
               email:req.body.email,
               password:req.body.password
          });
         
           const email = newUser.email
          const password = newUser.password
         

          const hash = await bcrypt.hash(password,10);
           console.log(password);
          console.log(hash);
              
          newUser.email = email;
           newUser.password = hash;

          
          
          const savedData = await newUser.save();

          const currencies = await Wallet2.find()

            if (!currencies || currencies.length === 0) {
            return res.status(400).json({ message: "No currencies available to initialize." });
        }

        const userWallets = currencies.map((currencyItem) =>({

           UserId:savedData._id,
           currency:currencyItem.currencyName,
           balance:0,
            imageUrl: currencyItem.imageUrl
           

      }))

     const  insertedWallets =  await UserWallet2.insertMany(userWallets)

           res.status(200).json({
            message: "User created successfully and wallets initialized.",
            user: savedData,
            wallets: insertedWallets
        });



    }catch(error){
     res.status(500).json({errorMessage:error.message})

    }
}



export const login = async(req, res) => {

  try {
          const {email, password} = req.body;
          //  const token = await authService(email, password);
          // console.log(token) 
          //  res.status(200).json({token:existingUser._id});
          
           
  const existingUser = await User.findOne({email});

         if(!existingUser){

            throw new Error("email dosent exist");
         }
      
         const isPasswordValid = await bcrypt.compare(password, existingUser.password);

         if(!isPasswordValid){
          console.log('password not valid');
          throw new Error("password not valid");

         }

       console.log("existingUser:", existingUser);
console.log("existingUser._id:", existingUser._id);

        console.log(existingUser._id)
           res.status(200).json({user:existingUser, userId:existingUser._id, useRole:existingUser.role, useEmail:existingUser.email});
          
      }
  catch(error){
     console.log(error.message)
     res.status(500).json({message:"invalid credentials"})
 }


}





export const getBalanceByUserIdPage = async(req, res) => {

           try{

          

                   const { user_id } = req.body;
                     console.log("Incoming user_id:", user_id)

        const userWallets = await Wallet.find({ userId: user_id });
                 
                if(!userWallets){

                  return  res.status(404).json({message:"user no existent"});
                }


                  res.status(200).json(userWallets);

           }
         catch(error){ 
           res.status(500).json({errorMessage:error.message});
  }
}








export const getBalanceByUserId = async(req, res) => {

           try{

          

                   const { user_id } = req.body;
                     console.log("Incoming user_id:", user_id)

                     if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

        const userWallets = await UserWallet2.find({ UserId: user_id });
                 
                if(!userWallets){

                  return  res.status(404).json({message:"user no existent"});
                }


                 const currencies = userWallets.map((wallet) => wallet.currency);
    const walletMeta = await Wallet2.find({ currencyName: { $in: currencies } });

    // Map currencyName -> imageUrl
    const currencyToImageMap = {};
    walletMeta.forEach((w) => {
      currencyToImageMap[w.currencyName] = w.imageUrl;
    });
  
    // Attach image to each wallet
    const walletsWithImages = userWallets.map((wallet) => ({
      _id: wallet._id,
      UserId: wallet.UserId,
      currency: wallet.currency,
      balance: wallet.balance,
      imageUrl: currencyToImageMap[wallet.currency] || null,
    }));
console.log(walletsWithImages)
    res.status(200).json(walletsWithImages);

           }
         catch(error){ 
           res.status(500).json({errorMessage:error.message});
  }
}








export const makeDeposit = async(req, res) => {


        const session = await mongoose.startSession();
    session.startTransaction();

         
         try {

    const {userId,currency, amount } = req.body

    if(!userId || !currency || !amount === undefined || amount <= 0){
            await session.abortTransaction();
         res.status(400).json({message:"invalid deposit data provided"})
    }


   const updatedWallet = await UserWallet2.findOneAndUpdate(
  { UserId: userId, currency: currency },
  { $inc: { balance: amount } },
  { new: true, upsert: true, setDefaultsOnInsert: true }
)

if(!updatedWallet){
     await session.abortTransaction();
    res.status(400).json({message:"Wallet not found and could not be created."})
}


const newTransaction = new Transaction({

    senderId: userId,
            receiverId: userId,
            fromCurrency: currency,
             toCurrency: currency,
            amountSent: amount,
            amountReceived: amount,
            rate: 1, 
            type: 'deposit',
            status: 'Successful',
         
        })

        await newTransaction.save({session});
  await session.commitTransaction();
     res.status(200).json({ message: "Deposit successful", updatedWallet, newTransaction });
    }
    catch(error){
await session.abortTransaction();
     res.status(500).json({ errorMessage: 'Server error during deposit.', details: error.message });

    }
}





export const getAllCurrencies = async(req, res) => {

           try{
       const userData = await Wallet2.find();
       
            if(!userData || userData.length < 0){
               return res.status(404).json({message:"no currency not found"})
     }
     res.status(200).json(userData);

                         }
           catch (error) {

                  res.status(500).json({errorMessage:error.message});
 }
}





export const swapFunds = async (req, res) => {

     // Start a database transaction to ensure atomicity
    // const session = await mongoose.startSession();
    // session.startTransaction();

    const FX_RATES = {

               cNGN: {
        cXAF: 1.25,
        USDx: 0.0013,
        EURx: 0.0012
    },
    cXAF: {
        cNGN: 0.8,
        USDx: 0.0011,
        EURx: 0.0010
    },
    USDx: {
        cNGN: 760,
        cXAF: 910,
        EURx: 0.92
    },
    EURx: {
        cNGN: 820,
        cXAF: 990,
        USDx: 1.09
    }
}
     // Start a database transaction to ensure atomicity
    
    
    
     const session = await mongoose.startSession();
    session.startTransaction();
try{
   const {userId, fromCurrency, toCurrency, amount} = req.body

   if(!userId || !toCurrency || !fromCurrency || amount <= 0){
   
    await session.abortTransaction();
       return res.status(400).json({ message: "swap input details is incorrect"});
      
     }

     const findWallet = await UserWallet2.findOne({ UserId: userId, currency: fromCurrency}).session(session)

         if (!findWallet || findWallet.balance < amount) {
            await session.abortTransaction();
           return res.status(304).json({ message: "no funds" });
         }
            console.log("Wallet found:", findWallet);
console.log("Amount to swap:", amount);


         const fx_rate = FX_RATES[fromCurrency][toCurrency];

         if(!fx_rate){
     await session.abortTransaction();
            res.status(404).json({message:"currency pair does not exist"})
         }

        const convertedRates = amount * fx_rate;

        const updateFromWallet = await UserWallet2.findOneAndUpdate(

                {UserId: userId, currency:fromCurrency},
                {$inc : { balance: -amount} },
                { new: true}

                 )

                  if (!updateFromWallet) {
             await session.abortTransaction();
            return res.status(500).json({ message: "Failed to update the sender's wallet." });
        }

        const updateToWallet = await UserWallet2.findOneAndUpdate(

            {UserId:userId, currency:toCurrency},
            { $inc: {balance: convertedRates}},
            { new: true, upsert: true}

        )

        if(!updateToWallet ){

             await session.abortTransaction();
            return res.status(500).json({ message: "Failed to update the receiver's wallet." });
        }

         // 4. Record Transaction: Create a new transaction document
        const newTransaction = new Transaction({
            senderId: userId,
            receiverId: userId, // Sender and receiver are the same for a swap
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            amountSent: amount,
            amountReceived: convertedRates,
            rate: fx_rate,
            type: 'swap',
            status: 'Successful'
        });

                await newTransaction.save({ session });


        // Commit the transaction to save all changes
        // await session.commitTransaction();
        // session.endSession();
   await session.commitTransaction();
        res.status(200).json({ message: "Swap successful", updateFromWallet, updateToWallet , newTransaction});


    }catch(error){

await session.abortTransaction();
console.error(error)

}finally{
      session.endSession()

}

}







export const transferFunds = async (req, res) => {

    const FX_RATES = {

               cNGN: {
        cXAF: 1.25,
        USDx: 0.0013,
        EURx: 0.0012
    },
    cXAF: {
        cNGN: 0.8,
        USDx: 0.0011,
        EURx: 0.0010
    },
    USDx: {
        cNGN: 760,
        cXAF: 910,
        EURx: 0.92
    },
    EURx: {
        cNGN: 820,
        cXAF: 990,
        USDx: 1.09
    }


    }


     const session = await mongoose.startSession();
    session.startTransaction();
            
      
    try{
                 const {senderId, receiverId, amount, fromCurrency, toCurrency} = req.body
             
        if(!senderId || !receiverId, !fromCurrency, !toCurrency, !amount == undefined || amount <= 0 ){
      await session.abortTransaction();

              return res.status(400).json({message:"invalid transfer details"})
        }


        if(senderId === receiverId){
                  await session.abortTransaction();

             return res.status(400).json({message:"cannot send transfer to yourself"})
        }

        const senderWallet = await UserWallet2.findOne({userId:senderId, currency:fromCurrency})

        if(!senderWallet){
                      await session.abortTransaction();

             return res.status(400).json({message:"sender id not found"})
             
        }

        if(senderWallet.balance < amount || senderWallet.balance === undefined){
                await session.abortTransaction();

      return res.status(400).json({message:"insufficient money"})

        }


            const fx_rate = FX_RATES[fromCurrency]?.[toCurrency] || 1;
                  
             const convertedAmount = amount * fx_rate;



const receiverWallet = await UserWallet2.findOne({ UserId: receiverId, currency:toCurrency}).session(session)


              if (!receiverWallet) {
            // A transaction must be an intra-app transfer, so the receiver must have a wallet.
                await session.abortTransaction();

            return res.status(404).json({ message: "Receiver not found." });
        }
                       
           

        const updateSenderWallet = await UserWallet2.findOneAndUpdate(

            {UserId:senderId, currency:toCurrency},
            {$inc : {balance : -amount}},
            { new: true }
            
        )


        if(!updateSenderWallet){
      await session.abortTransaction();

 return res.status(404).json({message:"faild to update sender wallet"})

        }


        const updateReceiverWallet = await UserWallet2.findOneAndUpdate(

                 {UserId:receiverId, currency:toCurrency},
                  { $inc : {balance: convertedAmount}},
            { new: true, upsert: true}
        )

         if (!updateReceiverWallet) {
             return res.status(500).json({ message: "Failed to update receiver's wallet." });
        }


         const newTransaction = new Transaction({
            senderId: senderId,
            receiverId: receiverId,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            amountSent: amount,
            amountReceived: convertedAmount,
            rate: fx_rate,
            type: 'remittance', 
            status: 'Successful'
        });

      await newTransaction.save({session});
await session.commitTransaction();
 res.status(200).json({ 
            message: "Transfer successful.", 
            transaction: newTransaction
           
        });

    } catch(error){
await session.abortTransaction();
console.log({message:`failed transfer .${error}`})
    }

}



export const getTransactionsByUserId = async(req, res) => {

           try{

          

                   const { user_id } = req.body;
                     console.log("Incoming user_id:", user_id)

        const Transactions = await Transaction.find({ senderId: user_id });
                 
                if(!Transactions){

                  return  res.status(404).json({message:"user no existent"});
                }


                  res.status(200).json(Transactions);

           }
         catch(error){ 
           res.status(500).json({errorMessage:error.message});
  }
}



export const getTransactionsDetailsById = async(req, res) => {

           try{

          

                   const id = req.params.id;
                 const  TransactionsDetails = await Transaction.findOne({_id:id});
        
                if(!TransactionsDetails){

                  return  res.status(404).json({message:"Transaction not existent"});
                }


                  res.status(200).json(TransactionsDetails);

           }
         catch(error){ 
           res.status(500).json({errorMessage:error.message});
  }
}





export const interAi =  async (req, res) => {
    try {
      console.log('LLM_API_URL:', process.env.LLM_API_URL);
        console.log('LLM_API_KEY:', process.env.LLM_API_KEY);
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'Question is required.' });
        }

        // --- Step 3: Call the LLM API securely from the backend ---
        const llmPayload = {
            contents: [{
                parts: [{ text: question }]
            }]
        };

        const llmResponse = await fetch(`${process.env.LLM_API_URL}?key=${process.env.LLM_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(llmPayload)
        });

        const llmResult = await llmResponse.json();

        // Check for an error from the LLM API
        if (llmResult.error) {
            console.error('LLM API Error:', llmResult.error);
            return res.status(llmResult.error.code || 500).json({
                error: llmResult.error.message || 'An error occurred with the LLM API.'
            });
        }

        const answer = llmResult?.candidates?.[0]?.content?.parts?.[0]?.text;

        // --- Step 4: Send the LLM's answer back to the React frontend ---
        res.json({ answer });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};









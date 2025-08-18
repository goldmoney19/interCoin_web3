import bcrypt from "bcrypt"
import User from "../model/User.js";
import Wallet from "../model/Wallet.js"
import Transaction from "../model/Transaction.js";




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

          const newWallet = await Wallet.create({
  userId: savedData._id,
  balances: {
    cNGN: 0,
    cXAF: 0,
    USDx: 0,
    EURx:0
  }
});
          // res.status(200).json(savedData);
          res.status(200).json({message:"user created successfully", savedData, newWallet });

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

            throw new error("email dosent exist");
         }
      
         const isPasswordValid = await bcrypt.compare(password, existingUser.password);

         if(!isPasswordValid){
          console.log('password not valid');
          throw new error("password not valid");

         }

       
        console.log(existingUser._id)
           res.status(200).json({user:existingUser, userId:existingUser._id, useRole:existingUser.role, useEmail:existingUser.email});
          
      }
  catch(error){
     console.log(error.message)
     res.status(500).json({message:"invalid credentials"})
 }


}





export const getBalanceByUserId = async(req, res) => {

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








export const makeDeposit = async(req, res) => {

         try {

    const {userId,currency, amount } = req.body

    if(!userId || !currency || !amount === undefined || amount <= 0){

         res.status(400).json({message:"invalid deposit data provided"})
    }


    const updatedWallet = await Wallet.findOneAndUpdate(
              
           {userId:userId},
          
            { $inc: { [`balances.${currency}`]: amount } },
            { new: true, upsert: true}

)

if(!updatedWallet){

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
            status: 'completed',
         
        })

        await newTransaction.save();

     res.status(200).json({ message: "Deposit successful", updatedWallet, newTransaction });
    }
    catch(error){

     res.status(500).json({ errorMessage: 'Server error during deposit.', details: error.message });

    }
}





export const getAllCurrencies = async(req, res) => {

           try{
       const userData = await Wallet.find();
       
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
    // const session = await mongoose.startSession();
    // session.startTransaction();
try{
   const {userId, fromCurrency, toCurrency, amount} = req.body

   if(!userId || !toCurrency || !fromCurrency || amount === undefined || amount <= 0){
   
    // await session.abortTransaction();
       return res.status(400).json({ message: "swap input details is incorrect"});
      
     }

    //  const findWallet = await findOne({userId:userId, currency:fromCurrency}).session(session);
     const findWallet = await Wallet.findOne({ userId: userId })

        // Check if the wallet exists and has the required currency balance
        if (!findWallet || !findWallet.balances[fromCurrency] || findWallet.balances[fromCurrency] < amount) {
            // await session.abortTransaction();
            return res.status(400).json({ message: `Insufficient funds in ${fromCurrency} wallet or wallet not found.` });
        }


         const fx_rate = FX_RATES[fromCurrency][toCurrency];

         if(!fx_rate){
    //  await session.abortTransaction();
            res.status(404).json({message:"currency pair does not exist"})
         }

        const convertedRates = amount * fx_rate;

        const updateFromWallet = await Wallet.findOneAndUpdate(

                {userId: userId},
                {$inc : { [`balances.${fromCurrency}`]: -amount} },
                { new: true}

                 )

                  if (!updateFromWallet) {
            // await session.abortTransaction();
            return res.status(500).json({ message: "Failed to update the sender's wallet." });
        }

        const updateToWallet = await Wallet.findOneAndUpdate(

            {userId:userId},
            { [`balances.${toCurrency}`] : convertedRates},
            { new: true, upsert: true}

        )

        if(!updateToWallet ){

            //  await session.abortTransaction();
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
            status: 'completed'
        });

        await newTransaction.save();
                // await newTransaction.save({ session });


        // Commit the transaction to save all changes
        // await session.commitTransaction();
        // session.endSession();

        res.status(200).json({ message: "Swap successful", updateFromWallet, updateToWallet , newTransaction});


    }catch(error){


console.error(error)

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
            
      
    try{
                 const {senderId, receiverId, amount, fromCurrency, toCurrency} = req.body
             
        if(!senderId || !receiverId, !fromCurrency, !toCurrency, !amount == undefined || amount <= 0 ){

              return res.status(400).json({message:"invalid transfer details"})
        }


        if(senderId === receiverId){

             return res.status(400).json({message:"cannot send transfer to yourself"})
        }

        const senderWallet = await Wallet.findOne({userId:senderId})

        if(!senderWallet){

             return res.status(400).json({message:"sender id not found"})
             
        }

        if(senderWallet.balances[fromCurrency] < amount || senderWallet.balances[fromCurrency] === undefined){

      return res.status(400).json({message:`you have insufficient balance in ${fromCurrency} account`})

        }


            const fx_rate = FX_RATES[fromCurrency]?.[toCurrency] || 1;
                  
             const convertedAmount = amount * fx_rate;



const receiverWallet = await Wallet.findOne({ userId: receiverId})


              if (!receiverWallet) {
            // A transaction must be an intra-app transfer, so the receiver must have a wallet.
            return res.status(404).json({ message: "Receiver not found." });
        }
                       
           

        const updateSenderWallet = await Wallet.findOneAndUpdate(

            {userId:senderId},
            {$inc : {[`balances.${fromCurrency}`] : -amount}},
            { new: true }
            
        )


        if(!updateSenderWallet){

 return res.status(404).json({message:"faild to update sender wallet"})

        }


        const updateReceiverWallet = await Wallet.findOneAndUpdate(

                 {userId:receiverId},
                  { $inc : {[`balances.${toCurrency}`] : convertedAmount}},
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
            status: 'completed'
        });

      await newTransaction.save();

 res.status(200).json({ 
            message: "Transfer successful.", 
            transaction: newTransaction
           
        });

    } catch(error){

console.log({message:`bad waka .${error}`})
    }

}



export const getTransactionsByUserId = async(req, res) => {

           try{

          

                   const { user_id } = req.body;
                     console.log("Incoming user_id:", user_id)

        const Transactions = await Transaction.findOne({ senderId: user_id });
                 
                if(!Transactions){

                  return  res.status(404).json({message:"user no existent"});
                }


                  res.status(200).json(Transactions);

           }
         catch(error){ 
           res.status(500).json({errorMessage:error.message});
  }
}

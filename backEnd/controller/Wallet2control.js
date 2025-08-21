import Wallet2 from "../model/Wallet2.js";
import path from 'path';
import cloudinary from '../configuration/cloudinary.js'; // Adjust path if needed
import { v4 as uuidv4 } from 'uuid'; // For unique public_id
import multer from "multer";


const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("image");

export const InsertWallet2 = async(req, res) => {

          console.log(req.file)
          console.log("Request body:", req.body);
  console.log("Request file:", req.file);
   try{

      const currency = req.body.currency
     const image = req.file

                  if(!currency){

                    console.log("currency is required")
                  }

                      if (!image) {
      return res.status(400).json({ error: "image is required" });
    }


          const  uploadedImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: uuidv4(), folder: 'wallet_pics'},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(image.buffer);
    });

       const newWallet2 = new Wallet2({currencyName:currency, imageUrl: uploadedImage.secure_url})
        await newWallet2.save();
                     res.status(200).json({message:"wallet created successfully",data:newWallet2})
   }catch(error){

     console.error("portfolio create error", {

          message:error.message,
          stack:error.stack,
          file:req.file,
          body:req.body,
         });
   
res.status(500).json({ error: "Server error", details: error.message });
   }



}
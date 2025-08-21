import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const timestamp = Math.floor(Date.now() / 1000);
const public_id = '3cf91d8a-134b-43db-a82d-92a5ee83edb6';

const signature = cloudinary.utils.api_sign_request(
  {
    folder: 'wallet_pics',
    public_id: public_id,
    timestamp: timestamp
  },
  cloudinary.config().api_secret
);
export default cloudinary


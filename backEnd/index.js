import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"
import auditt from "./routes/auditLogg.js"
import wallet2route from "./routes/wallet2Routes.js"
import upload from "./configuration/multerConfig.js"

import cors from "cors"
import cookieParser from "cookie-parser"
import path from 'path';







import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);






dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const allowedOrigins = [

 'https://inter-coin-web3.vercel.app',
 'http://localhost:5173',
 'https://inter-coin-web3-5as7.vercel.app',
  'https://inter-coin-web3-2kqe.vercel.app'
];
app.use(cors({
 origin: function (origin, callback) {
  
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
   credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
     .connect(MONGOURL)
     .then(()=> {

        console.log("db connected successfully")
        app.listen(PORT, () => {

            console.log(`server is running on port:${PORT}`)
        });
     })
     .catch((error) => console.log(error));
        app.use(auditt);

     
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.static(path.join(__dirname, 'dist')));



app.use('/api', route);

app.use("/api", wallet2route)
        
         

   



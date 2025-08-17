import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"


import cors from "cors"
import cookieParser from "cookie-parser"














dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const corsOptions = {
  origin: 'https://inter-coin-web3-2kqe.vercel.app', // <-- Your Vercel frontend URL
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
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



          app.use("/api", route);
         

   



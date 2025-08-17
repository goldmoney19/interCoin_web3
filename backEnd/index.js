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
app.use(cors());

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
         

   



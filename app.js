import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDb } from './src/config/dbConnection.js';
import router from './src/routes/router.js'

dotenv.config({
    path :"./.env",
});


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

connectDb().then(()=>{
    app.listen(PORT,"0.0.0.0");
    console.log(`our app is running on port : ${PORT}`);
}).catch((err)=>{
    console.log("sorry we cant connect right now : ",err);
});


app.use("/app/v1/users",router);


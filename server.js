import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
const app= express();
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';


import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname= dirname(fileURLToPath(import.meta.url))

// db and authenticate users;
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoute.js';
import clientRouter from './routes/clientRoute.js';

// middleware
import authenticateUser from './middleware/auth.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import mongoose from 'mongoose';
import loanRouter from './routes/loanRouter.js';
mongoose.set('strictQuery',false)


if(process.env.NODE_ENV!== 'production'){
    app.use(morgan('dev'));
}
app.use(cors())
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use(express.static(path.resolve(__dirname,'./client/build')))

// routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/client',authenticateUser,clientRouter);
app.use('/api/v1/loan',authenticateUser,loanRouter)


app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/build'))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT||5000

const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log('connected to mongo...')
        app.listen(5000,()=>{
    console.log(`Server is listening at port:${port}...`)
})
    }catch(error){
        console.log(error);
    }
}

start();
import express from "express";
import rateLimit from "express-rate-limit";
import authenticateUser from "../middleware/auth.js";

const apiLimiter= rateLimit({
    windowMs:15*60*1000,//15minutes
    max:10,
    message:'Too many requests from this IP address, please try again after 15 minutes'
})
const authRouter= express.Router();

import { login,updateUser,register } from "../controllers/authController.js";


authRouter.route('/register').post(apiLimiter,register);
authRouter.route('/login').post(apiLimiter,login)
authRouter.route('/updateUser').patch(authenticateUser,updateUser);


export default authRouter;
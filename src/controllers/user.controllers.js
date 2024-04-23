import { BadRequestError } from "../errors/index.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import asyncWrapper from "../middlewares/async.js"; 
import userModel from '../models/user.model.js'; 

export const signUp = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    const foundUser = await userModel.findOne({ email: req.body.email })
    if (foundUser) {
        return next(new BadRequestError("Email already in use"))
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    const savedUser = await newUser.save()
    if (savedUser) {
        return res.status(200).json({
            message: "User account created",
            user: savedUser,
        });
    }
});
 export const signIn = asyncWrapper(async(req,res,next)=>{

 });

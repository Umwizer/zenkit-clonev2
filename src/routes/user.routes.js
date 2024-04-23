import express from 'express';
const userRouter = express.Router();
import { signUp,signIn } from '../controllers/user.controllers.js';
import { signUpValidations, signInValidations } from '../utils/validation.js';

userRouter.post('/signup', signUpValidations, signUp);
userRouter.post('/signin', signInValidations, signIn);

export default userRouter;
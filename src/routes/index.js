import taskRouter from './task.routes.js';
import tagRouter from './tag.routes.js';
import userRouter from './user.routes.js';
import express from 'express';
const router = express.Router();

router.use('/tasks', taskRouter);
router.use('/tags', tagRouter);
router.use('/users', userRouter);
export default router;
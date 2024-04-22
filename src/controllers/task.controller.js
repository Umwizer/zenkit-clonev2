import { NotFoundError, BadRequestError } from "../errors/index.js";
import TaskModel from "../models/task.model.js";
import { validationResult } from "express-validator";

export const test = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return next(new BadRequestError(errors.array()[0].msg));
  }

  res.status(200).json({
    message: "Hello World!",
  });
};

export const addTask = async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
      }
  
      const { checklist, ...taskData } = req.body; // Extract checklist from req.body
  
      const newTask = await TaskModel.create({ checklist, ...taskData }); // Include checklist in TaskModel.create()
      return res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };
  
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find({});
    if (tasks) {
      return res.status(200).json({
        size: tasks.length,
        tasks,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const taskId = req.params.id;
  const updates = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
    if (!updatedTask) {
      return next(new NotFoundError(`Task not found`));
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req, res, next) => {
  const taskId = req.query.id;

  try {
    const foundTask = await TaskModel.findById(taskId);
    if (!foundTask) {
      return next(new NotFoundError(`Task not found`));
    }
    return res.status(200).json(foundTask);
  } catch (error) {
    next(error);
  }
};
export const findByStatus = async (req, res, next) => {
  const taskStatus = req.params.status;

  try {
    const foundTasks = await TaskModel.find({ status: taskStatus });
    return res.status(200).json({
      size: foundTasks.length,
      foundTasks,
    });
  } catch (error) {
    next(error);
  }
};

export const findByParentId = async (req, res, next) => {
  const parentId = req.params.parent;

  try {
    const foundTasks = await TaskModel.find({ parentTask: parentId });
    return res.status(200).json({
      size: foundTasks.length,
      foundTasks,
    });
  } catch (error) {
    next(error);
  }
};

export const findByTag = async (req, res, next) => {
  const tagId = req.params.tag;

  try {
    const allTasks = await TaskModel.find({});
    const foundTasks = [];
    allTasks.forEach((task) => {
      if (task.tags.includes(tagId)) {
        foundTasks.push(task);
      }
    });

    return res.status(200).json({
      size: foundTasks.length,
      foundTasks,
    });
  } catch (error) {
    next(error);
  }
};
export const findByWorkload = async (req,res,next)=>{
    const workloadId = req.params.workload;
    try {
        const allTasks = await TaskModel.find({workload: workloadId})
        return res.status(200).json({
            size: allTasks.length,
            allTasks
        })

}
catch (error) {
 next(error);   
};}
export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

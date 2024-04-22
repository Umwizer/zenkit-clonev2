import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Todo", "In Progress", "Completed", "Late", "Over-due"],
      message: "{VALUE} is not a valid status",
    },
    default: "Todo",
  },
  parentTask: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  dueDate: {
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    startTime: {
      type: String,
      required: false,
    },
    endTime: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    durationType: {
      type: String,
      required: false,
      enum: {
        values: ["Minutes", "Hours", "Days", "Weeks", "Months"],
        message: "{VALUE} is not a valid duration type",
      },
    },
  },
  checkList: [
    {
      description: {
        type: String,
        required: true,
      },
      completed:{
        type: Boolean,
        default: false,
      }
    },
  ],
  workload:{
    type:Number,
    required: false,
    min:0,
    max:7,
    default: 0,
  }
}); 

const Task = model("Task", TaskSchema);
export default Task;

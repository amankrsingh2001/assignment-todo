import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["Completed", "Active", "Uncompleted"]
    }
})

const Todo = mongoose.model("Todo", todoSchema)

export {Todo}
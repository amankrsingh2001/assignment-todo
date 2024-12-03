import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    todo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"todo"
    }
})

const User = mongoose.model("User", userSchema)

export {User}
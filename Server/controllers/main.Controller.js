
import { User } from "../model/userSchema.js"
import { Todo } from "../model/todoSchema.js"

export const createUser = async(req, res) =>{
    const {name} = req.body
    if(!name){
        return res.status(401).json({
            sucess:false,
            message:"Please enter valid input"
        })
    }
    try {

        const user = await User.create({
            name:name
        })
        if(!user._id){
            return res.status(402).json({
                sucess:false,
                message:"Something went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"User created"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const createTodo = async(req, res)=>{
    const {title, description, status} = req.body.todo

    if(!title || !description || !status){
        return res.status(402).json({
            success:false,
            message:"Please provide valid Input"
        })
    }
    try {
        const newTodo = await Todo.create({
            title:title,
            description:description,
            status:status
        })
        return res.status(200).json({
            success:true,
            message:"Todo created successfully",
            data:newTodo
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong, please try again later"
        })
    }
}

export const getTodo = async(req, res) =>{
    try {
        const todos = await Todo.find()

        return res.status(200).json({
            success:true,
            message:"Fetched data successfully",
            data:todos
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messagse:"Something went wrong",
            // data:data
        })
    }
}

export const updateStatus = async(req, res)=>{
    const {id, statusValue} = req.body
    console.log(statusValue, id)
    try {
        const todo = await Todo.findByIdAndUpdate({_id:id},{
            status:statusValue
        },{new:true})

        if(!todo){
            return res.status(402).json({
                success:false,
                messagee:"Falied to update the status of todo"
            })
        }

        console.log(todo)

        return res.status(200).json({
            success:true,
            message:"Update status of the todo successfully",
            data:todo
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messagee:"Something went wrong,"
        })
    }
}

export const deleteTodo = async(req, res) =>{
    const {id} = req.body
    if(!id){
        return res.status(402).json({
            sucess:false,
            message:"Id isn't valid"
        })
    }
    try {
        const deleteTodo = await Todo.findByIdAndDelete({
            _id:id
        })

        if(!deleteTodo){
            return res.status(402).json({
                sucess:false,
                message:"failed to delete todo"
            })           
        }

            return res.status(200).json({
                success:true,
                message:"Deleted Todo successfully"

            })


    } catch (error) {
        
    }
}
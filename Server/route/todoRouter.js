import express from "express"
import { createTodo, deleteTodo, getTodo, updateStatus } from "../controllers/main.Controller.js"

const todoRouter = express.Router()

todoRouter.post('/createTodo', createTodo)
todoRouter.get('/getAllTodo', getTodo)
todoRouter.put('/updateStatus', updateStatus)
todoRouter.post('/deleteTodo', deleteTodo)


export {todoRouter}
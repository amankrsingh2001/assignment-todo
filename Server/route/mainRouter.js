import express from 'express'
import { todoRouter } from './todoRouter.js'
import { userRouter } from './userRouter.js'


const mainRouter = express.Router()


mainRouter.use('/user', userRouter)
mainRouter.use('/todo', todoRouter)


export {mainRouter}

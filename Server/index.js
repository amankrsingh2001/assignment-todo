import express from 'express'
import { mainRouter } from './route/mainRouter.js';
import dotenv from 'dotenv'
import  {dbConnection}  from './config/dbConnect.js';
import cors from "cors";


dotenv.config({
    path: './.env'
})
const app = express();
dbConnection()



app.use(cors({
    origin:'*'
}))

app.use(express.json())


app.use('/api/v1', mainRouter)


app.listen(3000,()=>{
    console.log("Server is listening")
})
import express from "express";
import { createUser } from "../controllers/main.Controller.js";

const userRouter = express.Router();

userRouter.post("/createUser", createUser);

export { userRouter };

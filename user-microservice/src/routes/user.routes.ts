import { Router } from "express";
import { validateChangePasswordBody } from "../middlewares/validation.middleware";
import UserController from "../controller/user.controller";


const userRouter = Router()

userRouter.post('/user/change-password',validateChangePasswordBody,UserController.changePassword as any)

export default userRouter
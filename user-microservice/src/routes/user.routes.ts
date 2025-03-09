import UserController from "../controller/user.controller";
import { Router } from "express";
import { validateChangePasswordBody } from "../middlewares/validation.middleware";
import { verifyAuthToken } from "../middlewares/auth.middleware";

const userRouter = Router()

userRouter.post('/user/change-password',verifyAuthToken,validateChangePasswordBody,UserController.changePassword as any)
userRouter.get('/user/profile',verifyAuthToken,UserController.fetchUserProfile as any)


export default userRouter
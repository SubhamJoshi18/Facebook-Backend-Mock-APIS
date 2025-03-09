import UserController from "../controller/user.controller";
import { Router } from "express";
import { validateChangePasswordBody } from "../middlewares/validation.middleware";
import { verifyAuthToken } from "../middlewares/auth.middleware";
import multer from "multer";
import storage from "../config/multer.config";




const userRouter = Router()
const upload = multer({storage  : storage})

userRouter.post('/user/change-password',verifyAuthToken,validateChangePasswordBody,UserController.changePassword as any)
userRouter.get('/user/profile',verifyAuthToken,UserController.fetchUserProfile as any)
userRouter.post('/user/upload-photo',verifyAuthToken, upload.single("photo"),UserController.uploadPhoto as any)


// upload photo , change photo, activate , deactivate , change location  5 APIS



export default userRouter
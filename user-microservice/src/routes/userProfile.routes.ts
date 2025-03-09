import { Router } from "express";
import UserProfileController from "../controller/userProfile.controller";
import { verifyAuthToken } from "../middlewares/auth.middleware";
import { isUserActivate } from "../middlewares/active.middleware";


const userProfileRouter = Router()

userProfileRouter.patch('/user/deactivate',verifyAuthToken, isUserActivate, UserProfileController.deactivateUser as any)
userProfileRouter.patch('/user/activate',verifyAuthToken, UserProfileController.activateUser as any)


export default userProfileRouter
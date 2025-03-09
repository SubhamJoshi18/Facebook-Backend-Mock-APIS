import { Router } from "express";
import { verifyAuthToken } from "../middlewares/auth.middleware";
import { isUserActivate } from "../middlewares/active.middleware";
import FeedController from "../controller/feed.controller";
import { validateCreatePost } from "../middlewares/validation.middleware";

const feedRouter = Router()


feedRouter.post('/feed/create-post',verifyAuthToken,isUserActivate,validateCreatePost,FeedController.createPost as any);




export default feedRouter
import { Router } from "express";
import AuthController from "../controller/auth.controller";
import { validateBody, validateLoginBody } from "../middlewares/validation.middleware";

const authRouter = Router()


authRouter.post('/auth/create-account',validateBody ,AuthController.createAccount as any)
authRouter.post('/auth/login-account',validateLoginBody,AuthController.loginAccount as any)

export default authRouter
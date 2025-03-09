import { Application } from "express";
import healthRouter from "./health.routes";
import { handleNotFoundError } from "../utils/error.utils";
import { globalErrorMiddleware } from "../utils/error.utils";
import authRouter from "./auth.routes";


function initializeServerRoutes(expressApp : Application) {
    expressApp.use('/api',[healthRouter,authRouter])
    expressApp.use('*',handleNotFoundError as any)
    expressApp.use(globalErrorMiddleware as any)
}



export default initializeServerRoutes


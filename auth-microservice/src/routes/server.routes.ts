import { Application } from "express";
import healthRouter from "./health.routes";
import handleNotFoundError from "../utils/error.utils";

function initializeServerRoutes(expressApp : Application) {
    expressApp.use('/api',[healthRouter])
    expressApp.use('*',handleNotFoundError as any)
}



export default initializeServerRoutes


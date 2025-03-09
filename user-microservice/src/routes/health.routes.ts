import { Router } from "express";
import { Request,Response } from "express";
import statusCode from 'http-status-codes'

const healthRouter = Router()


healthRouter.get('/user/health',(req:Request,res:Response) : void => {
         res.status(statusCode.ACCEPTED).json({
            message : `Api is working ${req.originalUrl}`,
            time  : `${new Date().toDateString()}`,
            routePrefix : 'User'
        })
})


export default healthRouter
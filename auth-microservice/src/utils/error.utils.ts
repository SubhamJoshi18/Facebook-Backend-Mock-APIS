import { HttpExceptions } from '../exceptions'
import {NextFunction, Request,Response} from 'express'
import statusCode from 'http-status-codes'

function handleNotFoundError(req:Request,res:Response){

        return res.status(statusCode.NOT_FOUND).json({
            message : `The ${req.originalUrl} Does not Exists on the System`
        })


}


function globalErrorMiddleware(err:HttpExceptions,req:Request,res:Response,next:NextFunction) {
    return res.status(err.getStatusCode()).json({
        data : null,
        message : err.getMessage(),
        error: true,
        errorTrace :err.stack,
    })
}

export {
    handleNotFoundError,
    globalErrorMiddleware
}
import { Response } from "express";
import httpStatusCode from 'http-status-codes'


function sendApiResposne <T>(res:Response,data:T,message :string,statusCode=httpStatusCode.ACCEPTED) : Response {
    return res.status(statusCode).json({
        message,
        data,
        statusCode,
        error : false,
        errorTrace : null
    })
}


export {
    sendApiResposne
}
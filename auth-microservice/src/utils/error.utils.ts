import {Request,Response} from 'express'
import statusCode from 'http-status-codes'

function handleNotFoundError(req:Request,res:Response){

        return res.status(statusCode.NOT_FOUND).json({
            message : `The ${req.originalUrl} Does not Exists on the System`
        })


}

export default handleNotFoundError
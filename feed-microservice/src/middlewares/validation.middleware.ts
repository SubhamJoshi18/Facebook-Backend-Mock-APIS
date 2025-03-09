import { NextFunction, Request,Response } from "express";
import { changePasswordSchema } from "../validations/user.validation";
import { ValidationExceptions } from "../exceptions";



async function validateChangePasswordBody(req:Request,_res:Response,next:NextFunction){

    try{
        const content = req.body;
        const parseBody = await changePasswordSchema.parseAsync(content);
        if(!parseBody) throw new ValidationExceptions(`There is an Validation Error`);
        next();
    }catch(err){
        next(err)
    }
}




export {
  validateChangePasswordBody
}
import { NextFunction, Request,Response } from "express";
import { createAccountSchema, loginAccountSchema } from "../validations.ts/auth.validation";
import { ValidationExceptions } from "../exceptions";



async function validateBody(req:Request,_res:Response,next:NextFunction){

    try{
        const content = req.body;
        const parseBody = await createAccountSchema.parseAsync(content);
        if(!parseBody) throw new ValidationExceptions(`There is an Validation Error`);
        next();
    }catch(err){
        next(err)
    }
}




async function validateLoginBody(req:Request,_res:Response,next:NextFunction){

    try{
        const content = req.body;
        const parseBody = await loginAccountSchema.parseAsync(content);
        if(!parseBody) throw new ValidationExceptions(`There is an Validation Error`);
        next();
    }catch(err){
        next(err)
    }
}



export {
    validateBody,
    validateLoginBody
}
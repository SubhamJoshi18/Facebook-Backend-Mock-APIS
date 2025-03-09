import { NextFunction, Request,Response } from "express";
import { createPostSchema } from "../validations/feed.validation";
import { ValidationExceptions } from "../exceptions";



async function validateCreatePost(req:Request,_res:Response,next:NextFunction){

    try{
        const content = req.body;
        const parseBody = await createPostSchema.parseAsync(content);
        if(!parseBody) throw new ValidationExceptions(`There is an Validation Error`);
        next();
    }catch(err){
        next(err)
    }
}




export {
  validateCreatePost
}
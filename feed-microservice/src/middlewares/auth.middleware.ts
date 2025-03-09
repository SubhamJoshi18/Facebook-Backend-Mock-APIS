import { Request,Response,NextFunction } from "express"
import { ValidationExceptions } from "../exceptions";
import JsonWebTokenHelper from "../helpers/jsonwebtoken.helper";



declare global {
    namespace Express {
      interface Request {
        user?:any
      }
    }
  }


async function verifyAuthToken(req:Request,res:Response,next:NextFunction){

    const jwtHelper = new JsonWebTokenHelper()

    try{
        let token = req.headers.authorization ?? req.headers['authorization'];
        if(!token) throw new ValidationExceptions(`The Token does not Exists, It is Empty on the Headers`);
        token = token.trim().startsWith('Bearer') ? token.split(' ')[1] : token
        const decodedPayload = await jwtHelper.verifyAccessToken(token)
        const validPayload = Object.entries(decodedPayload as object).length > 0
        if(!validPayload) throw new ValidationExceptions(`The Decoded Payload is Empty`);
        if(!('user' in req)) req.user = decodedPayload;
        next()
    }catch(err){
        next(err)
    }


}



export {
    verifyAuthToken
}
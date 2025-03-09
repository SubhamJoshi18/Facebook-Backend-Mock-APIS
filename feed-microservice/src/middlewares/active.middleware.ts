import { Request,Response,NextFunction } from "express"
import UserRepository from '../repository/user.repository'
import { DatabaseExceptions } from "../exceptions";
import { lmsLogger } from "../libs/logger.libs";


async function isUserActivate(req:Request,res:Response,next:NextFunction) {

  try{  
    const userRepo = new UserRepository()
    
    const userId = req.user._id;
    
    const userDoc : any = await userRepo.populateUserProfile(userId);

    if(!userDoc) throw new DatabaseExceptions(`Error while fetching the User Data, Server Error`);

    const userActiveStatus = userDoc.userProfile.isActive;

    if(typeof userActiveStatus === 'boolean' && userActiveStatus) {
        lmsLogger.info(`The User is Active`)
        next()
    }
  }catch(err){
    next(err)
  }
}


export {
    isUserActivate
}
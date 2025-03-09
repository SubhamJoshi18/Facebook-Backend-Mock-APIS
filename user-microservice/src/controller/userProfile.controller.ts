import { Request,Response,NextFunction } from "express"
import UserProfileService from "../services/userProfile.service";
import { sendApiResposne } from "../utils/response.utils";


class UserProfileController {

    public async deactivateUser(req:Request,res:Response,next:NextFunction){
        try{
            const userId = req.user._id;
            const apiResponse = await UserProfileService.deactivateUser(userId);
            const contentMessage = `The User Has been DeActivated`;
            return sendApiResposne(res,apiResponse,contentMessage);
        }catch(err){
            next(err)
        }
    } 

}



export default new UserProfileController()
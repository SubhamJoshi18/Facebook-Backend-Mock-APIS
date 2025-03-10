import { Request,Response,NextFunction } from "express"
import UserService from "../services/user.service"
import { IChangePassword, IFileContent } from "../interfaces/user.interface"
import { sendApiResposne } from "../utils/response.utils"
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast"


class UserController {



    public async changePassword(req:Request,res:Response,next:NextFunction){   
        
        try{
            const userId = req.user._id
            const parseContent : IChangePassword = req.body
            const apiResponse = await UserService.changePassword(parseContent,userId)
            const contentMessage = `Password Have been Changed`
            return sendApiResposne(res,apiResponse,contentMessage)
        }catch(err){
            next(err)
        }
    }


    public async fetchUserProfile(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.user._id
            const apiResponse = await UserService.fetchUserProfile(userId)
            const contentMessage = `The User Profile Have been Fetches`;
            return sendApiResposne(res,apiResponse,contentMessage)
        }catch(err){
            next(err)
        }
    }


    public async uploadPhoto(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.user._id;
            const fileContent = req.file
            const apiResponse = await UserService.uploadPhoto(userId,fileContent as IFileContent)
            const contentMessage = `The User has Uploaded the Photo`;
            return sendApiResposne(res,apiResponse,contentMessage)
        }catch(err){
            next(err)
        }
    }


    public async changePhoto(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.user._id;
            const fileContent = req.file
            const apiResponse = await UserService.changePhoto(userId,fileContent as IFileContent)
            const contentMessage = `The User has Change the Photo`
            return sendApiResposne(res,apiResponse,contentMessage);
        }catch(err){    
            next(err)
        }
    }

}


export default new UserController()
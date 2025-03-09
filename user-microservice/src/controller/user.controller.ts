import { Request,Response,NextFunction } from "express"
import UserService from "../services/user.service"
import { IChangePassword } from "../interfaces/user.interface"
import { sendApiResposne } from "../utils/response.utils"


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


}


export default new UserController()
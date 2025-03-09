import AuthService from "../services/auth.service"
import requestIp from 'request-ip'
import { Request,Response,NextFunction} from "express"
import { sendApiResposne } from "../utils/response.utils"
import { ICreateAccount } from "../interfaces/auth.interface"
import { EXPRESS_APP_URL_FORGET_PASSWORD } from "../constants/module.constant"

class AdminController {

    public async createAccount(req:Request,res:Response,next:NextFunction){
        try{
            const parseContent : ICreateAccount = req.body
            const apiResponse = await AuthService.createAccount(parseContent)
            const contentMessage = `The User have been Created`
            return sendApiResposne(res,apiResponse,contentMessage)
        }catch(err){
            next(err)
        }
    }


    public async loginAccount(req:Request,res:Response,next:NextFunction) {
            try{
                const clientIp = requestIp.getClientIp(req)
                const parseContent = req.body
                const apiResponse = await AuthService.loginAccount(parseContent,clientIp as string)
                const {accessToken , isMaximumExceeded}  = apiResponse

                if(isMaximumExceeded) {
                    res.redirect(EXPRESS_APP_URL_FORGET_PASSWORD)
                }

                const contentMessage = `The User has been Logged in Successfully`
                return sendApiResposne(res,apiResponse,contentMessage)
            }catch(err){
                next(err)
            }
    }



}


export default new AdminController()
import AuthServices from "../services/auth.service"
import { Request,Response,NextFunction} from "express"
import { createAccountSchema } from "../validations.ts/auth.validation"
import { sendApiResposne } from "../utils/response.utils"

class AdminController {

    private authservices : AuthServices

    constructor(){
        this.authservices = new AuthServices()
    }


    public async createAccount(req:Request,res:Response,next:NextFunction){
        try{
            const content = req.body
            const parseContent = await createAccountSchema.parseAsync(content)
            const apiResponse = await this.authservices.createFaculty(parseContent)
            const contentMessage = `The User have been Created`
            return sendApiResposne(res,apiResponse,contentMessage)
        }catch(err){
            next(err)
        }

    }



}


export default new AdminController()
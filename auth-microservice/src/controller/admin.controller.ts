import AdminServices from "../services/admin.service"
import { Request,Response,NextFunction} from "express"

class AdminController {

    private adminServices : AdminServices

    constructor(){
        this.adminServices = new AdminServices()
    }


    public async createFaculty(req:Request,res:Response,next:NextFunction){
        try{
            const content = req.body
            

        }catch(err){
            next(err)
        }

    }



}


export default new AdminController()
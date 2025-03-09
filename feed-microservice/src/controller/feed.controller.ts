import { Request,Response,NextFunction } from "express"
import FeedService from "../services/feed.service";
import { sendApiResposne } from "../utils/response.utils";

class FeedController {

    public async createPost(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.user._id;
            const parseContent = req.body;
            const apiResponse = await FeedService.createPost(userId,parseContent);
            const contentMessage = `User has been Posted Successfully`
            return sendApiResposne(res,apiResponse,contentMessage)
        }catch(err){
            next(err)
        }
    }

}


export default new FeedController()
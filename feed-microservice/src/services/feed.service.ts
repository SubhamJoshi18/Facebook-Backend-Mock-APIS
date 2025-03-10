import SingletonElasticConnection from "../elasticSearch/connect";
import { DatabaseExceptions } from "../exceptions";
import { ICreatePost } from "../interfaces/feed.interface";



class FeedService {


    public async createPost(userId : string, parseContent : ICreatePost) {

        const elasticClient = await SingletonElasticConnection.getElasticClient();
        
        const {caption , title, description, type, tags} = parseContent;

        const isValidTags = Array.isArray(tags) && tags.length > 0;

        
        if(!isValidTags) throw new DatabaseExceptions(`The Tags are Empty, Please Add some Tags`);











    }


}


export default new FeedService()
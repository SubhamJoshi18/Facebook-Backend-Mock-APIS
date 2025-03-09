import SingletonElasticConnection from "../elasticSearch/connect";
import { ICreatePost } from "../interfaces/feed.interface";



class FeedService {


    public async createPost(userId : string, parseContent : ICreatePost) {

        const elasticClient = await SingletonElasticConnection.getElasticClient();
        
        const {caption , title, description, type, tags} = parseContent;

        





    }


}


export default new FeedService()
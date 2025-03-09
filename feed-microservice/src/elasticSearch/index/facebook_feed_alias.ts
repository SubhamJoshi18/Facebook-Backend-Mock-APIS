import { ELASTIC_FEED_INDEX } from "../../constants/elastic.constants";
import { lmsLogger } from "../../libs/logger.libs";
import SingletonElasticConnection from "../connect"
import { ELASTIC_FACEBOOK_FEED_CONFIG } from "../indexConfig/facebook_feed_config";




async function createFacebookFeedIndex(){


    const elasticClient = await SingletonElasticConnection.getElasticClient();
    
    const isIndexAlreadyExists = await elasticClient?.indices.exists({
        index : ELASTIC_FEED_INDEX as string
    })

    if(isIndexAlreadyExists) {
        lmsLogger.info(`Elastic Search, Facebook Feed Index is already Created Successfully`)
        return;
    }

    const indexResult = await elasticClient?.indices.create(
        {
            index : ELASTIC_FEED_INDEX as string,
            body : {
                mappings : {
                    properties : ELASTIC_FACEBOOK_FEED_CONFIG as any
                }
            }
        }
    )

    lmsLogger.info(`Elastic Search, Facebook Feed Index is Creaed Successfully`)

}


export {
    createFacebookFeedIndex
}
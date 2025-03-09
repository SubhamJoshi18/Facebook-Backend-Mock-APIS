import { ELASTIC_INDEX } from "../../constants/elastic.constants"
import { lmsLogger } from "../../libs/logger.libs"
import SingletonElasticConnection from "../connect"
import { FACEBOOK_UPLOAD_CONFIG } from "../indexConfig/facebook.upload.config"




async function createFacebookUploadIndex() {


    const elasticClient = await SingletonElasticConnection.getElasticClient()

    const indexResult = await elasticClient?.indices.create(
        {
            index : ELASTIC_INDEX as string,
            body : {
                mappings: {
                    properties : FACEBOOK_UPLOAD_CONFIG as any
                }
            },
            settings : {
                number_of_replicas : 2,
                number_of_shards : 2
            }
        }
    )

    lmsLogger.info(`${ELASTIC_INDEX} Has been Created`,indexResult)
}


export {
    createFacebookUploadIndex
}
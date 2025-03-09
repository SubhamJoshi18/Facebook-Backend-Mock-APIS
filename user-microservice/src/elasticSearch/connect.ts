import { lmsLogger } from "../libs/logger.libs";
import { Client } from "@elastic/elasticsearch";
import { ELASTIC_URL } from "../constants/elastic.constants";



class SingletonElasticConnection {


    public static async connectElastic(){
        let retryCount = 4;
        while(retryCount > 0) {
            try{

                const elasticClient = new Client(
                    {
                        node : ELASTIC_URL as string
                    }
                )
                const clusterHealth = await elasticClient.cluster.health({})
                const clusterStatus = clusterHealth['status']
                lmsLogger.info(`The Cluster Status : ${clusterStatus}`)
                return elasticClient
            }catch(err){
                
                const isMaximumExceeded  = retryCount.toString().startsWith('0')
                if(isMaximumExceeded) {
                    lmsLogger.error(`Maximum Retry is Exceeded, Terminiating the Server`);
                    process.exit(0);
                }
                lmsLogger.error(`Error Connecting to the Elastic Search`);
                retryCount = retryCount > 0 ?  retryCount - 1 : 0;
                continue

            }
        }
    }



}


export default SingletonElasticConnection
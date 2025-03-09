import { lmsLogger } from "../libs/logger.libs";
import { Client } from "@elastic/elasticsearch";
import { ELASTIC_URL } from "../constants/elastic.constants";
import MergeAllIndices from "./index/main.index";



class SingletonElasticConnection {

    public static elasticClient : Client;

    public static async connectElastic()  {
        
        let retryCount = 4;
        while(retryCount > 0) {
            try{
                 this.elasticClient = new Client(
                    {
                        node : ELASTIC_URL as string
                    }
                )
                const clusterHealth = await this.elasticClient.cluster.health({})
                const clusterStatus = clusterHealth['status']
                lmsLogger.info(`The Cluster Status : ${clusterStatus}`)
                await MergeAllIndices()
                return this.elasticClient
            }catch(err){
                console.log(err)
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


    public static async getElasticClient(){
        if(this.elasticClient) {
            return this.elasticClient
        }else{
            const elasticClient = await this.connectElastic()
            return elasticClient
        }

    }


}


export default SingletonElasticConnection
import { createClient, RedisClientType } from 'redis'
import { ConnectionExceptions } from '../exceptions'
import { lmsLogger } from '../libs/logger.libs';


class SingletonRedisConnection {

    public static async connectRedis(){
        let redisClient : RedisClientType<any> | null = null
        if(redisClient) return redisClient;
        try{
            redisClient = createClient();
            redisClient.on("err",() => {
                lmsLogger.error(`Error in Connecting the Redis Server`)
                throw new ConnectionExceptions(`Redis Connection Failed`)
            })
            return redisClient
        }catch(err){
            throw err
        }
    }


    public static async getRedisClient() {
        const client = await this.connectRedis()
        if(client) {
            return client
        }
    }
}

export default SingletonRedisConnection
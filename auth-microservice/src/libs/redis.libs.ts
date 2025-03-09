import SingletonRedisConnection from "../redis/redis.connect"



async function createRedisKey(prefix:string,key:string){
    let prefixCount = 0
    let finalPrefix = `${prefix}-${key}:${prefixCount}`
    const redisClient = await SingletonRedisConnection.getRedisClient()
   
    const data = await redisClient?.get(finalPrefix)
    if(data) prefixCount += 1;
    finalPrefix = `${prefix}-${prefixCount}:${prefixCount}`
    return finalPrefix
}



export {
    createRedisKey
}
import SingletonRedisConnection from "../redis/redis.connect"



async function createRedisKey(prefix:string,key:string){
    let prefixCount = 0
    let finalPrefix = `${prefix}-${key}:${prefixCount}`
    const redisClient = await SingletonRedisConnection.getRedisClient()
   
    const data = await redisClient?.get(finalPrefix)
    if(data) prefixCount += 1;
    finalPrefix = `${prefix}-${key}:${prefixCount}`
    return finalPrefix
}



async function createUserKey(prefix:string,key:string) {
    return `${prefix}-${key}`
}


export {
    createRedisKey,
    createUserKey
}
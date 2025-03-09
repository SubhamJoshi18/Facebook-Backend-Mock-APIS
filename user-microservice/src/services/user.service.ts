import { userRedisPrefix } from "../constants/redis.constant";
import { DatabaseExceptions, ValidationExceptions } from "../exceptions";
import BcryptHelper from "../helpers/bcrypt.helper";
import { IChangePassword } from "../interfaces/user.interface";
import { lmsLogger } from "../libs/logger.libs";
import { createRedisKey, createUserKey } from "../libs/redis.libs";
import SingletonRedisConnection from "../redis/redis.connect";
import UserRepository from "../repository/user.repository";



class UserServices {
    

    private userRepository : UserRepository
    private bcryptHelper : BcryptHelper

    constructor(){
        this.userRepository = new UserRepository()
        this.bcryptHelper = new BcryptHelper()
    }



    public async changePassword(parsePayload : IChangePassword, userId : string) {
    
        const { password } = parsePayload;

        const checkUserExists = await this.userRepository.searchDataUser('_id',userId);

        if(!checkUserExists) throw new DatabaseExceptions(`The User Does not Exists, Or the User is De Activated`);
    

        const currentDate : any = new Date();
        const lastChangePassword :any = new Date(checkUserExists.updatedAt);

        
        const diffInTime = currentDate - lastChangePassword; 

        const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

        if(!(diffInDays.toString().startsWith('30'))){
            throw new DatabaseExceptions(`Password have already been Changed,Please Change it After 30 Days`)
        }
    
        const userOldPassword = checkUserExists['password'] ? checkUserExists.password : null

        const encryptNewPassword = await this.bcryptHelper.hashPassword(password);

        const isSamePassword = userOldPassword?.trim() === encryptNewPassword.trim();

        if(isSamePassword) throw new ValidationExceptions(`The Password Matches with your Old Password, Please Try a new Password`);

        const updatedPassword = await this.userRepository.updateDataUser(userId,'password',password);

        return {
            updatedResult : updatedPassword.acknowledged && updatedPassword.matchedCount > 0
        }
    }


    public async fetchUserProfile(userId : string){

        const redisClient =  await SingletonRedisConnection.getRedisClient();
        
        const dataResult = await this.userRepository.searchDataUser('_id',userId)

        const dataId = dataResult && dataResult['_id'] ? dataResult._id : 'null'

        if(!dataResult) throw new DatabaseExceptions(`Error Fetching the User Info From the Database`);

        const userProfileKey = await createUserKey(userRedisPrefix,dataId as string)

        const isDataRedis = await redisClient?.get(userProfileKey);

        if(isDataRedis) return {user : JSON.parse(isDataRedis),redis : true};

        const savedDatainRedis = await redisClient?.set(userProfileKey,JSON.stringify(dataResult),{NX : true,EX : 3600})  

        const validInsertRedis = savedDatainRedis ? savedDatainRedis.toString().includes('OK') : null

        if(validInsertRedis) lmsLogger.info(`The ${JSON.stringify(dataResult)} Has been Saved to the ${userProfileKey}`)

        return {
            user : dataResult,
            redis :false
        
    }

}


    public async uploadPhoto() {
        
    }


}
export default new UserServices()
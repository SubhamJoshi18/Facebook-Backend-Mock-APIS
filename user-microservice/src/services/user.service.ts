
import SingletonElasticConnection from "../elasticSearch/connect";  
import BcryptHelper from "../helpers/bcrypt.helper";
import SingletonRedisConnection from "../redis/redis.connect";
import UserRepository from "../repository/user.repository";
import crypto from 'crypto'
import { lmsLogger } from "../libs/logger.libs";
import { createUserKey } from "../libs/redis.libs";
import { IChangePassword, IFileContent } from "../interfaces/user.interface";
import { DatabaseExceptions, ValidationExceptions } from "../exceptions";
import { MIME_TYPES } from "../constants/mime.constants";
import { userRedisPrefix } from "../constants/redis.constant";
import { ELASTIC_INDEX } from "../constants/elastic.constants";
import UserProfileRepository from "../repository/userProfile.repository";
import { Types } from "mongoose";


class UserServices {
    

    private userRepository : UserRepository
    private userProfileRepository : UserProfileRepository
    private bcryptHelper : BcryptHelper

    constructor(){
        this.userRepository = new UserRepository()
        this.userProfileRepository = new UserProfileRepository()
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


    public async uploadPhoto(userId : string,fileContent : IFileContent) {


        const elasticClient = await SingletonElasticConnection.getElasticClient()

        const checkUserExists = await this.userRepository.searchDataUser('_id',userId);

        if(!checkUserExists) throw new DatabaseExceptions(`The User Does not Exists on the System`);

        const { encoding, mimetype , size, originalname , filename,fieldname} = fileContent

        const isEmptySize = size.toString().startsWith('0')

        if(isEmptySize) throw new ValidationExceptions(`Error while inserting empty Photo. Please Insert the Appropriate Photo`);

        
        const [imageFormat, imageMimeType] = mimetype.split('/');
    
        const isValidMimeTypes = Object.keys(MIME_TYPES).includes(imageMimeType)

        if(!isValidMimeTypes) throw new DatabaseExceptions(`Error while inserting photo, Invalid Mime Types`)


        const hashPayload = Object.freeze(
            {
                username : checkUserExists.username,
                email : checkUserExists.email,
                _id : checkUserExists._id
            }
        )

        const hashCorelationId = crypto.createHash('sha256').update(JSON.stringify(hashPayload)).digest('hex');

        const uniqueUserIds = checkUserExists['_id'] ? checkUserExists._id : 'null'

        
        const elasticPayload = {
            userId : uniqueUserIds,
            imageUrl : originalname,
            isDeactivated : checkUserExists['isActive'] ? checkUserExists['isActive'] : false,
            coRelationId : hashCorelationId,
            type : 'Photo',
            mimetype : mimetype,
            fileName : fieldname,
            fieldName :fieldname
        }

        const saveElasticPayload = await elasticClient?.index({
            index : ELASTIC_INDEX as string,
            document : elasticPayload
        })

        const savedResult = saveElasticPayload?.result

        const savedId = saveElasticPayload?._id
        
        const validSaved = savedResult ? savedResult.includes('created') : false

        if(!validSaved) throw new DatabaseExceptions(`Error while saving to the Elastic Search`)

        const userProfileIds = checkUserExists.userProfile as unknown as string;

        const updatedResult = await this.userProfileRepository.updateDataUserProfile(userProfileIds,'image',savedId)

        return {
            uploadStatus : updatedResult.acknowledged && updatedResult.matchedCount > 0
        }
    }


}
export default new UserServices()
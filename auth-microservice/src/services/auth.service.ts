import { Types } from "mongoose";
import { DatabaseExceptions } from "../exceptions";
import BcryptHelper from "../helpers/bcrypt.helper";
import { ICreateAccount, IJWTPayload, ILoginAccount } from "../interfaces/auth.interface";
import AuthRepository from "../repository/auth.repository";
import UserProfileRepository from "../repository/userProfile.repository";
import { createRedisKey } from "../libs/redis.libs";
import { ipRedisPrefix } from "../constants/redis.constant";
import SingletonRedisConnection from "../redis/redis.connect";
import JsonWebTokenHelper from "../helpers/jsonwebtoken.helper";
import { lmsLogger } from "../libs/logger.libs";



class AuthServices {   

    private authRepository : AuthRepository
    private userProfileRepository : UserProfileRepository
    private bcryptHelper : BcryptHelper
    private jwtHelper : JsonWebTokenHelper

    constructor(){
        this.authRepository = new AuthRepository()
        this.userProfileRepository = new UserProfileRepository()
        this.bcryptHelper = new BcryptHelper()
        this.jwtHelper = new JsonWebTokenHelper()
    }


    public async createAccount(parsePayload : ICreateAccount){
        
        const {email , password, username }  = parsePayload;

        const checkEmailExists  = await this.authRepository.searchDataAuth('email',email)

        if(checkEmailExists) throw new DatabaseExceptions(`The ${email} Already Exists , Please Try a new Email`);

        const checkUsernameExists = await this.authRepository.searchDataAuth('username',username)

        if(checkUsernameExists) throw new DatabaseExceptions(`The ${username} Already Exists , Please Try a new Username`);


        const hashPassword = await this.bcryptHelper.hashPassword(password)

        const payload = Object.freeze({
            email,
            username,
            password : hashPassword
        }) as ICreateAccount


        const savedPayload = await this.authRepository.insertData(payload)

        const savedPayloadId = savedPayload._id ? savedPayload['_id'] : null;

        const userProfileId = await this.userProfileRepository.createUserProfileAndFetchId(savedPayloadId as Types.ObjectId)

        const finalUpdatedResult = await this.authRepository.updatedUserProfile(savedPayloadId as Types.ObjectId,userProfileId as Types.ObjectId)

        const userProfileDocs =  await this.userProfileRepository.fetchUserProfile(userProfileId)
        
        const responsePayload = {
            userData : savedPayload,
            userProfile :userProfileDocs,
            profileUpdatedResult : finalUpdatedResult.acknowledged && finalUpdatedResult.matchedCount > 0
        }

        return responsePayload
    }



    public async loginAccount(parsePayload : ILoginAccount, clientIp : string) {

        const redisClient = await SingletonRedisConnection.getRedisClient()

        const { email, password } = parsePayload


        const checkEmailExists = await this.authRepository.searchDataAuth('email',email)

        if(!checkEmailExists) throw new DatabaseExceptions(`The Email Does not Exists, Please Try a valid Email`);

        const userPassword = checkEmailExists['password'] ? checkEmailExists.password : null

        const comparePasswordStatus = await this.bcryptHelper.comparePassword(password,userPassword as string)

        if(typeof comparePasswordStatus === 'boolean' && !comparePasswordStatus) {
            
            const ipPrefix = await createRedisKey(ipRedisPrefix,clientIp)


            const isIpData = await redisClient?.get(ipPrefix)
    
            const isMaximumExceeded = isIpData ? isIpData.toString().startsWith('5') : null
    
            if(isMaximumExceeded) {
                return {
                    isMaximumExceeded : true
                }
            }
    
            
            if(!isIpData) await redisClient?.set(ipPrefix,0);
    
            const incrIpCount = await redisClient?.incr(ipPrefix)

            lmsLogger.info(`The Count has been Increased For the Ip Address : ${ipPrefix} to ${incrIpCount}`)

            throw new DatabaseExceptions(`Password is Incorrect, Please Try a valid Password`);
        }


        const payload = Object.freeze({
            email : checkEmailExists.email,
            username : checkEmailExists.username,
            _id : checkEmailExists._id
        }) as IJWTPayload


        const accessToken = await this.jwtHelper.createAccessToken(payload)

        return {
            accessToken,
            isMaximumExceeded : false

        }
    }
}


export default new AuthServices()
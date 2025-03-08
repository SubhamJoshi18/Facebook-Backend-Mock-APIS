import { Types } from "mongoose";
import { DatabaseExceptions } from "../exceptions";
import BcryptHelper from "../helpers/bcrypt.helper";
import { ICreateAccount } from "../interfaces/auth.interface";
import AuthRepository from "../repository/auth.repository";
import UserProfileRepository from "../repository/userProfile.repository";



class AuthServices {   

    private authRepository : AuthRepository
    private userProfileRepository : UserProfileRepository
    private bcryptHelper : BcryptHelper

    constructor(){
        this.authRepository = new AuthRepository()
        this.userProfileRepository = new UserProfileRepository()
        this.bcryptHelper = new BcryptHelper()
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
}


export default AuthServices
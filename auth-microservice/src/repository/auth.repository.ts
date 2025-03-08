import { Types } from "mongoose"
import User from "../database/models/users.model"


class AuthRepository {


    public async insertData(data:object){
        const savedResult = await User.create({
            ...data
        })
        return savedResult
    }


    public async searchDataAuth<T>(attributePayload : string,searchData:T){
        const data = await User.findOne({
            [`${attributePayload}`] : searchData
        })
        return data
    }


    public async updatedUserProfile(userId:Types.ObjectId,userProfileId : Types.ObjectId) {
        const updatedProfile = await User.updateOne(
            {
                _id : userId
            },
            {   
                userProfile : userProfileId
            },
            {
                $new : true
            }
        )
        return updatedProfile
    }

}


export default AuthRepository
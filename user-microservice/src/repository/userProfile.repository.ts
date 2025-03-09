import { Types } from "mongoose"
import UserProfile from "../database/models/userProfile.model"


class UserProfileRepository {


    public async createUserProfileAndFetchId(userId : Types.ObjectId){
        const savedResult = await UserProfile.create({
            user : userId
        })
        return savedResult._id
    }


    public async fetchUserProfile(userProfileId : Types.ObjectId) {
        const result = await UserProfile.findOne({
            _id : userProfileId
        })
        return result
    }

    public async updateDataUserProfile<T>(userId:string, attributePayload:string,payload :T) {
        const updatedResult = await UserProfile.updateOne(
            {
                _id : userId
            },
            {
                [`${attributePayload}`] : payload
            },
            {
                $new : true
            }
        )
        return updatedResult
    }


}


export default UserProfileRepository
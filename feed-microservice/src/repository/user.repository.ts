import { Types } from "mongoose"
import User from "../database/models/users.model"


class UserRepository {


    public async insertData(data:object){
        const savedResult = await User.create({
            ...data
        })
        return savedResult
    }


    public async searchDataUser<T>(attributePayload : string,searchData:T){
        const data = await User.findOne({
            [`${attributePayload}`] : searchData
        })
        return data
    }

    public async updateDataUser<T>(userId:string, attributePayload:string,payload :T) {
        const updatedResult = await User.updateOne(
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


    public async populateUserProfile(userId : Types.ObjectId) {
        const populateResult = await User.findOne(
            {
                _id : userId
            }
        ).populate('userProfile')
        return populateResult
    }
}


export default UserRepository
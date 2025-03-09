import { Types } from "mongoose"
import User from "../database/models/user.schema"

class UserRepository {

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
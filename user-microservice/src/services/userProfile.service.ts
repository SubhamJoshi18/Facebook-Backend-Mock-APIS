import DeleteApi from "@elastic/elasticsearch/lib/api/api/delete";
import UserProfileRepository from "../repository/userProfile.repository";
import UserRepository from "../repository/user.repository";
import { DatabaseExceptions } from "../exceptions";
import { Types } from "mongoose";


class UserProfileServices {

    private userProfileRepository : UserProfileRepository
    private userRepository : UserRepository

    constructor(){
        this.userProfileRepository = new UserProfileRepository()
        this.userRepository = new UserRepository()
    }

    public async deactivateUser(userId : string) {

        const checkUserExists = await this.userRepository.searchDataUser('_id',userId);

        if(!checkUserExists) throw new DatabaseExceptions(`Error while fetching the User Data, Server Error`);

        const userProfile = checkUserExists.userProfile as unknown as string

        const checkUserProfileDocs = await this.userProfileRepository.fetchUserProfile(userProfile as any);

        if(!checkUserProfileDocs) throw new DatabaseExceptions(`Error while fetching the User Profile Data, Server Error`);

        const updatedResult = await this.userProfileRepository.updateDataUserProfile(userProfile,'isActive',false);

        return {
            updatedResult : updatedResult.acknowledged && updatedResult.matchedCount > 0
        }

    }

}


export default new UserProfileServices()
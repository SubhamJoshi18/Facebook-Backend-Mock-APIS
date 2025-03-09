import mongoose from "mongoose";
import { formattedMongooseValue } from "../../utils/response.utils";


const UserProfileSchema = new mongoose.Schema({
    isActive : {
        type : Boolean,
        default : true
    },
    image :  {
        type : String,
        default :''
    },

    SecondaryEmail : {
        type : String,
        default : ''
    },

    isUser : {
        type : Boolean,
        default : true
    },

    location : {
        type : String,
        default : ''
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,formattedMongooseValue('User')]
    }
}, {
    timestamps : true
})


const UserProfile = mongoose.model('UserProfile',UserProfileSchema)
export default UserProfile
import mongoose from "mongoose";
import { formattedMongooseValue } from "../../utils/response.utils";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,formattedMongooseValue('User Name')]
    },

    email : {
        type : String,
        required : [true,formattedMongooseValue('Email')]
    },

    password : {
        type : String,
        required : [true,formattedMongooseValue('Password')]
    },

    isActive : {
        type : Boolean,
        default : true
    },

    userProfile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserProfile',
    }
}, {
    timestamps : true
})


const User = mongoose.model('User',userSchema)
export default User
import mongoose from "mongoose";
import { formattedMongooseValue } from "../../utils/response.utils";
import { boolean } from "zod";


const feedSchema = new mongoose.Schema({

    caption : {
        type : String,
        required : [true,formattedMongooseValue(`Caption`)]
    },

    title : {
        type : String,
        required : [true,formattedMongooseValue('Title')]
    },

    description : {
        type : String,
        required : [true,formattedMongooseValue('Description')]
    },

    type : {
        type : String,
        enum : ['Photo','Video','Text'],
        default : 'Title'
    },

    tags : [
        {
            type : String,
            required : [true,formattedMongooseValue('Tags')]
        }
    ],

    feedPostedBy:  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,formattedMongooseValue('Feed Posted By')]
    },

    feedStatus : {
        type : String,
        enum : ['Draft','Archive','Active'],
        default : 'Active'
    },
    isDeleted : {
        type: boolean,
        default : false
    },

    isUpdated : {
        type : boolean,
        default : false
    },


    feedPhoto : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'FeedPhoto'
    },



}, {
    timestamps : true
})


const Feed = mongoose.model('Feed',feedSchema)
export default Feed
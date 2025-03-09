import mongoose from "mongoose";
import { formattedMongooseValue } from "../../utils/response.utils";


const feedPhotoSchema = new mongoose.Schema({

    imageId : {
        type : String,
        required: [true,formattedMongooseValue('Image ID')]
    },

    imageUrl : {
        type : String,
        requried  : [true,formattedMongooseValue('Image URL')]
    }

}, {
    timestamps : true
})

const FeedPhoto = mongoose.model('FeedPhoto',feedPhotoSchema)
export default FeedPhoto
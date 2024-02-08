import mongoose,{Schema} from "mongoose";

const likesSchema=new Schema({
Comments:{
    type:Schema.Types.ObjectId,
    ref:"Comments"
},
video:{
    type:Schema.Types.ObjectId,
    ref:"Video"
},
likedBy:{
    type:Schema.Types.ObjectId,
    ref:"Users"
},
tweet:{
    type:Schema.Types.ObjectId,
    ref:"Tweet"
},


},{timestamps:true});
export const Like=mongoose.model("Like",likesSchema)
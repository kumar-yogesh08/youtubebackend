import mongoose,{Schema} from "mongoose";
const playListSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    videos:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Users"
    }
},{timestamps:true})
export const playList=mongoose.model("playList",playListSchema)
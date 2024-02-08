import mongoose,{Schema} from "mongoose";

const tweetsSchema=new Schema({
    content:{
        type:String,
        required:true
        },
       
        owner:{
            type:Schema.Types.ObjectId,
            ref:"Users"
        }
},{timestamps:true})
export const Tweet=mongoose.model("Tweet",tweetsSchema);
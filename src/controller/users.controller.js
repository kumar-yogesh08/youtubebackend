import {asynchandler} from "../utils/asynchandler.js";

const registerUser= asynchandler( async(req,res)=>{
    res.status(200).json({
        message:"the data that i eant to send"
    })
} )


export {registerUser,}
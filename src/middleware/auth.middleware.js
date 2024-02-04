import jwt  from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { Users } from "../models/user.model.js";

export const verifyjwt=asynchandler(async(req,res,next)=>{

         try {
            // console.log(req);
            const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
            console.log(token);
               if(!token){
                   throw new ApiError(401,"Unauthorized req")
               }
                const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
                const User=await Users.findById(decodedToken?._id).select(
                   "-password -refreshToken"
                )
                if(!User){
                   throw new ApiError(401,"Invalid accessToken")
                }
                req.User=User
                next()
         } catch (error) {
            throw new ApiError(401,error?.message||"Invalid token")
         }

})
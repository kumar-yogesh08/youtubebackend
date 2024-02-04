import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

//1)  app.get("/",th(req,res))                          //2)app.get('/',(req,res)=>{
// function th(req,res){                                //      th(req,res)        })
//     console.log(res,"sad");                          //function th(req,res){ console.log(res)}  

// } 1)does not work as req and res are properties of get,use,post basically express         2)works
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users",userRouter)//app sends req and res to all loginUser logoutUser verifyjwt 

export {app}
// export default express
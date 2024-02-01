import dotenv from "dotenv"
import connectDb from "./db/index.js";
import { app } from "./app.js";
dotenv.config({path:'./env'})
console.log('index has been entered')
connectDb().then(()=>{
app.listen(process.env.PORT||8000,()=>{
    console.log(`the server is working at ${process.env.PORT}` )
})
}).catch((error)=>{
    console.log("MONGO DB CONNECTION FAILED",error);
})
import { Router } from "express";
import { registerUser } from "../controller/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"coverImage",
            maxCount:1
        },
        {
            name:"avatar",
            maxCount:1
        }
    ]),
    registerUser)


export default router
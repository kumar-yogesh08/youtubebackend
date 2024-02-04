import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
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
    registerUser);
    
router.route("/login").post(loginUser);
//secure route
router.route("/logout").post(verifyjwt,logoutUser);

export default router;  
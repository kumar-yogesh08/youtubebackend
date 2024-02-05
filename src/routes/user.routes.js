import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAvatar, updateUserCoverImage, updateUserDetials } from "../controller/users.controller.js";
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
router.route("/refreshToken").post(refreshAccessToken)
router.route("/change-Password").patch(verifyjwt,changeCurrentPassword)
router.route("/current-User").get(verifyjwt,getCurrentUser)
router.route("/updateUserDetials").patch(verifyjwt,updateUserDetials)
router.route("/update-Avatar").patch(verifyjwt,upload.single("avatar"),updateUserAvatar)
router.route("/update-coverImage").patch(verifyjwt,upload.single("coverImage"),updateUserCoverImage)
router.route("/channel/:username").get(verifyjwt,getUserChannelProfile)
router.route("/User-watchHistory").get(verifyjwt,getWatchHistory)




export default router;  
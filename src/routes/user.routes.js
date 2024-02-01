import { Router } from "express";
import { registerUser } from "../controller/users.controller.js";
const router=Router()

router.route("/register").post(registerUser)


export default router
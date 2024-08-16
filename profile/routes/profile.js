import Router from "express"
import { myProfile } from "../modules/my-profile/profile.controller.js"
const router = Router()

router.get("/profile", myProfile)
export default router
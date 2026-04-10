import {Router} from "express"
import { createConversation, getConversations } from "../controllers/conversation.controller.js"
import { currentUser } from "../middlewares/currentUser.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"

const router = Router()

router.get("/", currentUser, asyncHandler(getConversations))
router.post("/",currentUser, asyncHandler(createConversation))

export default router
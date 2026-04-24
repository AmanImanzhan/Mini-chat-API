import {Router} from "express"
import { createConversation  } from "../controllers/conversation.controller.js"
import { currentUser } from "../middlewares/currentUser.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import {validateCreateConversation} from "../middlewares/validateCreateConversation.js"

const router = Router()

router.get("/", currentUser, asyncHandler)
router.post("/",currentUser, validateCreateConversation,createConversation)

export default router
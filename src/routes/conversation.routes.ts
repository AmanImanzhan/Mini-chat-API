import { Router } from "express"
import {
  createConversation,
  getConversations
} from "../controllers/conversation.controller.js"
import { currentUser } from "../middlewares/currentUser.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import { validateCreateConversation } from "../middlewares/validateCreateConversation.js"

const router = Router()

router.get("/", currentUser, asyncHandler(getConversations))
router.post(
  "/",
  currentUser,
  validateCreateConversation,
  asyncHandler(createConversation)
)

export default router
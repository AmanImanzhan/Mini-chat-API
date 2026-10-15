import { Router } from "express"
import { sendMessage, getMessages } from "../controllers/message.controller.js"
import { currentUser } from "../middlewares/currentUser.js"
import { checkConversationAccess } from "../middlewares/checkConversationAccess.js"
import { validateSendMessage } from "../middlewares/validateSendMessage.js"
import { validateGetMessages } from "../middlewares/validateGetMessages.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"

const router = Router()

router.post(
  "/",
  currentUser,
  validateSendMessage,
  checkConversationAccess,
  asyncHandler(sendMessage)
)

router.get(
  "/:conversationId",
  currentUser,
  validateGetMessages,
  checkConversationAccess,
  asyncHandler(getMessages)
)

export default router
import { Router } from "express"
import { sendMessage, getMessages } from "../controllers/message.controller.js"
import { currentUser } from "../middlewares/currentUser.js"
import { checkConversationAccess } from "../middlewares/checkConversationAccess.js"

const router = Router()


router.post("/", sendMessage)
router.get(
    "/conversation/:id", 
    currentUser, 
    checkConversationAccess,
    getMessages
)

export default router
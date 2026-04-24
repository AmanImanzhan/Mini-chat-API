import { Request, Response } from "express"
import * as conversationService from "../services/conversation.service.js"

export const createConversation = async (req: Request, res: Response) => {
  const { userIds } = req.body

  const conversation = await conversationService.createConversation(userIds)

  res.json(conversation)
}
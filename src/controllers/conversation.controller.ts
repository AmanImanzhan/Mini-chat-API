import { Request, Response } from "express"
import * as conversationService from "../services/conversation.service.js"

export const createConversation = async (req: Request, res: Response) => {
  const { userIds } = req.body

  try {
    const conversation = await conversationService.createConversation(userIds)
    res.json(conversation)
  } catch (error) {
    res.status(400).json({ error: "Failed to create conversation" })
  }
}

export const getConversations = async (req: Request, res: Response) => {
  const userId = req.user!.userId

  try {
    const conversations = await conversationService.getConversations(userId)
    res.json(conversations)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" })
  }
}
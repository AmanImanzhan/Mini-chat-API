import { Request, Response } from "express"
import * as conversationService from "../services/conversation.service.js"

export const createConversation = async (req: Request, res: Response) => {
  const { userIds } = req.body

  const otherIds: number[] = Array.isArray(userIds)
    ? userIds.filter(Number.isInteger)
    : []

  const ids = [...new Set([req.user!.userId, ...otherIds])]

  const conversation = await conversationService.createConversation(ids)

  res.status(201).json(conversation)
}

export const getConversations = async (req: Request, res: Response) => {
  const conversations = await conversationService.getConversations(
    req.user!.userId
  )

  res.json(conversations)
}
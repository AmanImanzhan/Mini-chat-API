import { Request, Response } from "express"
import * as messageService from "../services/message.service.js"

 export const sendMessage = async (req: Request, res: Response) => {
  const { content, conversationId } = req.body
  const userId = req.user!.userId

  const message = await messageService.sendMessage(
    content,
    userId,
    conversationId
  )

  res.json(message)
}

export const getMessages = async (req: Request, res: Response) => {
  const conversationId = Number(req.params.conversationId)

  const messages = await messageService.getMessages(conversationId)

  res.json(messages)
}
import { Request, Response } from "express"
import * as messageService from "../services/message.service.js"

export const sendMessage = async (req: Request, res: Response) => {
  const { content, conversationId } = req.body
  const userId = req.user!.userId

  try {
    const message = await messageService.sendMessage(
      content,
      userId,
      conversationId
    )

    res.json(message)
  } catch (error) {
    res.status(400).json({ error: "Failed to send message" })
  }
}

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params

    const messages = await messageService.getMessages(Number(conversationId))

    res.json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to get messages" })
  }
}
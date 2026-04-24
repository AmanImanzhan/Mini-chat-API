import { Request, Response, NextFunction } from "express"

export const validateSendMessage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, conversationId } = req.body

  if (!content || !conversationId) {
    return res.status(400).json({ error: "Missing content or conversationId" })
  }

  if (typeof conversationId !== "number") {
    return res.status(400).json({ error: "conversationId must be number" })
  }

  next()
}
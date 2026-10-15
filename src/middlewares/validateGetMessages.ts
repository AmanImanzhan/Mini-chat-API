import { Request, Response, NextFunction } from "express"

export const validateGetMessages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const conversationId = Number(req.params.conversationId)

  if (!Number.isInteger(conversationId)) {
    res.status(400).json({ error: "Invalid conversationId" })
    return
  }

  next()
}
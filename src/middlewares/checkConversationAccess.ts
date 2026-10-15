import { Request, Response, NextFunction } from "express"
import { prisma } from "../prisma.client.js"

export const checkConversationAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const conversationId = Number(
    req.params.conversationId ?? req.body?.conversationId
  )

  if (!Number.isInteger(conversationId)) {
    res.status(400).json({ error: "Invalid conversationId" })
    return
  }

  const userId = req.user!.userId

  try {
    const member = await prisma.conversationMember.findFirst({
      where: { conversationId, userId }
    })

    if (!member) {
      res.status(403).json({ error: "Access denied" })
      return
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}
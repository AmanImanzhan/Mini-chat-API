import { Request, Response, NextFunction } from "express"
import { prisma } from "../prisma.client.js"

export const checkConversationAccess = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {

    const conversationId = Number(req.params.id)
    const userId = req.user!.userId

    try {
        const member = await prisma.conversationMember.findFirst({
            where: {
                conversationId,
                userId
            }
        })

        if (!member) {
            return res.status(403).json({ error: "Access denied" })
        }

        next()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: "Server error"})
    }
}
import { Request, Response, NextFunction } from "express";

export const validateCreateConversation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userIds } = req.body

    if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ error: "userIds must be non-empty array" })
    }
    
    next()
}
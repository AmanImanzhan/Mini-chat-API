import { Request, Response } from "express"
import { prisma } from "../prisma.client.js"
import { error } from "node:console"

export const sendMessage = async (req:Request, res:Response) => {
    const content = req.body
    const conversationId = Number(req.params.id)

    const messages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
        take: 50,
        select: {
            id: true,
            content: true, 
            createdAt: true,
            author: {
                select: {
                    id: true,
                    email: true
                }
            }
        }
    })

    if (!conversationId) {
        return res.status(400).json({ error: "conversationId required"})
    }

    try {
        const message = await prisma.message.create({
            data: {
                conversationId,
                authorId: req.user!.userId,
                content
            }
        })

        res.json(message)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to send message"})
    }
}

export const getMessages = async (req:Request, res:Response) => {
    const conversationId = Number(req.params.id)

    try {
        const messages = await prisma.message.findMany({
            where:{ conversationId },
            orderBy:{ createdAt: "desc" },
            take: 50,
            select: {
                id: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        })
        

        res.json(messages)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to get messages"})
    }
}
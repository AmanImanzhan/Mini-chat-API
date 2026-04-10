import { Request, Response } from "express"
import { prisma } from "../prisma.client.js"

export const createConversation = async (req: Request, res: Response) => {
  const { userIds } = req.body

  try {
    const conversation = await prisma.conversation.create({
      data: {
        members: {
          create: userIds.map((id: number) => ({
            userId: id
          }))
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true
              }
            }
          }
        }
      }
    })

    res.json(conversation)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create conversation" })
  }
}

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId

    const conversations = await prisma.conversation.findMany({
      where: {
        members: {
          some: { userId }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true
              }
            }
          }
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            content: true,
            createdAt: true
          }
        }
      }
    })

    res.json(conversations)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to get conversations" })
  }
}
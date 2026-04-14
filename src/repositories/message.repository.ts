import { prisma } from "../prisma.client.js";

export const createMessage = async (
    content: string,
    authorId: number,
    conversationId: number
) => {
    return prisma.message.create({
        data: {
            content,
            authorId,
            conversationId
        }
    })
}

export const getMessages = async (conversationId: number) => {
    return prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" }
    })
}
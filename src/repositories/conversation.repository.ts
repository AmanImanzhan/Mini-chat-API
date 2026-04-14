import e from "express";
import { prisma } from "../prisma.client.js";

export const createConversation = async(userIds: number[]) => {
    return prisma.conversation.create({
        data: {
            members: {
                create: userIds.map(id => ({ userId: id}))
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
}

export const getUserConversations = async(userId: number) => {
 return prisma.conversation.findMany({
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
}
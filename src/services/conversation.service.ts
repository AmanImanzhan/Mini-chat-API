import * as conversationRepository from "../repositories/conversation.repository.js"

export const createConversation = async(userIds: number[]) => {
    if (!userIds || userIds.length > 2) {
        throw new Error("At least 2 users required")
    }

    return conversationRepository.createConversation(userIds)
}

export const getConversations = async(userId: number) => {
    return conversationRepository.getUserConversations(userId)
}
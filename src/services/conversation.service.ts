import * as conversationRepository from "../repositories/conversation.repository.js"

export const createConversation = async(userIds: number[]) => {
    return conversationRepository.createConversation(userIds)
}

export const getConversations = async(userId: number) => {
    return conversationRepository.getUserConversations(userId)
}
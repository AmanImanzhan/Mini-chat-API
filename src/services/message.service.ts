import * as messageRepository from "../repositories/message.repository.js"

export const sendMessage = async (
  content: string,
  userId: number,
  conversationId: number
) => {
  if (!content) {
    throw new Error("Message content required")
  }

  return messageRepository.createMessage(content, userId, conversationId)
}

export const getMessages = async (conversationId: number) => {
  return messageRepository.getMessages(conversationId)
}
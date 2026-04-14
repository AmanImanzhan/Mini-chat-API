import * as userRepository from "../repositories/user.repository.js"

export const register = async (email: string, password: string) => {
  const existing = await userRepository.findByEmail(email)

  if (existing) {
    throw new Error("User already exists")
  }

  return userRepository.createUser(email, password)
}
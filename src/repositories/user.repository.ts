import { prisma } from "../prisma.client.js";

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } })
}

export const createUser = async (email: string, password: string) => {
  return prisma.user.create({
    data: { email, password }
  })
}
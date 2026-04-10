import { Request, Response } from "express"
import { prisma } from "../prisma.client.js"

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
  })

      if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
  }
    const user = await prisma.user.create({
        data: {
            email, 
            name
        }
    })

    res.json(user)
  }catch (error) {
    console.error(error) 
    res.status(500).json({ error: "Failed to create user"})
  }
}
import { Request, Response } from "express"
import { prisma } from "../prisma.client.js"
import jwt, {SignOptions} from "jsonwebtoken"
import { error } from "node:console"

const JWT_SECRET = process.env.JWT_SECRET!

export const register = async (req: Request, res: Response) => {

  const { email, password } = req.body

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
        password
      }
    })

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({ token })

  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Failed to register" })

  }

}

export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        if (user.password !== password) {
          return res.status(400).json({error: "Wrong password"})
        }
        const options: SignOptions = {
            expiresIn: "7d"
        }

        const token = jwt.sign(
            {userId: user.id},
            JWT_SECRET,
            options
        )

        res.json({token})
    } catch (error) {
        res.status(500).json({error: "Login failed"})
    }
}

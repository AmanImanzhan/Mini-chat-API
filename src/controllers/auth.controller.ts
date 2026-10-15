import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"
import { prisma } from "../prisma.client.js"
import { JWT_SECRET } from "../config.js"

const SALT_ROUNDS = 10
const tokenOptions: SignOptions = { expiresIn: "7d" }

const createToken = (userId: number) =>
  jwt.sign({ userId }, JWT_SECRET, tokenOptions)

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    password.length < 6
  ) {
    res
      .status(400)
      .json({ error: "Email and password (min 6 characters) are required" })
    return
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      res.status(400).json({ error: "User already exists" })
      return
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: { email, password: hash }
    })

    res.status(201).json({ token: createToken(user.id) })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to register" })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Email and password are required" })
    return
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    const passwordOk = user?.password
      ? await bcrypt.compare(password, user.password)
      : false

    if (!user || !passwordOk) {
      res.status(401).json({ error: "Invalid email or password" })
      return
    }

    res.json({ token: createToken(user.id) })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Login failed" })
  }
}
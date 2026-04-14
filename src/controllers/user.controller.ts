import { Request, Response } from "express"
import * as userService from "../services/user.service.js"

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await userService.register(email, password)
    res.json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
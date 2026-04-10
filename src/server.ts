import express from "express"
import { Request, Response, NextFunction } from "express"
import cors from "cors"
import dotenv from "dotenv"
import conversationRoutes from "./routes/conversation.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { error } from "node:console"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

app.use("/users", userRoutes)
app.use("/conversations", conversationRoutes)
app.use("/messages", messageRoutes)
app.use("/auth", authRoutes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err.code === "P2002") {
    return res.status(400).json({
      error: "Duplicate field"
    })
  }

  res.status(500).json({
    error: "Internal server error"
  })
})


const PORT = Number(process.env.PORT) || 4001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
console.log("ENV:", process.env.JWT_SECRET)
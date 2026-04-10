# Mini Chat API

## 🚀 Tech Stack
- Node.js
- Express
- Prisma
- PostgreSQL

## 📌 Features
- JWT Auth
- Conversations
- Messages

## 📡 Endpoints

### Auth
POST /auth/register
POST /auth/login

### Conversations
GET /conversations
POST /conversations

### Messages
GET /messages/:id
POST /messages

## ⚙️ Setup

npm install  
npm run dev  

## 🔑 ENV

DATABASE_URL=...  
JWT_SECRET=...
# Mini Chat API

REST API for a simple chat: user registration and login with JWT, conversations between users, and messages with access control.

## Tech stack

Node.js · Express 5 · TypeScript · Prisma · PostgreSQL · JWT · bcrypt

## Features

- Registration and login, passwords hashed with bcrypt, JWT access tokens (7 days)
- Rate limiting on auth endpoints
- Conversations with members; the creator is always added as a member
- Messages: only members of a conversation can read or send messages (403 otherwise)
- Layered structure: routes → controllers → services → repositories
- Request validation and centralized error handling

## Getting started

```bash
git clone https://github.com/AmanImanzhan/Mini-chat-API.git
cd Mini-chat-API
npm install
cp .env.example .env     # then fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev
```

The server starts on `http://localhost:4001`. Generate a secret with `openssl rand -hex 32`.

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | no | Health check |
| POST | `/auth/register` | no | Create account, returns `{ "token": "..." }` |
| POST | `/auth/login` | no | Log in, returns `{ "token": "..." }` |
| GET | `/conversations` | yes | Conversations of the current user |
| POST | `/conversations` | yes | Create a conversation (`{ "userIds": [2, 3] }`) |
| GET | `/messages/:conversationId` | yes | Messages of a conversation (members only) |
| POST | `/messages` | yes | Send a message (`{ "content": "...", "conversationId": 1 }`) |

Protected endpoints require the header `Authorization: Bearer <token>`.

## Example

```bash
curl -X POST http://localhost:4001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}'

curl -X POST http://localhost:4001/messages \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello!","conversationId":1}'
```

## Roadmap

- Docker setup
- Tests
- Pagination for messages
- WebSocket support
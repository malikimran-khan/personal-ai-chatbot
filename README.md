# Personal AI Chatbot - Full Stack Application

A premium, full-stack AI chatbot built with **React (Vite)**, **Node.js (Express)**, **MongoDB**, and **LangChain**. This application features long-term user memory, allowing it to remember names, preferences, and context across sessions, wrapped in a beautiful "Soft Crystal" glassmorphism UI.

## 🚀 Project Overview
This project is designed to be a highly personalized AI assistant. Unlike simple chatbots, it stores and retrieves structured conversation history for each unique user, providing a truly tailored experience.

## 📁 Repository Structure
```text
personal-ai-chatbot/
├── client/          # React + Vite frontend (Soft Crystal Design)
└── server/          # Node.js + Express backend (AI & Persistence)
```

---

## 🏗️ Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd personal-ai-chatbot
```

### 2. Backend Setup (Server)
The backend manages AI logic and database persistence.

- **Navigate**: `cd server`
- **Install**: `npm install`
- **Environment Variables**: Create `server/.env`
  ```env
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/chatbot
  OPENAI_API_KEY=your_openai_api_key_here
  ```
- **Run**: `npm run dev`

### 3. Frontend Setup (Client)
The frontend provides the premium user interface.

- **Navigate**: `cd client`
- **Install**: `npm install`
- **Environment Variables**: Create `client/.env`
  ```env
  VITE_API_URL=http://localhost:5000
  ```
- **Run**: `npm run dev`

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS 4 |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose) |
| **AI Layer** | LangChain, OpenAI API |
| **Design** | Glassmorphism, Midnight & Soft Crystal |

---

## 🔑 Key Features
- **Persistent Memory**: Remembers user details (like name) across page refreshes and different sessions.
- **Premium Aesthetics**: High-end light-mode design with smooth animations.
- **UserId Management**: Automatically manages unique identities via browser local storage.
- **Full History Storage**: Conversations are stored as structured objects in MongoDB.

---

## 📄 License
This project is for educational and personal use. Feel free to modify it for your own needs!

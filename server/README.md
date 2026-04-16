# Personal AI Chatbot - Server

This is the backend for the Personal AI Chatbot, powered by Node.js, Express, MongoDB, and LangChain. It manages user sessions and integrates with OpenAI to provides context-aware intelligent responses.

## Purpose
The server acts as the "brain" of the application. It handles:
- **Conversation Context**: Maintaining long-term memory for users using MongoDB.
- **AI Integration**: Communicating with OpenAI via LangChain to generate personalized responses.
- **Persistence**: Ensuring user data and chat history are saved securely.

## Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a cloud instance)

## Getting Started

1. **Navigate to the server folder**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/chatbot
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   *or for development:*
   ```bash
   npm run dev
   ```

## Environment Variables Reference

| Variable | Description | Example / Dummy Value |
|----------|-------------|-----------------------|
| `PORT` | The port the server will run on | `5000` |
| `MONGO_URI` | The connection string for MongoDB | `mongodb://localhost:27017/chatbot` |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-proj-...` |

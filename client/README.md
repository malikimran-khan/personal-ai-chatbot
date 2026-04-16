# Personal AI Chatbot - Client

This is the frontend for the Personal AI Chatbot, built with React, Vite, and Tailwind CSS. It features a premium "Soft Crystal" design with real-time AI interactions.

## Purpose
The client provides a high-end, responsive user interface for interacting with the AI. Key features include:
- **Premium UI**: Midnight and Soft Crystal glassmorphism designs.
- **Persistent Sessions**: Remembers your identity across browser refreshes.
- **Real-time Feedback**: Bouncy animations and status indicators for a "living" experience.

## Prerequisites
- Node.js (v18+)

## Getting Started

1. **Navigate to the client folder**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `client` directory and add the following variable:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   *Note: Ensure the URL matches the port your server is running on.*

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Design System
The project uses **Tailwind CSS v4** with custom design tokens for a "Soft Crystal" aesthetic.
- **Font**: Outfit (via Google Fonts)
- **Primary Colors**: Indigo & Violet gradients
- **Glassmorphism**: White-frost backdrop blur effects

# AuctionApp – Real-Time Auction Platform

It is designed to handle **live bidding**, **concurrent users**, and **secure, scalable backend services**.

---

##  Features

-  **Real-time bidding** using Socket.io
-  **Live auction countdown** with last-second bid handling
-  **Rate limiting** to prevent abuse & spam bidding
-  **Centralized logging** using Winston
-  **Dockerized setup** for easy deployment
-  Modern, responsive UI with Tailwind & shadcn/ui

---

##  Tech Stack

### Frontend
- **React + TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Socket.IO Client**

### Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Socket.IO**
- **Rate Limiter**
- **Winston Logger**

### DevOps / Tools
- **Docker**
- **Docker Compose**
- **Git & GitHub**

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/utkarshrastogi121/AuctionApp.git
cd AuctionApp
```
### 2. Environment Variables
Create a .env file in backend:
```env
PORT=5000
MONGO_URI=your_mongodb_url
```
Create a .env file in frontend:
```env
VITE_API_BASE_URL=https://auctionapp-um54.onrender.com
```
### 3. Run with Docker
```bash
docker-compose up --build
```




## 🏗️ System Architecture


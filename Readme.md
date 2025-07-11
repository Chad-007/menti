# 🧠 Mentimeter Clone App

A real-time interactive quiz and polling application, inspired by Mentimeter. Built with a separate frontend and backend, the app uses **Redis** for managing user authentication (signup/login) and **WebSockets** for real-time quiz interactions.

## 🚀 Features

- 🔐 User Signup & Login (Backed by Redis)
- 📊 Live Quiz and Polling System
- ⚡ Real-time updates using WebSockets
- 💻 Modern frontend and backend structure

## 📁 Project Structure

```
mentimeter-clone/
├── frontend/      # React-based UI for participants and hosts
└── backend/       # Node.js backend with Redis & WebSocket support
```

## 🔧 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Redis](https://redis.io/)
- npm (comes with Node.js)

## 📦 Installation & Running

### 1. Clone the Repository

```bash
git clone https://github.com/Chad-007/menti.git
cd menti
```

### 2. Setup Frontend

```bash
cd menti
npm install
npm start
```

Runs the React frontend at: [http://localhost:3000](http://localhost:3000)

### 3. Setup Backend

Open a new terminal window:

```bash
cd backend
npm install
npm start
```

Backend will run at: [http://localhost:5000](http://localhost:5000) (or your configured port)

## 🛠️ Technologies Used

- **Frontend**: React, WebSockets
- **Backend**: Node.js, Express, Redis
- **Real-time Communication**: WebSocket
- **Auth & Session Management**: Redis

## 🧪 Usage

1. Visit the frontend URL.
2. Sign up or log in.
3. Host a quiz or join as a participant.
4. Watch real-time results and interactions unfold.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.


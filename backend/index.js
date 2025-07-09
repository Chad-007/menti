const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Redis = require("ioredis");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const redis = new Redis();
app.use(bodyParser.json());
const PORT = 4000;
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (await redis.hget("users", username)) {
    return res.status(400).json({ message: "User exists" });
  }
  await redis.hset("users", username, password);
  console.log(username,password)
  res.json({ message: "Signed up" });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const stored = await redis.hget("users", username);
  if (stored !== password) return res.status(401).json({ message: "Invalid" });
  res.json({ message: "Login successful" });
});
const rooms = {};
wss.on("connection", (ws) => {
  let currentRoom = null;
  let isAdmin = false;
  let username = null;
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);
    if (data.type === "join") {
      currentRoom = data.roomId;
      isAdmin = data.admin;
      username = data.username || `User-${Math.floor(Math.random() * 1000)}`;
      if (isAdmin) {
        rooms[currentRoom] = {
          questionIndex: 0,
          questions: data.questions || [],
          clients: [],
          responses: {},
          scores: {},
          usernames: new Map(),
        };
      }
      const room = rooms[currentRoom];
      if (room) {
        room.clients.push(ws);
        room.usernames.set(ws, username);
        room.scores[username] = 0;

        if (!isAdmin) {
          const q = room.questions[room.questionIndex];
          ws.send(JSON.stringify({ type: "question", question: q }));
        }
      }
    }
    if (data.type === "next" && isAdmin) {
      const room = rooms[currentRoom];
      room.questionIndex++;
      const q = room.questions[room.questionIndex];
      if (!q) {
        const scores = room.scores;
        const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const topScore = scores[winner];

        room.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "end", winner, score: topScore }));
          }
        });
        return;
      }
      room.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "question", question: q }));
        }
      });
    }
    if (data.type === "answer") {
      const room = rooms[currentRoom];
      const idx = room.questionIndex;
      const opt = data.option;
      const q = room.questions[idx];
      const correctAnswer = q?.answer;
      const user = room.usernames.get(ws);

      if (!room.responses[idx]) room.responses[idx] = {};
      if (!room.responses[idx][opt]) room.responses[idx][opt] = 0;
      room.responses[idx][opt]++;

      if (opt === correctAnswer) {
        room.scores[user] = (room.scores[user] || 0) + 1; 
      }
      room.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(JSON.stringify({ type: "vote-update", results: room.responses[idx] }));
        }
      });
    }
  });
  ws.on("close", () => {
    if (currentRoom && rooms[currentRoom]) {
      const room = rooms[currentRoom];
      room.clients = room.clients.filter(c => c !== ws);
      room.usernames.delete(ws);
    }
  });
});
server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

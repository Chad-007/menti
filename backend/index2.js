const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Redis = require("ioredis");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const redis = new Redis();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
const PORT = 4000;
app.post('/signup',async(req,res)=>{
    const {username,password}  = req.body;
   if(await redis.hget("users".username)){
        return res.status(400).json({message:"just signup dude"})
   }
   await redis.hset("users",username,password)
   alert("yeah ur good")
});
app.post('/login',async(req,res)=>{
    const {username,password}  = req.body;
    const stored  = await redis.hget("users",username);
    if(stored!==password){
        return res.status(400).json({message:"you aint that bitch"})
    }
   res.json({message:"yeah you go ahead"})
});


const rooms  = {}
wss.on("connection",(ws)=>{
    let currentroom = null
    let isadmin = false
    let username = null
    ws.on("message",(msg)=>{
        const data =  JSON.parse(msg)
        if(data.type==="join"){
            currentroom = data.roomid
            isadmin = data.admin
            username = data.username
            if(isadmin){
                rooms[currentroom]  = {
                    qindex:0,
                    questions :data.questions||[],
                    clients:[],
                    responses:[],
                    scores:[],
                    usernames:new Map()
                }
            }
            const  room = rooms[currentroom]
            if(room){
                room.clients.push(ws)
                room.usernames.set(ws,username)
                room.scores[username]  = 0;
                
                if(!isadmin){
                    const q  = room.questions[room.qindex]
                    ws.send(JSON.stringify({type:"question",question:q}))
                }
            }
        }
        if(data.type==="next" && isadmin){
            const room = rooms[currentroom]
            room.qindex++;
            if(!q){
                const  scores = room.scores;
                const winner  = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
                const top = scores[winner]
                room.clients.forEach(client=>{
                    if(client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({type:"end",winner,score:top}))
                    }
                })
                return;
            }
            room.clients.forEach(client=>{
                if(client.readyState===WebSocket.OPEN){
                    client.send(JSON.stringify({type:"question",question:q}))
                }
            })
}
if(data.type==="answer"){
    const room = rooms[currentroom];
    const id  = room[qindex]
    const opt = data.option
    const q = room.questions[id]
    const correct = q.answer
    const user  = room.usernames.get(ws)
    // initilze the id and the option
    if(!room.responses[id]){
        room.responses[id]   = {}
    }
    if(!room.responses[id][opt]){
        room.responses[id][opt] = 0
    }
    room.responses[id][opt]++
    if(opt===correct){
        room.scores[user] = (room.scores[user]||0)+1
    }
    room.clients.forEach(client=>{
        if(client.readyState===WebSocket.OPEN && client!== ws){
            client.send(JSON.stringify({type:"vote-update",results:room.responses[id] }))
        }

    })
}
    })
    ws.on("close",()=>{
        if(currentroom && rooms[currentroom]){
            const room  = rooms[currentroom]
            room.clients = room.clients.filter(c=>c!==ws)
            room.usernames.delete(ws)
        }
    })
})
server.listen(PORT,()=>{
    console.log(`server is listening on :${PORT}`)
})


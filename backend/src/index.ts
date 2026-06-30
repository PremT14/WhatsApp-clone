import http, { METHODS } from "http";
import express from "express";
import { Socket, Server } from "socket.io";
import cors from "cors";
import sequelize from "./utils/db"

const app = express();
app.use(express.json()); 

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true
    }
})

app.use(cors());

io.on("connection", (socket: Socket)=>{
    console.log("New Connection established", socket.id)
})
sequelize.sync().then(()=>{
    
})
server.listen(3000, ()=>{
    console.log("Port is listening to 3000");
})
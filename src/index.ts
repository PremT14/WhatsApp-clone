import dotenv from "dotenv"
import http from "http";
import express, { NextFunction } from "express";
import { Socket, Server } from "socket.io";
import path from "path";
import sequelize from "./utils/db"
import authRoutes from "./routes/authRoutes"
import homeRoutes from "./routes/homeRoutes"
import cookieParser from "cookie-parser";
import User from "./models/user";
import Message from "./models/messages";
import Connection from "./models/connection";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const server = http.createServer(app);
const io = new Server(server)

app.use(authRoutes)
app.use(homeRoutes)

User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

User.hasMany(Connection, { foreignKey: "userId", as: "chatConnect" });
User.hasMany(Connection, { foreignKey: "receiverId", as: "receivedChat" });
Connection.belongsTo(User, { foreignKey: "userId", as: "sender" });
Connection.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });


io.on("connection", (socket: Socket)=>{
    console.log("Connection happened", socket.id)
})

sequelize.sync().then(() => {
    console.log("DB connection successfull");
    server.listen(process.env.PORT, () => {
        console.log(`Port is listening to ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("DB sync error", err);
})
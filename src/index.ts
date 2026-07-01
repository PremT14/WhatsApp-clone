import http from "http";
import express, { Request, Response, NextFunction } from "express";
import { Socket, Server } from "socket.io";
import path from "path";
import sequelize from "./utils/db"
import authRoutes from "./routes/authRoutes"
import homeRoutes from "./routes/homeRoutes"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const server = http.createServer(app);
const io = new Server(server)

app.use(authRoutes)
app.use(homeRoutes)

io.on("connection", (socket: Socket) => {
    console.log("New Connection established", socket.id);
})

sequelize.sync().then(() => {
    console.log("DB connection successfull");

    server.listen(3000, () => {
        console.log("Port is listening to 3000");
    })
})

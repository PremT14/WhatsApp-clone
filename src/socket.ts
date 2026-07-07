import { Server as nodeServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken"
import { UUID } from "crypto";
import * as cookies from "cookie"

let io: Server | null = null;

interface jwtPayload {
    userId: UUID;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload
        }
    }
}

const userSocket = new Map<string, string>();

const initSocket = (httpServer: nodeServer): Server => {
    console.log("------>Function Started to executing<------");
    io = new Server(httpServer);

    io.on("connection",(socket) => {
        try {
            const rawCookie = socket.handshake.headers.cookie as string;
            const parsedCookie = cookies.parseCookie(rawCookie);

            const authToken = parsedCookie.token as string;
            const decode = jwt.verify(authToken, process.env.JWT_SECRET as string) as jwtPayload;
            
            const userId = decode.userId;
  
            userSocket.set(userId, socket.id)
            console.log("Connection established", socket.id);
            console.table(userSocket)

            socket.on("send-message", (payload)=>{
                const message = payload.message;
                const receiverId = payload.receiverId;

                const receiverSocket = userSocket.get(receiverId) as string;
                io?.to(receiverSocket).emit("receive-message", message)
                console.log("message sent");
            })
            
            socket.on("disconnect", ()=>{
                userSocket.delete(userId);
                console.log("User disconnected", userId);
            })

        } catch (error) {
            console.log("Error occured--------------> ",error)
        }
    })
    return io;

}

const getIo = (): Server => {
    if (!io) {
        throw new Error("IO not defined")
    }
    console.log("------>IO connection setup established<------");
    return io;
}

export {
    initSocket,
    getIo,
    userSocket
}
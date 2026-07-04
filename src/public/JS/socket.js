const socket = io();

console.log(cookieStore.token);

socket.on("connect", () => {
    console.log("Client connected");
    console.log("Connection successfull")
})
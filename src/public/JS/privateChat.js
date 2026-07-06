const socket = io();
const messageCont = document.getElementById('messageContainer')
const sendBtn = document.getElementById('sendBtn')
    
socket.on("connect", () => {
    console.log("Client connected");
    console.log("Connection successfull")
})

messageCont.addEventListener("click", ()=>{
    socket.emit("send-message", message);
})

socket.on("receive-message", (message)=>{
    messageCont.append(
        `<div class="w-full h-13 flex items-end justify-end">
            <div class="w-fit h-fit w-content h-10 overflow-scroll scrollbar-none p-2 w-30 h-10 bg-green-300 text-white">
                ${message}
            </div>  
        </div>`
    )
})
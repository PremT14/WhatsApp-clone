const socket = io();
const messageCont = document.getElementById('messageContainer')
const form = document.getElementById('textForm')
const messageInput = document.getElementById('messageInput');
const receiver = document.getElementById("receiver");
    
socket.on("connect", () => {
    console.log("Client connected");
    console.log("Connection successfull")
})

sendBtn.addEventListener("click", ()=>{
    const payLoad = {
        message: messageInput.value,
        receiverId: receiver.value
    }

    socket.emit("send-message", payLoad);
    // messageInput.value = ""

})

socket.on("receive-message", (message)=>{

    console.log(message)
    const box = document.createElement('div');
    box.className = "w-full h-13 flex items-end justify-end";

    const innerBox = document.createElement('div');
    innerBox.className = "w-fit h-fit overflow-scroll scrollbar-none p-2 bg-green-300 text-white flex items-end justify-end";
    innerBox.textContent = message;

    console.log(innerBox.className);

    box.appendChild(innerBox);
    messageCont.appendChild(innerBox);
})
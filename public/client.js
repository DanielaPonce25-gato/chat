
const socket = io(); // inicializo socket.io en el cliente

function sendMessage() {
    const message = document.getElementById('messageInput').value /* para se vea y sircule la informacion */
    socket.emit('newMessage', message); /* para poder crear un nuevo mensaje*/
}

// Para mostrar los mensajes
function appendMessage(socketId, message) { // para enviaselo al servidor
    const messageList = document.getElementById('messageList')
    const newMessage = document.createElement('p') // creacion del mensaje
    newMessage.textContent = `${socketId}: ${message}`

    messageList.appendChild(newMessage) // Lo agrego al dom

}



// Recibir/Escuchar los mensajes del lado del servidor
socket.on('messageList', (messages) => {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach((message) => { 
        appendMessage( 
            message.socketId, 
            message.message
        )
    })
})


// Escuchar nuevos mensajes
socket.on('newMessage', (data) => {
    appendMessage(data.socketId, data.message)
})


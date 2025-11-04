const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

let messages = []

io.on('connection', (socket) => {
    socket.emit('messageList', messages)
    console.log('Nuevo cliente se ha conectado')

    socket.on('newMessage', (message) => {
        messages.push(message)
        io.emit('newMessage', {
            socketid: socket.id,
            message: message
        })
    })
})

http.listen(port, () => {
    console.log(`El servidor corre en http://localhost:${port}`)
})
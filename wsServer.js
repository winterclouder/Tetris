var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var PORT = 3000
var clientCount = 0
var bindListener = function(socket, enent) {
  socket.on(enent, (data) => {
    if (socket.clientNum % 2 == 0) {
      socketMap[socket.clientNum - 1].emit(enent, data)
    } else {
      socketMap[socket.clientNum + 1].emit(enent, data)
    }
  })


}
var socketMap = {}

server.listen(PORT)

io.on('connection', function (socket) {
  clientCount = clientCount + 1
  socket.clientNum = clientCount
  socketMap[clientCount] = socket

  if (clientCount % 2 == 1) {

    socket.emit('wating', 'wating some')
    console.log('0000')
  } else {
    socket.emit('start')
    socketMap[clientCount - 1].emit('start')
  }

  bindListener(socket, 'init')
  bindListener(socket, 'next')
  bindListener(socket, 'rotate')
  bindListener(socket, 'right')
  bindListener(socket, 'left')
  bindListener(socket, 'fall')
  bindListener(socket, 'fixed')
  bindListener(socket, 'line')
  bindListener(socket, 'down')

  socket.on('disconnect', () => {})
})



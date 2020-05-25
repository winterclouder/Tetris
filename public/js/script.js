var socket = io('ws://localhost:3000')
var local = new Local(socket)
var remote = new Remote(socket)
// console.log(socket)

socket.on('wating',(str)=>{
  console.log('wating')
  document.getElementById('wating').innerHTML = str
})


var Remote = function (socket) {
  var game
  var bindEvents = function () {
    socket.on('init', (data) => {
      start(data.type, data.dir)
    })
    socket.on('next', (data) => {
      game.performNext(data.type, data.dir)
    })
    socket.on('rotate', (data) => {
      game.rotates()
    })
    socket.on('right', (data) => {
      game.right()
    })
    socket.on('down', (data) => {
      game.down()
    })
    socket.on('left', () => {
      console.log('left')
      game.left()
    })
    socket.on('fall', (data) => {
      game.fall()
    })
    socket.on('fixed', (data) => {
      game.fixed()
    })
    socket.on('line', (line) => {
      game.checkClear()
      game.addScore(line)
    })
  }

  var start = function (type, dir) {
    var doms = {
      gameDiv: document.getElementById('remote_game'),
      nextDiv: document.getElementById('remote_next'),
      timeDiv: document.getElementById('remote_time'),
      scoreDiv: document.getElementById('remote_score'),
      resultDiv: document.getElementById('remote_gameover'),
    }
    game = new Game()
    game.init(doms, type, dir)
  }
  bindEvents()
}
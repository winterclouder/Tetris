var Local = function (socket) {
  var game
  var INTERVAL = 200
  var timer = null
  var timeCount = 0
  var time = 0
  var remainingTime = 0
  var bindKeyEvent = function () {
    document.onkeydown = function (e) {
      if (e.keyCode == 38) {
        // game.roates()
      } else if (e.keyCode == 39) {
        game.right()
        socket.emit('right')
      } else if (e.keyCode == 40) {
        game.fall()
        socket.emit('fall')
        // game.down()
      } else if (e.keyCode == 37) {
        game.left()
        socket.emit('left')
      } else if (e.keyCode == 32) {
        // space
        game.roates()
        socket.emit('roate')
      } else {
      }
    }
  }

  var move = function () {
    timeFunc()
    if (!game.down()) {
      game.fixed()
      socket.emit('fixed')
      var line = game.checkClear()
      if (line) {
        game.addScore(line)
        socket.emit('line', line)
      }
      var gameOver = game.checkGameOver()
      console.log(gameOver)
      if (gameOver) {
        stop()
        game.gameOver()
      } else {
            bindKeyEvent()
            var t = generateType()
            var d = generateDir()
            socket.emit('next', {type: t, dir: d})
        game.performNext(t, d)
      }
    } else {
      socket.emit('down')
    }
  }

  var timeFunc = function () {
    timeCount = timeCount + 1
    if (timeCount == 5) {
      timeCount = 0
      time = time + 1
      game.setTime(time)
      // if (time % 20 == 0) game.addTailLine(generateLine(1))
    }
  }

  var generateType = function () {
    return Math.ceil(Math.random() * 7) - 1
  }

  var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1
  }

  var start = function () {
    var doms = {
      gameDiv: document.getElementById('local_game'),
      nextDiv: document.getElementById('local_next'),
      timeDiv: document.getElementById('local_time'),
      scoreDiv: document.getElementById('local_score'),
      resultDiv: document.getElementById('local_gameover'),
    }
    game = new Game()
    var type = generateType()
    var dir = generateDir()
    socket.emit('init',{type:type, dir:dir})
    game.init(doms, type, dir)
    bindKeyEvent()
        var t = generateType()
        var d = generateDir()
        socket.emit('next', {type: t, dir: d})
    game.performNext(t, d)
    timer = setInterval(move, INTERVAL)
  }
  var stop = function () {
    if (timer) {
      clearInterval(timer)
      timer = null
      document.onkeydown = null
    }
  }

  var pause = function () {
    clearInterval(timer)
  }

  var resume = function () {
    clearTimeout(timer)
    setTimeout(callback, remainingTime)
  }

  var callback = function () {
    timer = window.setInterval(move, INTERVAL)
  }

  // random add lines
  var generateLine = function (lineNum) {
    var lines = []
    for (let i = 0; i < lineNum; i++) {
      var line = []
      for (let j = 0; j < 10; j++) {
        line.push(Math.ceil(Math.random() * 2) - 1)
      }
      lines.push(line)
    }
    return lines
  }

  socket.on('start', () => {
    console.log('遊戲開始')
    document.getElementById('wating').innerHTML = '遊戲開始'
    start()
  })

  // this.start = start
  // this.pause = pause
  // this.resume = resume
  // this.stop = stop
}

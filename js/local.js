var Local = function () {
  var game
  var INTERVAL = 333
  var timer = null
  var timeCount = 0
  var time = 0
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if(e.keyCode == 38) {

      }else if(e.keyCode == 39) {
        game.right()
      }else if(e.keyCode == 40) {
        game.fall()
        // game.down()
      }else if(e.keyCode == 37) {
        game.left()
      }else if(e.keyCode == 32) {
        game.roates()
      } else {

      }
    }
  }

  var move = function() {
    timeFunc()
    if (!game.down()) {
      game.fixed()
      var line = game.checkClear()
      if (line) {
        game.addScore(line)
      }
      var gameOver = game.checkGameOver()
      console.log(gameOver)
      if (gameOver) {
        stop()
        game.gameOver()
      } else {
        game.performNext(generateType(), generateDir())
      }
    }
  }

  var timeFunc =  function(){
    timeCount = timeCount + 1
    if (timeCount == 3) {
      timeCount = 0
      time = time + 1
      game.setTime(time)
      if (time % 10 == 0)
        game.addTailLine(generateLine(1))
    }
  }

  var generateType = function() {
   return Math.ceil(Math.random() * 7) - 1
  }

  var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1
  }

  var start = function() {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next'),
      timeDiv: document.getElementById('time'),
      scoreDiv: document.getElementById('score'),
      resultDiv: document.getElementById('gameover'),
    }
    game = new Game()
    game.init(doms, generateType(), generateDir())
    bindKeyEvent()
    game.performNext(generateType(), generateDir())
    timer = setInterval(move, INTERVAL)
  }

  var stop = function() {
    if(timer) {
      clearInterval(timer)
      timer = null
      document.onkeydown = null
    }
  }

  // random add lines
  var generateLine = function(lineNum) {
    var lines = []
    for (let i = 0; i < lineNum; i++) {
      var line = []
      for (let j = 0; j < 10; j++) {
        line.push(Math.ceil(Math.random()*2)-1)
      }
      lines.push(line)
    }
    return lines
  }

  this.start = start
}
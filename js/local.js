var Local = function () {
  var game
  var INTERVAL = 200
  var timer = null
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if(e.keyCode == 38) {
        game.roates()
      }else if(e.keyCode == 39) {
        game.right()
      }else if(e.keyCode == 40) {
        game.down()
      }else if(e.keyCode == 37) {
        game.left()
      }else if(e.keyCode == 32) {
        game.fall()
      } else {

      }
    }
  }

  var move = function() {
    if (!game.down()) {
      game.fixed()
    }

  }

  var start = function() {
    var doms =  {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next')
    }
    game = new Game()
    game.init(doms)
    bindKeyEvent()
    timer = setInterval(move, INTERVAL)
  }
  this.start = start
}
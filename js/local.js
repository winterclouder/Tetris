var Local = function () {
  var game

  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if(e.keyCode == 38) {
        console.log('up')
      }else if(e.keyCode == 39) {
        console.log('right')
      }else if(e.keyCode == 40) {
        console.log('down')
        game.down()
      }else if(e.keyCode == 37) {
        console.log('left')
      }else if(e.keyCode == 32) {
        console.log('space')
      } else {
        console.log('down')
      }
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
  }
  this.start = start
}
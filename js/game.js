var Game = function () {
  var gameDiv
  var nextDiv
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  var cur
  var next
  var timeDiv
  var scoreDiv
  var nextDivs = []
  var gameDivs = []
  var score = 0
  var initDiv = function (container, data, divs) {
    for (let i = 0; i < data.length; i++) {
      var div = []
      for (let j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div')
        newNode.className = 'none'
        newNode.style.top = i * 20 + 'px'
        newNode.style.left = j * 20 + 'px'
        container.appendChild(newNode)
        div.push(newNode)
      }
      divs.push(div)
    }
  }

  var refreshDiv = function (data, divs) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] == 0) {
          divs[i][j].className = 'none'
        } else if (data[i][j] == 1) {
          divs[i][j].className = 'done'
        } else if (data[i][j] == 2) {
          divs[i][j].className = 'current'
        }
      }
    }
  }

  // 檢查點
  var check = function (pos, x, y) {
    if (pos.x + x < 0) {
      return false
    } else if (pos.x + x >= gameData.length) {
      return false
    } else if (pos.y + y < 0) {
      return false
    } else if (pos.y + y >= gameData[0].length) {
      return false
    } else if (gameData[pos.x + x][pos.y + y] == 1) {
      return false
    } else {
      return true
    }
  }

  // 檢查位置
  var isValid = function (pos, data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!check(pos, i, j)) {
            return false
          } else {
          }
        }
      }
    }
    return true
  }

  // 清除數據
  var clearData = function () {
    for (let i = 0; i < cur.data.length; i++) {
      for (let j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j))
          gameData[cur.origin.x + i][cur.origin.y + j] = 0
      }
    }
  }

  var setData = function () {
    for (let i = 0; i < cur.data.length; i++) {
      for (let j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j))
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j]
      }
    }
  }

  // 旋轉
  var roates = function () {
    if (cur.canRotate(isValid)) {
      clearData()
      cur.rotate()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }

  // 下移
  var down = function () {
    if (cur.canDown(isValid)) {
      clearData()
      cur.down()
      setData()
      refreshDiv(gameData, gameDivs)
      return true
    } else {
      return false
    }
  }
  // 左移
  var left = function () {
    if (cur.canLeft(isValid)) {
      clearData()
      cur.left()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }
  // 右移
  var right = function () {
    if (cur.canRight(isValid)) {
      clearData()
      cur.right()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }

  var fixed = function () {
    for (let i = 0; i < cur.data.length; i++) {
      for (let j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs)
  }

  var checkClear = function () {
    var line = 0
    for (var i = gameData.length - 1; i >= 0; i--) {
      var clear = true
      for (let j = 0; j < gameData[0].length; j++) {
        if (gameData[i][j] != 1) {
          clear = false
          break
        }
      }
      if (clear) {
        line = line + 1
        for (let m = i; m > 0; m--) {
          for (var n = 0; n < gameData[0].length; n++) {
            gameData[m][n] = gameData[m - 1][n]
          }
        }
        for (var n = 0; n < gameData[0].length; n++) {
          gameData[0][n] = 0
        }
        i++
      }
    }
    return line
  }

  var performNext = function (type, dir) {
    cur = next
    setData()
    next = SquareFactory.prototype.make(type, dir)
    refreshDiv(gameData, gameDivs)
    refreshDiv(next.data, nextDivs)
  }

  var checkGameOver = function() {
    var gameOver = false
    for (let i = 0; i < gameData.length; i++) {
      if(gameData[1][i] == 1) {
        gameOver = true
      }
    }
    return gameOver
  }

  var init = function (doms, type, dir) {
    gameDiv = doms.gameDiv
    nextDiv = doms.nextDiv
    timeDiv = doms.timeDiv
    scoreDiv = doms.scoreDiv
    console.log(doms)
    next = SquareFactory.prototype.make(type, dir)
    initDiv(gameDiv, gameData, gameDivs)
    initDiv(nextDiv, next.data, nextDivs)
    refreshDiv(next.data, nextDivs)
  }

  var setTime = function(time) {
    timeDiv.innerHTML = time
  }

  var addScore = function(line) {
    var s = 0
    switch (line) {
      case 1:
        s = 10
        break;
      case 2:
        s = 20
        break;
      case 3:
        s = 40
        break;
      case 4:
        s = 100
        break;

      default:
        break;
    }
    score += s
    scoreDiv.innerHTML = score
  }

  this.init = init
  this.down = down
  this.left = left
  this.right = right
  this.roates = roates
  this.fixed = fixed
  this.performNext = performNext
  this.checkClear = checkClear
  this.checkGameOver = checkGameOver
  this.setTime = setTime
  this.addScore = addScore
  this.fall = function () {
    while (down()) {}
  }
}

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

  var nextDivs = []
  var gameDivs = []

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

  var fixed = function() {
    for (let i = 0; i < cur.data.length; i++) {
      for (let j = 0; j < cur.data[0].length; j++) {
        if(check(cur.origin,i,j)) {
          if(gameData[cur.origin.x + i][cur.origin.y+j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs)
  }

  var init = function (doms) {
    gameDiv = doms.gameDiv
    nextDiv = doms.nextDiv
    cur = SquareFactory.prototype.make(2, 2)
    next = SquareFactory.prototype.make(3, 3)
    initDiv(gameDiv, gameData, gameDivs)
    initDiv(nextDiv, next.data, nextDivs)
    setData()
    refreshDiv(gameData, gameDivs)
    refreshDiv(next.data, nextDivs)
  }

  this.init = init
  this.down = down
  this.left = left
  this.right = right
  this.roates = roates
  this.fixed = fixed
  this.fall = function() { while (down()) {

  } }
}

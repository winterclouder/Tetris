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
    console.log(data)
    console.log(divs)
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
    console.log(pos)
    console.log(x)
    console.log(y)

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

  var down = function () {
    // console.log(cur.canDown(isValid))

    if (cur.canDown(isValid)) {
      clearData()
      cur.down()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }

  var init = function (doms) {
    gameDiv = doms.gameDiv
    nextDiv = doms.nextDiv
    cur = new Square()
    next = new Square()
    initDiv(gameDiv, gameData, gameDivs)
    initDiv(nextDiv, next.data, nextDivs)
    cur.origin.x = 5
    cur.origin.y = 5
    setData()
    refreshDiv(gameData, gameDivs)
    refreshDiv(next.data, nextDivs)
  }

  this.init = init
  this.down = down
}

var Square = function () {
  this.data = [
    [2, 0, 0, 0],
    [2, 0, 0, 0],
    [2, 0, 0, 0],
    [2, 0, 0, 0],
  ]

  this.origin = {
    x: 0,
    y: 0,
  }
}
Square.prototype.canDown = function(isValid) {
  var test = {}
  test.x = this.origin.x + 1
  test.y = this.origin.y

  return isValid(test, this.data)
}

Square.prototype.down = function() {
  this.origin.x = this.origin.x + 1
}

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  constrain(minV, maxV) {
    if (this.x < minV.x) this.x = minV.x;
    else if (this.x > maxV.x) this.x = maxV.x;
    if (this.y < minV.y) this.y = minV.y;
    else if (this.y > maxV.y) this.y = maxV.y;
  }

  add(otherV) {
    this.x += otherV.x;
    this.y += otherV.y;
  }
}

function distanceV(v1, v2) {
  var dx = v2.x - v1.x;
  var dy = v2.y - v1.y;
  return sqrt(dx * dx + dy * dy);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomV() {
  const x = randomIntFromInterval(-1, 1);
  const y = randomIntFromInterval(-1, 1);
  return new Vector(x, y);
}

function createV(a, b) {
  if (a != undefined && b != undefined)
    return new Vector(a, b);
  else if (a != undefined && b == undefined)
    return new Vector(a.x, a.y);
}
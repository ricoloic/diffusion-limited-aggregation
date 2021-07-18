class Walker extends Vector {
  constructor(x, y, r) {
    super(x, y);
    this.radius = r;
    this.twoRadius = r * 2;
  }

  walk() {
    this.add(randomV());
    this.constrain(new Vector(), createV(width, height));
  }

  watchStep(otherWalkers) {
    for (let otherW of otherWalkers)
      if (distanceV(this, otherW) <= this.radius + otherW.radius)
        return true;
    return false;
  }

  addColor(r, g, b) {
    this.color = { r, g, b };
  }

  changeRadius(r) {
    this.radius = r;
    this.twoRadius = r * 2;
  }
}

function createWalkerOnEdge(edge, radius) {
  if (edge == 0) // top
    return new Walker(random(width), 0, radius);
  if (edge == 1) // right
    return new Walker(width, random(height), radius);
  if (edge == 2) // bottom
    return new Walker(random(width), height, radius);
  if (edge == 3) // left
    return new Walker(0, random(height), radius);
}

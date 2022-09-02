interface Point {
  x: number
  y: number
}

export default class Vector2D {
  x :number
  y :number

  constructor(x: number, y: number)
  constructor(v: Point)
  constructor(xv: number | Point, y?: number) {
    if (typeof xv === "object") {
      this.x = xv.x
      this.y = xv.y
    } else if (typeof xv === "number" && y) {
      this.x = xv
      this.y = y
    } else {
      throw new Error("Incorrect Vector2D parameters provided")
    }
  }

  add(vec: Point): Vector2D {
    this.x += vec.x
    this.y += vec.y

    return this
  }

  sub(vec: Point): Vector2D {
    this.x -= vec.x
    this.y -= vec.y

    return this
  }

  mult(n: number): Vector2D {
    this.x *= n
    this.y *= n

    return this
  }

  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  magSqr(): number {
    return this.x ** 2 + this.y ** 2
  }

  same(vec: Point) :boolean {
    return (this.x === vec.x && this.y === vec.y)
  }

  copy() :Vector2D {
    return new Vector2D(this.x, this.y)
  }

  static add(first: Point, second: Point): Vector2D {
    return new Vector2D({x: (first.x + second.x), y: (first.y + second.y)})
  }

  static sub(first: Point, second: Point): Vector2D {
    return new Vector2D({x: (first.x - second.x), y: (first.y - second.y)})
  }

  static mult(vec: Point, n: number): Vector2D {
    return new Vector2D({x: (vec.x * n), y: (vec.y * n)})
  }

  static negative(vec: Point): Vector2D {
    return new Vector2D({x: -vec.x, y: -vec.y})
  }

  static copy(vec: Point): Vector2D {
    return new Vector2D({x: vec.x, y: vec.y})
  }
}
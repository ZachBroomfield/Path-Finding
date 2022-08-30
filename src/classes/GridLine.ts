import Vector2D from './Vector2D'

interface Point {
  x: number
  y: number
}

interface Segment {
  start: Point
  end: Point
}

export default class GridLine {
  start: Vector2D
  end: Vector2D

  constructor(segment: Segment) {
    this.start = new Vector2D(segment.start)
    this.end = new Vector2D(segment.end)
  }

  get(): Segment {
    return {
      start: this.start,
      end: this.end
    }
  }
}
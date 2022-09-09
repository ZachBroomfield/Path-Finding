import Array2D from './Array2D'
import { BoxTypes } from './Box'
import Grid from './Grid'
import Vector2D from './Vector2D'
import { Point, Dimensions } from '../utils/Interfaces'

export default class Path2D {
  #values: Array2D<Vector2D | number>
  #pathFound: boolean
  #started: boolean
  #dimensions: Dimensions
  #currentEnds: Vector2D[]

  constructor(dimensions: Dimensions) {
    this.#values = new Array2D(dimensions, 0)
    this.#pathFound = false
    this.#started = false
    this.#dimensions = dimensions
    this.#currentEnds = []
  }

  createNextStep(grid: Grid, diagonals: boolean) {
    if (!this.#started) {
      const start = grid.getStart()
      this.#values.set(start.x - 1, start.y - 1, 1)
      this.#currentEnds.push(start)
      this.#started = true
    }

    const tempEnds: Vector2D[] = []
    const directionsToCheck = this.#getDirections(diagonals)
    
    this.#currentEnds.forEach(vector => {
      if (this.#pathFound) return

      directionsToCheck.forEach(direction => {
        this.#checkDirection(
          grid, vector.copy(), Vector2D.add(vector, direction), tempEnds
        )
      })
    })

    if (this.#pathFound) {
      this.#currentEnds.length = 0
    } else {
      this.#currentEnds = tempEnds
    }
  }

  reset() {
    this.#values = new Array2D(this.#dimensions, 0)
    this.#pathFound = false
    this.#currentEnds.length = 0
    this.#started = false
  }

  noPath(): boolean {
    return this.#currentEnds.length === 0 && !this.#pathFound
  }

  pathFound(): boolean {
    return this.#pathFound
  }

  #checkDirection(
    grid: Grid,
    last: Vector2D,
    direction: Vector2D,
    tempEnds: Vector2D[]
  ) {
    if (this.#values.get(direction.x - 1, direction.y - 1) !== 0) return
    
    const nextPosition = this.#checkGrid(grid, direction)
  
    if (nextPosition === 1) {
      this.#values.set(direction.x - 1, direction.y - 1, last)
  
      grid.set(direction.x, direction.y, BoxTypes.Path)
      tempEnds.push(direction)
      return
    } else if (nextPosition === 2) {
      this.#pathFound = true
  
      let value = last
      while (this.#values.get(value.x - 1, value.y - 1) !== 1) {
        grid.set(value.x, value.y, BoxTypes.Success)
        value = this.#values.get(value.x - 1, value.y - 1) as Vector2D
      }
    }
  }

  #checkGrid(grid :Grid, position: Vector2D): number {
    if (
      position.x < 1 || position.x > grid.getDimensions().cols ||
      position.y < 1 || position.y > grid.getDimensions().rows
    ) return 0
  
    if (grid.get(position.x, position.y).getType() === BoxTypes.Blank) return 1
    if (grid.get(position.x, position.y).getType() === BoxTypes.End) return 2
  
    return 0
  }

  #getDirections(diagonals: boolean): Point[] {
    const result = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}]

    if (diagonals) {
      result.push({x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}, {x: -1, y: -1})
    }

    return result
  }
}
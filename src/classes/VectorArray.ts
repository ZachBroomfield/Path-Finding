import Array2D from './Array2D'
import Grid from './Grid'
import Vector2D from './Vector2D'

interface Dimensions {
  width: number
  height: number
}

export default class VectorArray {
  list: Array2D
  pathFound: boolean
  #started: boolean
  #size: Dimensions
  #currentEnds: Vector2D[]

  constructor(size: Dimensions) {
    this.list = new Array2D(size, null)
    this.pathFound = false
    this.#started = false
    this.#size = size
    this.#currentEnds = []
  }

  createNextStep(grid: Grid) {
    if (!this.#started) {
      const start = grid.start()
      this.list.set(start.x - 1, start.y - 1, 1)
      this.#currentEnds.push(start)
      this.#started = true
    }

    const tempEnds: Vector2D[] = []

    this.#currentEnds.forEach(vector => {
      if (this.pathFound) return

      this.#checkDirection(grid, vector.copy(), Vector2D.add(vector, {x: 0, y: -1}), tempEnds)
      this.#checkDirection(grid, vector.copy(), Vector2D.add(vector, {x: 1, y: 0}), tempEnds)
      this.#checkDirection(grid, vector.copy(), Vector2D.add(vector, {x: 0, y: 1}), tempEnds)
      this.#checkDirection(grid, vector.copy(), Vector2D.add(vector, {x: -1, y: 0}), tempEnds)
    })

    this.#currentEnds = tempEnds
  }

  reset() {
    this.list = new Array2D(this.#size, null)
    this.pathFound = false
    this.#currentEnds.length = 0
    this.#started = false
  }

  #checkDirection(grid: Grid, last: Vector2D, direction: Vector2D, tempEnds: Vector2D[]) {
    const nextPosition = this.#checkPosition(grid, direction)
  
    if (nextPosition === 1) {
      this.list.set(direction.x - 1, direction.y - 1, last)
  
      grid.set(direction.x, direction.y, 4)
      tempEnds.push(direction)
      return
    } else if (nextPosition === 2) {
      console.log('win')
      this.pathFound = true
  
      let counter = 0
  
      let value = last
      while (this.list.get(value.x - 1, value.y - 1) !== 1) {
        counter++
        grid.set(value.x, value.y, 5)
        value = this.list.get(value.x - 1, value.y - 1)
      }
      console.log(counter)
    }
  }

  #checkPosition(grid :Grid, position: Vector2D): number {
    if (
      position.x < 1 || position.x > grid.dimensions.width ||
      position.y < 1 || position.y > grid.dimensions.height
    ) return 0
  
    
    if (grid.get(position.x, position.y).type === 0) return 1
    if (grid.get(position.x, position.y).type === 3) return 2
  
    return 0
  }
}
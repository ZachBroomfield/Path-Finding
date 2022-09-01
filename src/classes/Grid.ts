import GridLine from './GridLine'
import Vector2D from './Vector2D'
import GridBoxes from './GridBoxes'
import State from './State'
import { BoxType } from './Box'

interface Dimensions {
  width: number
  height: number
}

interface Point {
  x: number
  y: number
}

interface ConstructionParams {
  dimensions: Dimensions
  topLeft: Vector2D
  gridLines: GridLine[]
  spacing: number
  coordToPosition: (arg: Point) => Point
  positionToCoord: (arg: Point) => Point | null
}

export default class Grid {
  dimensions: Dimensions
  topLeft: Vector2D
  gridLines: GridLine[]
  boxes: GridBoxes
  spacing: number
  coordToPosition: (arg: Point) => Point
  positionToCoord: (arg: Point) => Point | null

  constructor(params: ConstructionParams) {
    this.dimensions = params.dimensions
    this.topLeft = params.topLeft
    this.gridLines = params.gridLines
    this.spacing = params.spacing
    this.coordToPosition = params.coordToPosition
    this.positionToCoord = params.positionToCoord
    this.boxes = new GridBoxes(this.dimensions) //should this be part of grid factory?
    this.#setStartAndEnd() //should this be part of grid factory?
  }

  drawLines(ctx: CanvasRenderingContext2D) {
    this.#drawGridLines(ctx)
  }

  // getSpacing(): number {
  //   return this.spacing
  // }

  #drawGridLines(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'gray'
    this.gridLines.forEach(line => {
      ctx.beginPath()
      ctx.moveTo(line.start.x, line.start.y)
      ctx.lineTo(line.end.x, line.end.y)
      ctx.stroke()
    })
  }

  drawBoxes(ctx: CanvasRenderingContext2D) {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const box = this.boxes.get(i, j)
        if (box.type > 0) {
          box.draw(
            ctx,
            {
              x: this.topLeft.x + ((i - 1) * this.spacing) + 1,
              y: this.topLeft.y + ((j - 1) * this.spacing) + 1
            },
              this.spacing
          )
        }
      }
    }
  }

  get(x: number, y: number): {type: number} {
    return this.boxes.get(x, y)
  }

  set(x: number, y: number, value: number) {
    this.boxes.set(x, y, value)
  }

  editGrid(state: State) {
    const coord = this.positionToCoord({x: state.mouse.x, y: state.mouse.y})
    if (coord !== null) {
      const box = this.get(coord.x, coord.y)
      if (box.type !== state.drawType && box.type !== 2 && box.type !== 3) {
        if (state.drawType === BoxType.Start) {
          this.#removeOldStart()
        }
        if (state.drawType === BoxType.End) {
          this.#removeOldEnd()
        }
        this.set(coord.x, coord.y, state.drawType)
      }
    }
  }

  clearPath() {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (type === 4 || type === 5) {
          this.set(i, j, 0)
        }
      }
    }
  }

  clearAll() {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (type === 1 || type === 4 || type === 5) {
          this.set(i, j, 0)
        }
      }
    }
  }

  start(): Vector2D {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        if (this.get(i, j).type === BoxType.Start) {
          return new Vector2D(i, j)
        }
      }
    }

    throw "No Start Position"
    // return new Vector2D(1, 1)
  }

  #end(): Vector2D {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        if (this.get(i, j).type === BoxType.End) {
          return new Vector2D(i, j)
        }
      }
    }

    throw "No Start Position"
    // return new Vector2D(1, 1)
  }

  #setStartAndEnd() {
    this.boxes.set(1, 1, 2)
    this.boxes.set(this.dimensions.width, this.dimensions.height, 3)
  }

  #removeOldStart() {
    const oldStart = this.start()
    this.set(oldStart.x, oldStart.y, BoxType.Blank)
  }

  #removeOldEnd() {
    const oldEnd = this.#end()
    this.set(oldEnd.x, oldEnd.y, BoxType.Blank)
  }
}
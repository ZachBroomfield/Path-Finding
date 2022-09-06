import GridLine from './GridLine'
import Vector2D from './Vector2D'
import GridBoxes from './GridBoxes'
import State from './State'
import Box, { BoxType } from './Box'

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
  boxes: GridBoxes
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
  changed: Point[]

  constructor(params: ConstructionParams) {
    this.dimensions = params.dimensions
    this.topLeft = params.topLeft
    this.gridLines = params.gridLines
    this.spacing = params.spacing
    this.boxes = params.boxes
    this.coordToPosition = params.coordToPosition
    this.positionToCoord = params.positionToCoord

    this.changed = []
    this.#setStartAndEnd()
  }

  drawLines(ctx: CanvasRenderingContext2D) {
    this.#drawGridLines(ctx)
  }

  get(x: number, y: number): Box {
    return this.boxes.get(x, y)
  }

  set(x: number, y: number, value: number) {
    this.boxes.set(x, y, value)
    this.changed.push({x, y})
  }

  drawChanged(ctx: CanvasRenderingContext2D) {
    this.changed.forEach(point => {
      const box = this.boxes.get(point.x, point.y)
      box.draw(
        ctx,
        {
          x: this.topLeft.x + ((point.x - 1) * this.spacing) + 1,
          y: this.topLeft.y + ((point.y - 1) * this.spacing) + 1
        },
          this.spacing
      )
    })

    this.changed.length = 0
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

  randomiseBarriers(weighting: number) {
    this.clearAll()
    
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (type === BoxType.Start || type === BoxType.End) continue

        const rand = Math.random()
        if (rand < weighting) {
          this.set(i, j, BoxType.Blank)
        } else {
          this.set(i, j, BoxType.Barrier)
        }
      }
    }
  }

  clearPath() {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (type === BoxType.Path || type === BoxType.Success) {
          this.set(i, j, BoxType.Blank)
        }
      }
    }
  }

  clearAll() {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (
          type === BoxType.Barrier ||
          type === BoxType.Path ||
          type === BoxType.Success
        ) {
          this.set(i, j, BoxType.Blank)
        }
      }
    }
  }

  getStart(): Vector2D {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        if (this.get(i, j).type === BoxType.Start) {
          return new Vector2D(i, j)
        }
      }
    }

    throw "No Start Position"
  }

  resetChanged() {
    this.changed.length = 0
  }

  #drawGridLines(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'gray'
    this.gridLines.forEach(line => {
      ctx.beginPath()
      ctx.moveTo(line.start.x, line.start.y)
      ctx.lineTo(line.end.x, line.end.y)
      ctx.stroke()
    })
  }

  #getEnd(): Vector2D {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        if (this.get(i, j).type === BoxType.End) {
          return new Vector2D(i, j)
        }
      }
    }

    throw "No End Position"
  }

  #setStartAndEnd() {
    const width = this.dimensions.width
    const height = this.dimensions.height

    const startX = Math.min(Math.ceil(width * 0.1), 3)
    const startY = Math.ceil(height / 2)

    this.set(startX, startY, BoxType.Start)

    const endX = width + 1 - Math.min(Math.ceil(width * 0.1), 3)
    const endY = Math.ceil(height / 2)

    this.set(endX, endY, BoxType.End)
  }

  #removeOldStart() {
    const oldStart = this.getStart()
    this.set(oldStart.x, oldStart.y, BoxType.Blank)
  }

  #removeOldEnd() {
    const oldEnd = this.#getEnd()
    this.set(oldEnd.x, oldEnd.y, BoxType.Blank)
  }
}
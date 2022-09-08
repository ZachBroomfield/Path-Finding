import GridLine from './GridLine'
import Vector2D from './Vector2D'
import GridBoxes from './GridBoxes'
import State from './State'
import Box, { BoxTypes } from './Box'
import { Point, Dimensions } from '../utils/Interfaces'

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
    this.#drawChangedBoxes(ctx)
  }

  editGrid(state: State) {
    this.#editGrid(state)
  }

  randomiseBarriers(weighting: number) {
    this.#randomiseBarriers(weighting)
  }

  clearPath() {
    this.#clearPath()
  }

  clearAll() {
    this.#clearAll()
  }

  getStart(): Vector2D {
    return this.#getStart()
  }

  resetChanged() {
    this.changed.length = 0
  }

  // PRIVATE

  #drawGridLines(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'gray'
    ctx.lineWidth = 1
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
        if (this.get(i, j).type === BoxTypes.End) {
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

    this.set(startX, startY, BoxTypes.Start)

    const endX = width + 1 - Math.min(Math.ceil(width * 0.1), 3)
    const endY = Math.ceil(height / 2)

    this.set(endX, endY, BoxTypes.End)
  }

  #removeOldStart() {
    const oldStart = this.getStart()
    this.set(oldStart.x, oldStart.y, BoxTypes.Blank)
  }

  #removeOldEnd() {
    const oldEnd = this.#getEnd()
    this.set(oldEnd.x, oldEnd.y, BoxTypes.Blank)
  }

  #drawChangedBoxes(ctx: CanvasRenderingContext2D) {
    this.changed.forEach(point => {
      const box = this.boxes.get(point.x, point.y)
      box.draw(
        ctx,
        {
          x: this.topLeft.x + ((point.x - 1) * this.spacing) + 1,
          y: this.topLeft.y + ((point.y - 1) * this.spacing) + 1
        },
          this.spacing - 2
      )
    })

    this.changed.length = 0
  }

  #editGrid(state: State) {
    const coord = this.positionToCoord({x: state.mouse.x, y: state.mouse.y})
    if (coord !== null) {
      const box = this.get(coord.x, coord.y)
      if (box.type !== state.drawType && box.type !== 2 && box.type !== 3) {
        if (state.drawType === BoxTypes.Start) {
          this.#removeOldStart()
        }
        if (state.drawType === BoxTypes.End) {
          this.#removeOldEnd()
        }
        this.set(coord.x, coord.y, state.drawType)
      }
    }
  }

  #randomiseBarriers(weighting: number) {
    this.clearAll()
    
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (type === BoxTypes.Start || type === BoxTypes.End) continue

        const rand = Math.random()
        if (rand < weighting) {
          this.set(i, j, BoxTypes.Blank)
        } else {
          this.set(i, j, BoxTypes.Barrier)
        }
      }
    }
  }

  #clearPath() {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (type === BoxTypes.Path || type === BoxTypes.Success) {
          this.set(i, j, BoxTypes.Blank)
        }
      }
    }
  }

  #clearAll() {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        const type = this.get(i, j).type
        if (
          type === BoxTypes.Barrier ||
          type === BoxTypes.Path ||
          type === BoxTypes.Success
        ) {
          this.set(i, j, BoxTypes.Blank)
        }
      }
    }
  }

  #getStart(): Vector2D {
    for (let i = 1; i <= this.dimensions.width; i++) {
      for (let j = 1; j <= this.dimensions.height; j++) {
        if (this.get(i, j).type === BoxTypes.Start) {
          return new Vector2D(i, j)
        }
      }
    }

    throw "No Start Position"
  }
}
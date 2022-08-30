import GridLine from './GridLine'
import Vector2D from './Vector2D'
import GridBoxes from './GridBoxes'

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
          ctx.beginPath()
          ctx.lineWidth = 0
          ctx.fillStyle = box.getColour()
          ctx.fillRect(
            this.topLeft.x + ((i - 1) * this.spacing) + 1,
            this.topLeft.y + ((j - 1) * this.spacing) + 1,
            this.spacing - 2,
            this.spacing - 2
          )
        }
      }
    }
  }

  // toggleBox(position: Point) {
  //   const coord = this.positionToCoord(position)
  //   if (coord !== null) {
  //     this.boxes.toggle(coord.x, coord.y)
  //   }
  // }

  get(x: number, y: number): {type: number} {
    return this.boxes.get(x, y)
  }

  set(x: number, y: number, value: number) {
    this.boxes.set(x, y, value)
  }

  #setStartAndEnd() {
    this.boxes.set(1, 1, 2)
    this.boxes.set(this.dimensions.width, this.dimensions.height, 3)
  }
}
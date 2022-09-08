import { Point } from '../utils/Interfaces'

export enum BoxTypes {
  Blank = 0,
  Barrier,
  Start,
  End,
  Path,
  Success
}

export default class Box {
  type: BoxTypes

  constructor(type: BoxTypes = BoxTypes.Blank) {
    this.type = type
  }

  draw(ctx: CanvasRenderingContext2D, topLeft: Point, spacing: number) {
    ctx.beginPath()
    ctx.lineWidth = 0
    ctx.fillStyle = this.#getColour()
    ctx.fillRect(
      topLeft.x,
      topLeft.y,
      spacing,
      spacing
    )
    ctx.stroke()
  }

  #getColour(): string {
    switch(this.type) {
      case(BoxTypes.Start):
        return 'green'

      case(BoxTypes.End):
        return 'red'

      case(BoxTypes.Path):
        return 'blue'

      case(BoxTypes.Success):
        return 'gold'

      case(BoxTypes.Blank):
        return 'lightgray'
        
      default:
        return 'black'
    }
  }
}
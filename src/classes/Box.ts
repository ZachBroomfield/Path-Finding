export enum BoxType {
  Blank,
  Barrier,
  Start,
  End,
  Path,
  Success
}

interface Point {
  x: number
  y: number
}

export default class Box {
  type: BoxType

  constructor(type: BoxType = BoxType.Blank) {
    this.type = type
  }

  draw(ctx: CanvasRenderingContext2D, topLeft: Point, spacing: number) {
    ctx.beginPath()
    ctx.lineWidth = 0
    ctx.fillStyle = this.getColour()
    ctx.fillRect(
      topLeft.x,
      topLeft.y,
      spacing - 2,
      spacing - 2
    )
    ctx.stroke()
  }

  getColour(): string {
    switch(this.type) {
      case(BoxType.Start):
        return 'green'

      case(BoxType.End):
        return 'red'

      case(BoxType.Path):
        return 'blue'

      case(BoxType.Success):
        return 'gold'

      case(BoxType.Blank):
        return 'lightgray'
        
      default:
        return 'black'
    }
  }
}
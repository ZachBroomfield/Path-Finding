export enum BoxType {
  Blank,
  Barrier,
  Start,
  End,
  Path,
  Success
}

export default class Box {
  type: BoxType

  constructor(type: BoxType = BoxType.Blank) {
    this.type = type
  }

  draw(ctx: CanvasRenderingContext2D, topLeft: {x: number, y: number}, spacing: number) {
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
        break
      case(BoxType.End):
        return 'red'
        break
      case(BoxType.Path):
        return 'blue'
        break
      case(BoxType.Success):
        return 'gold'
        break
      default:
        return 'black'
    }
  }
}
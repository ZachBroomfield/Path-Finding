import Vector2D from './Vector2D'

interface Dimensions {
  width: number
  height: number
}


interface Params {
  size: Dimensions
  position: Vector2D
  text: string
  fillColour: string
  strokeColour?: string
  selected: boolean
  action: () => void
  update: () => void
}

export default class Button {
  size: Dimensions
  position: Vector2D
  text: string
  fillColour: string
  strokeColour: string
  selected: boolean
  action: () => void
  update: () => void

  constructor(params: Params) {
    this.size = params.size
    this.position = params.position
    this.text = params.text
    this.fillColour = params.fillColour
    this.selected = params.selected
    this.action = params.action
    this.update = params.update

    this.strokeColour = 'black'

    this.update()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = this.fillColour
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
    ctx.stroke()

    ctx.lineWidth = 2
    ctx.strokeStyle = this.strokeColour
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
    ctx.stroke()
    
    ctx.font = '30px Arial'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText(
      this.text,
      this.position.x + (this.size.width / 2),
      this.position.y + (this.size.height * 0.7)
    )
  }

  checkClick(mouse: {x: number, y: number}) {
    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size.width &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size.height
      ) {
        this.action()
      }
  }
}
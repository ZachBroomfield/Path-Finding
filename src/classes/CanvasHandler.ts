import Vector2D from './Vector2D'

interface Dimensions {
  width: number
  height: number
}

interface Construction {
  dimensions: Dimensions
  id: string
}

export default class CanvasHandler {
  canvas :HTMLCanvasElement
  ctx :CanvasRenderingContext2D

  constructor(params: Construction) {
    this.canvas = document.getElementById(params.id) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.#setCanvasSize({
      width: params.dimensions.width,
      height: params.dimensions.height
    })
  }

  getCtx(): CanvasRenderingContext2D {
    return this.ctx
  }

  getMidPoint(): Vector2D {
    return new Vector2D({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    })
  }

  getDimensions() :Dimensions {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  #setCanvasSize(dimensions: Dimensions) {
    this.canvas.height = dimensions.height
    this.canvas.width = dimensions.width
  }
}
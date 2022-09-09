import Vector2D from './Vector2D'
import { Size } from '../utils/Interfaces'

interface Construction {
  size: Size
  id: string
}

export default class CanvasHandler {
  #canvas :HTMLCanvasElement
  #ctx :CanvasRenderingContext2D

  constructor(params: Construction) {
    this.#canvas = document.getElementById(params.id) as HTMLCanvasElement
    this.#ctx = this.#canvas.getContext('2d') as CanvasRenderingContext2D

    this.#setCanvasSize({
      width: params.size.width,
      height: params.size.height
    })
  }

  getCtx(): CanvasRenderingContext2D {
    return this.#ctx
  }

  getMidPoint(): Vector2D {
    return new Vector2D({
      x: this.#canvas.width / 2,
      y: this.#canvas.height / 2
    })
  }

  getSize() :Size {
    return {
      width: this.#canvas.width,
      height: this.#canvas.height
    }
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  #setCanvasSize(size: Size) {
    this.#canvas.height = size.height
    this.#canvas.width = size.width
  }
}
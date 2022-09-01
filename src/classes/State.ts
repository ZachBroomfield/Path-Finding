import { BoxType } from './Box'

export default class State {
  mouse: {
    x: number
    y: number
    leftClick: boolean
  }
  drawType: BoxType
  createPath: boolean
  frame: number
  resetPath: boolean
  resetAll: boolean

  
  constructor() {
    this.mouse = {
      x: 0,
      y: 0,
      leftClick: false
    }
    this.drawType = BoxType.Blank
    this.createPath = false
    this.frame = 0
    this.resetPath = false
    this.resetAll = false
  }

  updateMousePosition(e :MouseEvent) {
    this.mouse.x = e.clientX
    this.mouse.y = e.clientY
  }

  incrementFrame() {
    this.frame++
  }
}
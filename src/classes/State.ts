import { BoxTypes } from './Box'

export default class State {
  mouse: {
    x: number
    y: number
    leftClick: boolean
  }
  grid: {
    width: number
    height: number
    changed: boolean
  }

  drawType: BoxTypes
  createPath: boolean
  frame: number
  resetPath: boolean
  resetAll: boolean
  randomise: boolean
  diagonals: boolean

  
  constructor({width, height}: {width: number, height: number}) {
    this.mouse = {
      x: 0,
      y: 0,
      leftClick: false
    }
    this.grid = {
      width: width,
      height: height,
      changed: false
    }
    this.drawType = BoxTypes.Blank
    this.createPath = false
    this.frame = 0
    this.resetPath = false
    this.resetAll = false
    this.randomise = false
    this.diagonals = false
  }

  updateMousePosition(e :MouseEvent) {
    this.mouse.x = e.clientX
    this.mouse.y = e.clientY
  }

  incrementFrame() {
    this.frame++
  }
}
import { BoxTypes } from './Box'
import { Dimensions } from '../utils/Interfaces'

export default class State {
  mouse: {
    x: number
    y: number
    leftClick: boolean
  }
  grid: {
    cols: number
    rows: number
    changed: boolean
  }
  drawType: BoxTypes
  createPath: boolean
  frame: number
  resetPath: boolean
  resetAll: boolean
  randomise: boolean
  diagonals: boolean

  
  constructor({cols, rows}: Dimensions) {
    this.mouse = {
      x: 0,
      y: 0,
      leftClick: false
    }
    this.grid = {
      cols: cols,
      rows: rows,
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
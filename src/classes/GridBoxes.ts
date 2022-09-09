import Array2D from './Array2D'
import Box from './Box'
import { Dimensions } from '../utils/Interfaces'

export default class GridBoxes {
  #boxes: Array2D<Box>

  constructor(dimensions: Dimensions) {
    this.#boxes = new Array2D(dimensions, new Box)
  }

  get(x: number, y: number): Box {
    return this.#boxes.get(x - 1, y - 1)
  }

  set(x: number, y: number, value: number ) {
    this.#boxes.set(x - 1, y - 1, new Box(value))
  }
}
import { Dimensions } from '../utils/Interfaces'

export default class Array2D<type> {
  values: type[]
  size: Dimensions

  constructor(size: Dimensions, initialValue: type) {
    this.values = new Array(size.width * size.height)
    this.size = size

    this.#setInitialValues(initialValue)
  }

  get(x: number, y: number): type {
    return this.values[x + (y * this.size.width)]
  }

  set(x: number, y: number, value: type) {
    this.values[x + (y * this.size.width)] = value
  }

  #setInitialValues(initialValue: type) {
    for (let i = 0; i < this.size.width * this.size.height; i++) {
      this.values[i] = initialValue
    }
  }

}
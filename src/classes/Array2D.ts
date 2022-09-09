import { Dimensions } from '../utils/Interfaces'

export default class Array2D<type> {
  #values: type[]
  #dimensions: Dimensions

  constructor(dimensions: Dimensions, initialValue: type) {
    this.#values = new Array(dimensions.cols * dimensions.rows)
    this.#dimensions = dimensions

    this.#setInitialValues(initialValue)
  }

  get(x: number, y: number): type {
    return this.#values[x + (y * this.#dimensions.cols)]
  }

  set(x: number, y: number, value: type) {
    this.#values[x + (y * this.#dimensions.cols)] = value
  }

  #setInitialValues(initialValue: type) {
    for (let i = 0; i < this.#dimensions.cols * this.#dimensions.rows; i++) {
      this.#values[i] = initialValue
    }
  }

}
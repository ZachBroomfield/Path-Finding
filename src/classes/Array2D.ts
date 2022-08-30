interface Dimensions {
  width: number
  height: number
}

export default class Array2D {
  values: any[]
  width: number
  height: number

  constructor(size: Dimensions, initialValue: any) {
    this.values = new Array(size.width * size.height)
    this.width = size.width
    this.height = size.height

    this.#setInitialValues(initialValue)
  }

  get(x: number, y: number) {
    return this.values[x + (y * this.width)]
  }

  set(x: number, y: number, value: any) {
    this.values[x + (y * this.width)] = value
  }

  #setInitialValues(initialValue: any) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.set(i, j, initialValue)
      }
    }
  }

}
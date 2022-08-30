import Vector2D from './Vector2D'

export default class VectorList {
  value: Vector2D
  lastNode: VectorList | null
  

  constructor(value: Vector2D, lastNode: VectorList | null = null) {
    this.value = value
    this.lastNode = lastNode
  }
}
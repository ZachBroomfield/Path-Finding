import Vector2D from './Vector2D'

export default class VectorNode {
  value: Vector2D
  lastNode: VectorNode | null
  numDescendants: number
  end: boolean
  

  constructor(value: Vector2D, lastNode: VectorNode | null) {
    this.value = value
    this.lastNode = lastNode
    this.end = true
    this.numDescendants = 0

    this.lastNode?.addDescendant()
  }

  addDescendant() {
    this.numDescendants += 1
    this.end = false
  }

  removeDescendant() {
    this.numDescendants -= 1
  }

  delete() {
    this.lastNode?.removeDescendant()
  }
}
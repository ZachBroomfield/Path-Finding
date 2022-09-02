import Grid from './Grid'
import Vector2D from './Vector2D'
import VectorNode from './VectorNode'

export default class VectorLinkedList {
  list: VectorNode[]
  pathFound: boolean

  constructor() {
    this.list = []
    this.pathFound = false
  }


  createNextStep(grid: Grid) {
    if (this.list.length === 0) {
      this.list.push(new VectorNode(grid.start(), null))
    }
    this.list.forEach(node => {
      if (!node.end || this.pathFound) return
  
      this.#checkDirection(grid, node, Vector2D.add(node.value, {x: 0, y: -1}))
      this.#checkDirection(grid, node, Vector2D.add(node.value, {x: 1, y: 0}))
      this.#checkDirection(grid, node, Vector2D.add(node.value, {x: 0, y: 1}))
      this.#checkDirection(grid, node, Vector2D.add(node.value, {x: -1, y: 0}))
      
      node.end = false
    })

    this.#trimList()
  }

  reset() {
    this.list.length = 0
    this.pathFound = false
  }

  #trimList() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      if (!this.list[i].end && this.list[i].numDescendants === 0) {
        this.list[i].delete()
        this.list.splice(i, 1)
      }
    }
  }

  #checkDirection(grid: Grid, lastNode: VectorNode, direction: Vector2D) {
  
    const nextPosition = this.#checkPosition(grid, direction)
  
    if (nextPosition === 1) {
      this.list.push(new VectorNode(direction, lastNode))
  
      grid.set(direction.x, direction.y, 4)
      return
    } else if (nextPosition === 2) {
      console.log('win')
      this.pathFound = true
  
      let counter = 0
  
      while (lastNode.lastNode !== null) {
        counter++
        grid.set(lastNode.value.x, lastNode.value.y, 5)
        lastNode = lastNode.lastNode
      }
      console.log(counter)
    }
  }

  #checkPosition(grid :Grid, position: Vector2D): number {
    if (
      position.x < 1 || position.x > grid.dimensions.width ||
      position.y < 1 || position.y > grid.dimensions.height
    ) return 0
  
    
    if (grid.get(position.x, position.y).type === 0) return 1
    if (grid.get(position.x, position.y).type === 3) return 2
  
    return 0
  }



}
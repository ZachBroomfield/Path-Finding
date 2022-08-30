import CanvasHandler from './classes/CanvasHandler'
import GridFactory from './classes/GridFactory'
import MouseState from './classes/MouseState'
import Vector2D from './classes/Vector2D'

const canvasHandler = new CanvasHandler({
  dimensions: {
    height: innerHeight,
    width: innerWidth
  },
  id: "canvas"
})

const grid = GridFactory.create({
  dimensions: {
    width: 20,
    height: 20
  },
  canvasSize: canvasHandler.getDimensions()
})

const mouse = new MouseState

const currentStates = {
  draw: 0,
  createPaths: false
}

const paths: Vector2D[][] = []
const tempPaths: Vector2D[][] = []

paths.push([new Vector2D({x: 1, y: 1})])


function animate() :void {
  canvasHandler.clear()

  if (mouse.down) {
    editBoxes()
  }

  if (currentStates.createPaths) {
    createNextStep()
    console.log(paths)
    currentStates.createPaths = false
  }

  grid.drawLines(canvasHandler.getCtx())
  grid.drawBoxes(canvasHandler.getCtx())

  requestAnimationFrame(animate)
}

function editBoxes() {
  const coord = grid.positionToCoord({x: mouse.x, y: mouse.y})
  if (coord !== null) {
    const box = grid.get(coord.x, coord.y)
    if (box.type !== currentStates.draw && box.type !== 2 && box.type !== 3) {
      grid.set(coord.x, coord.y, currentStates.draw)
    }
  }
}

function createNextStep() {
  paths.forEach(path1 => {
    const path2 = [...path1]
    const path3 = [...path1]
    const path4 = [...path1]

    checkDirection(path1, new Vector2D({x: 0, y: -1}))
    if (checkDirection(path2, new Vector2D({x: 1, y: 0}))) tempPaths.push(path2)
    if (checkDirection(path3, new Vector2D({x: 0, y: 1}))) tempPaths.push(path3)
    if (checkDirection(path4, new Vector2D({x: -1, y: 0}))) tempPaths.push(path4)
  })

  paths.push(...tempPaths)
  tempPaths.length = 0
}

function checkDirection(path: Vector2D[], direction: Vector2D): boolean {
  const last = path[path.length - 1].copy()
  const next = last.add(direction)

  if (checkPosition(next)) {
    path.push(next)
    grid.set(next.x, next.y, 4)
    return true
  }

  return false
}

function checkPosition(position: Vector2D): boolean {
  if (
    position.x < 1 || position.x > grid.dimensions.width ||
    position.y < 1 || position.y > grid.dimensions.height
  ) return false
  
  return grid.get(position.x, position.y).type === 0
}

animate()



// each loop
/* for each result, evaluate each 4 directions
*/


document.addEventListener('mousedown', () => {
  let coord = grid.positionToCoord({x: mouse.x, y: mouse.y})
  if (coord !== null) {
    mouse.down = true
    currentStates.draw = grid.get(coord.x, coord.y).type === 0 ? 1 : 0
  }
})

document.addEventListener('mouseup', () => {
  mouse.down = false
})

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})

document.addEventListener('keypress', e => {
  if (e.key === ' ') {
    // results = []
    // startPathFind()

    currentStates.createPaths = !currentStates.createPaths
  }
})





// let results :Vector2D[][] = []

// function startPathFind() {
//   const start = new Vector2D({x: 1, y: 1})
//   const path :Vector2D[] = []

//   findPath(start, path)
  
//   if (results.length === 0) {
//     console.log("No result found")
//   } else {
//     console.log(results)
//     const best = results.reduce((a, b) => a.length <= b.length ? a : b)
//     best.forEach(point => {
//       if (point.same(start) || point.same({x: grid.dimensions.width, y: grid.dimensions.height})) return
//       grid.set(point.x, point.y, 5)
//     })
//   }
  

//   // const pointer = new Vector2D({x: 1, y: 1})
//   // while (grid.get(pointer.x + 1, pointer.y + 1).type === 0) {
//   //   pointer.x += 1
//   //   pointer.y += 1

//   //   if (grid.get(pointer.x, pointer.y).type === 3) {
//   //     console.log("WIN")
//   //   }

//   //   grid.set(pointer.x, pointer.y, 4)
//   // }
// }

// function findPath(pointer: Vector2D, path: Vector2D[]) {
//   // outside of grid
//   if (pointer.x < 1 || pointer.x > grid.dimensions.width) return
//   if (pointer.y < 1 || pointer.y > grid.dimensions.height) return

//   const currentType = grid.get(pointer.x, pointer.y).type
//   // barrier
//   if (currentType === 1) return

//   // // already in path
//   // let temp = false
//   // path.forEach(point => {
//   //   if (point.same(pointer)) {
//   //     temp = true
//   //   }
//   // })
//   // if (temp) return

//   // path
//   if (currentType === 4) return

//   path.push(pointer)


//   //
//   if (currentType === 3) {
    
//     results.push(path)
//     return
//   } else {
//     if (currentType !== 2) grid.set(pointer.x, pointer.y, 4)

//     findPath(Vector2D.add(pointer, {x: 0, y: 1}), [...path])
//     findPath(Vector2D.add(pointer, {x: 1, y: 0}), [...path])
//     findPath(Vector2D.add(pointer, {x: 0, y: -1}), [...path])
//     findPath(Vector2D.add(pointer, {x: -1, y: 0}), [...path])
//   }
// }
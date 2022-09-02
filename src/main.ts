import Button from './classes/Button'
import ButtonSetup from './classes/ButtonSetup'
import CanvasHandler from './classes/CanvasHandler'
import GridFactory from './classes/GridFactory'
import State from './classes/State'

//both breadth first searching
import VectorArray from './classes/VectorArray'
// import VectorLinkedList from './classes/VectorLinkedList'

//todo: implement different pathfinding algorithms
//      make drawing squares more efficient 

const canvasHandler = new CanvasHandler({
  dimensions: {
    height: innerHeight,
    width: innerWidth
  },
  id: "canvas"
})

const grid = GridFactory.create({
  dimensions: {
    width: 50,
    height: 30
  },
  canvasSize: {
    width: canvasHandler.getDimensions().width - 250,
    height: canvasHandler.getDimensions().height
  }
})

const state = new State
const list = new VectorArray(grid.dimensions)
// const list = new VectorLinkedList

const buttons: Button[] = ButtonSetup.setup(canvasHandler.getDimensions(), state)

function animate() {

  if (state.mouse.leftClick && !state.createPath && !list.pathFound) {
    grid.editGrid(state)
  }

  if (state.resetPath) {
    grid.clearPath()
    resetList()
    state.resetPath = false
  }

  if (state.resetAll) {
    grid.clearAll()
    resetList()
    state.resetAll = false
  }

  if (state.frame % 5 === 0) {
    canvasHandler.clear()

    if (state.createPath) {
      if (list.pathFound) {
        state.createPath = false
        buttons.forEach(button => {
          button.update()
        })
      } else {
        list.createNextStep(grid)
      }
      
      // state.createPath = false
    }
  
    grid.drawLines(canvasHandler.getCtx())
    grid.drawBoxes(canvasHandler.getCtx())
  
    buttons.forEach(button => {
      button.draw(canvasHandler.getCtx())
    })
  }

  state.incrementFrame()

  requestAnimationFrame(animate)
}

function resetList() {
  list.reset()
  state.createPath = false
  buttons.forEach(button => {
    button.update()
  })
}

function handleMouseClick() {
  let coord = grid.positionToCoord(state.mouse)
  if (coord !== null) {
    state.mouse.leftClick = true
  } else {
    buttons.forEach(button => {
      button.checkClick(state.mouse)
    })
  }
}

animate()

document.addEventListener('mousedown', () => {
  handleMouseClick()
})

document.addEventListener('mouseup', () => {
  state.mouse.leftClick = false
})

document.addEventListener('mousemove', e => {
  state.updateMousePosition(e)
})

// document.addEventListener('keypress', e => {
//   // debug only
//   if (e.key === 'd') {
//     console.log(list.list)
//   }
// })
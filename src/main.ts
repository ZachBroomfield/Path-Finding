import Button from './classes/Button'
import ButtonSetup from './classes/ButtonSetup'
import CanvasHandler from './classes/CanvasHandler'
import GridFactory from './classes/GridFactory'
import State from './classes/State'
import VectorArray2D from './classes/VectorArray2D'

const canvasHandler = new CanvasHandler({
  dimensions: {
    height: innerHeight,
    width: innerWidth
  },
  id: "canvas"
})

const grid = GridFactory.create({
  dimensions: {
    width: 30,
    height: 20
  },
  canvasSize: {
    width: canvasHandler.getDimensions().width - 250,
    height: canvasHandler.getDimensions().height
  }
})

const state = new State
const list = new VectorArray2D(grid.dimensions)

const buttons: Button[] =
  ButtonSetup.setup(canvasHandler.getDimensions(), state)

function initialDraw() {
  grid.drawLines(canvasHandler.getCtx())
  buttons.forEach(button => {
    button.draw(canvasHandler.getCtx())
  })
}

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

    if (state.createPath) {
      if (list.pathFound) {
        state.createPath = false
        buttons.forEach(button => {
          button.update()
        })
      } else {
        list.createNextStep(grid)
      }
    }

    grid.drawChanged(canvasHandler.getCtx())
  
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

initialDraw()
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

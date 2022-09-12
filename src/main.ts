import CanvasHandler from './classes/CanvasHandler'
import Grid from './classes/Grid'
import GridFactory from './classes/GridFactory'
import State from './classes/State'
import Path2D from './classes/Path2D'
import ButtonHandler from './classes/ButtonHandler'
import { addEventListeners } from './utils/EventListenerHandler'

const canvasHandler = new CanvasHandler({
  size: {
    height: innerHeight,
    width: innerWidth
  },
  id: 'canvas'
})

const state = new State()

const grid = GridFactory.create({
  dimensions: {
    cols: 150,
    rows: 90
  },
  canvasSize: {
    width: canvasHandler.getSize().width - 250,
    height: canvasHandler.getSize().height
  }
})

const path = new Path2D(grid.getDimensions())

const buttonHandler = new ButtonHandler(canvasHandler.getSize(), state)
  
function initialDraw() {
  canvasHandler.clear()
  grid.drawLines(canvasHandler.getCtx())
}

function animate() {

  if (state.randomise) {
    const weighting = state.diagonals ? 0.44 : 0.62
    resetList()
    grid.randomiseBarriers(weighting)

    while (!checkValidSolution(grid)) {
      path.reset()
      grid.resetChanged()
      grid.randomiseBarriers(weighting)
    }

    state.randomise = false
    state.resetPath = true
  }

  if (state.mouse.leftClick && !state.createPath && !path.pathFound()) {
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

  // only search next step if frame is multiple of 5
  // reduces drawing speed of path for asthetics
  if (state.frame % 5 === 0) {

    if (state.createPath) {
      if (path.pathFound()) {
        state.createPath = false
        buttonHandler.updateButtons()
      } else {
        path.createNextStep(grid, state.diagonals)
      }
    }

    grid.drawChanged(canvasHandler.getCtx())
  
    buttonHandler.drawButtons(canvasHandler.getCtx())
  }

  state.incrementFrame()
  requestAnimationFrame(animate)
}

function resetList() {
  path.reset()
  state.createPath = false
  buttonHandler.updateButtons()
}

function handleMouseClick() {
  let coord = grid.positionToCoord(state.mouse)
  if (coord !== null) {
    state.mouse.leftClick = true
  } else {
    buttonHandler.checkClick(state.mouse)
  }
}

function checkValidSolution(grid: Grid) {
  state.createPath = true

  while(!path.pathFound()) {
    path.createNextStep(grid, state.diagonals)
    
    if (path.noPath()) return false
  }
  state.createPath = false

  return true
}

addEventListeners(state, handleMouseClick)
initialDraw()
animate()

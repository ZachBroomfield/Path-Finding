import CanvasHandler from './classes/CanvasHandler'
import Grid from './classes/Grid'
import GridFactory from './classes/GridFactory'
import State from './classes/State'
import Path2D from './classes/Path2D'
import ButtonHandler from './classes/ButtonHandler'

const canvasHandler = new CanvasHandler({
  dimensions: {
    height: innerHeight,
    width: innerWidth
  },
  id: "canvas"
})

const state = new State({width: 150, height: 90})

let grid = GridFactory.create({
  dimensions: {
    width: state.grid.width,
    height: state.grid.height
  },
  canvasSize: {
    width: canvasHandler.getDimensions().width - 250,
    height: canvasHandler.getDimensions().height
  }
})

let path = new Path2D(grid.dimensions)

const buttonHandler = new ButtonHandler(canvasHandler.getDimensions(), state)
  
function initialDraw() {
  canvasHandler.clear()
  grid.drawLines(canvasHandler.getCtx())
}

function animate() {

  if (state.grid.changed) {
    grid = GridFactory.create({
      dimensions: {
        width: state.grid.width,
        height: state.grid.height
      },
      canvasSize: {
        width: canvasHandler.getDimensions().width - 250,
        height: canvasHandler.getDimensions().height
      }
    })

    path = new Path2D(grid.dimensions)
    state.grid.changed = false
    initialDraw()
    buttonHandler.drawButtons(canvasHandler.getCtx())
  }

  if (state.randomise) {
    const weighting = state.diagonals ? 0.41 : 0.59
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

  if (state.mouse.leftClick && !state.createPath && !path.pathFound) {
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
      if (path.pathFound) {
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

  while(!path.pathFound) {
    path.createNextStep(grid, state.diagonals)
    
    if (path.noPath()) return false 
  }
  state.createPath = false

  return true
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

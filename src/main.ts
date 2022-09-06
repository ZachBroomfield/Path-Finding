import Button from './classes/Button'
import ButtonSetup from './classes/ButtonSetup'
import CanvasHandler from './classes/CanvasHandler'
import Grid from './classes/Grid'
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
    width: 150,
    height: 90
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
}

function animate() {

  if (state.randomise) {
    const weighting = state.diagonals ? 0.41 : 0.59
    const timeOne = Date.now()
    resetList()
    grid.randomiseBarriers(weighting)

    while (!checkValidSolution(grid)) {
      list.reset()
      grid.resetChanged()
      grid.randomiseBarriers(weighting)
    }

    state.randomise = false

    // uncomment to NOT draw when path is found
    // state.resetPath = true
    const timeTwo = Date.now()

    console.log(timeTwo - timeOne)
  }

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
        list.createNextStep(grid, state.diagonals)
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


function checkValidSolution(grid: Grid) {
  state.createPath = true

  while(!list.pathFound) {
    list.createNextStep(grid, state.diagonals)
    
    if (list.noPath()) return false 
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

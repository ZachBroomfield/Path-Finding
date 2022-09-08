import { Dimensions } from '../utils/Interfaces'
import Button from './Button'
import ButtonSetup from './ButtonSetup'
import State from './State'

export default class ButtonHandler {
  buttons: Button[]

  constructor(canvasDimensions: Dimensions, state: State) {
    this.buttons = ButtonSetup.setup(canvasDimensions, state)
  }

  updateButtons() {
    this.buttons.forEach(button => {
      button.update()
    })
  }

  drawButtons(ctx: CanvasRenderingContext2D) {
    this.buttons.forEach(button => {
      button.draw(ctx)
    })
  }

  checkClick(mouse: State['mouse']) {
    this.buttons.forEach(button => {
      button.checkClick(mouse)
    })
  }
}
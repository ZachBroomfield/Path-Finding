import Button from './Button'
import ButtonSetup from './ButtonSetup'
import State from './State'
import { Size } from '../utils/Interfaces'

export default class ButtonHandler {
  #buttons: Button[]

  constructor(canvasSize: Size, state: State) {
    this.#buttons = ButtonSetup.setup(canvasSize, state)
  }

  updateButtons() {
    this.#buttons.forEach(button => {
      button.update()
    })
  }

  drawButtons(ctx: CanvasRenderingContext2D) {
    this.#buttons.forEach(button => {
      button.draw(ctx)
    })
  }

  checkClick(mouse: State['mouse']) {
    this.#buttons.forEach(button => {
      button.checkClick(mouse)
    })
  }
}
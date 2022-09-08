import { BoxTypes } from './Box'
import Button from './Button'
import State from './State'
import Vector2D from './Vector2D'
import { Dimensions } from '../utils/Interfaces'

export default class ButtonSetup {
  static buttonHeight = 50
  static buttonWidth = 200
  static offset = 10

  static setup(canvasDimensions: Dimensions, state: State): Button[] {
    const buttons: Button[] = []

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Begin',
        fillColour: 'gray',
        selected: false,
        action: function() {
          state.createPath = !state.createPath
          this.update()
        },
        update: function() {
          if (state.createPath) {
            this.text = 'Pause'
            this.strokeColour = 'white'
            this.fillColour = 'darkgray'
          } else {
            this.text = 'Begin'
            this.strokeColour = 'black'
            this.fillColour = 'gray'
          }
        }
      })
    )
    
    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Clear Path',
        fillColour: 'gray',
        selected: false,
        action: function() {
          state.resetPath = true
        },
        update: function() {
          null
        }
      })
    )
    
    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Clear All',
        fillColour: 'gray',
        selected: false,
        action: function() {
          state.resetAll = true
        },
        update: function() {
          null
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Place Start',
        fillColour: 'green',
        selected: true,
        action: function() {
          this.selected = true
          state.drawType = BoxTypes.Start
          this.update()
        },
        update: function() {
          this.strokeColour = this.selected ? 'white' : 'black'
          this.fillColour = this.selected ? 'lightgreen' : 'green'

          if(this.selected) {
            buttons.forEach(button => {
              if (this !== button) {
                button.selected = false
                button.update()
              }
            })
          }
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Place End',
        fillColour: 'red',
        selected: false,
        action: function() {
          this.selected = true
          state.drawType = BoxTypes.End
          this.update()
        },
        update: function() {
          this.strokeColour = this.selected ? 'white' : 'black'
          this.fillColour = this.selected ? '#FF6060' : 'red'

          if(this.selected) {
            buttons.forEach(button => {
              if (this !== button) {
                button.selected = false
                button.update()
              }
            })
          }
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Draw Barriers',
        fillColour: 'gray',
        selected: false,
        action: function() {
          this.selected = true
          state.drawType = BoxTypes.Barrier
          this.update()
        },
        update: function() {
          this.strokeColour = this.selected ? 'white' : 'black'
          this.fillColour = this.selected ? 'darkgray' : 'gray'

          if(this.selected) {
            buttons.forEach(button => {
              if (this !== button) {
                button.selected = false
                button.update()
              }
            })
          }
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Erase Barriers',
        fillColour: 'gray',
        selected: false,
        action: function() {
          this.selected = true
          state.drawType = BoxTypes.Blank
          this.update()
        },
        update: function() {
          this.strokeColour = this.selected ? 'white' : 'black'
          this.fillColour = this.selected ? 'darkgray' : 'gray'

          if(this.selected) {
            buttons.forEach(button => {
              if (this !== button) {
                button.selected = false
                button.update()
              }
            })
          }
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Randomise',
        fillColour: 'gray',
        selected: false,
        action: function() {
          state.randomise = true
        },
        update: function() {
          null
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Diagonals',
        fillColour: 'gray',
        selected: false,
        action: function() {
          state.diagonals = !state.diagonals
          this.update()
        },
        update: function() {
          if (state.diagonals) {
            this.strokeColour = 'white'
            this.fillColour = 'darkgray'
          } else {
            this.strokeColour = 'black'
            this.fillColour = 'gray'
          }
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: 'Size',
        fillColour: 'gray',
        selected: false,
        action: function() {
          null
        },
        update: function() {
          null
        }
      })
    )

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: 0
        }),
        text: `-  ${state.grid.width}x${state.grid.height}  +`,
        fillColour: 'gray',
        selected: false,
        action: function() {
          if (state.mouse.x >= this.position.x + (this.size.width / 2)) {
            if (state.grid.width < 300) {
              state.grid.width += 15
              state.grid.height += 9
              state.grid.changed = true
            }
          } else {
            if (state.grid.width > 15) {
              state.grid.width -= 15
              state.grid.height -= 9
              state.grid.changed = true
            }
          }
          this.update()
        },
        update: function() {
          this.text = `-  ${state.grid.width}x${state.grid.height}  +`
        }
      })
    )

    this.#setHeights(buttons, canvasDimensions)

    return buttons
  }

  static #setHeights(buttons: Button[], canvasDimensions: Dimensions) {
    const midHeight = Math.floor(canvasDimensions.height / 2)
    const halfAmount = buttons.length / 2
    const totalDist = ButtonSetup.buttonHeight + ButtonSetup.offset

    buttons.forEach((button, index) => {
      button.position.y = midHeight - (halfAmount - index) * totalDist
    })
  }
}
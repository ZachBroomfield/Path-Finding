import { BoxTypes } from './Box'
import Button from './Button'
import State from './State'
import Vector2D from './Vector2D'
import { Size } from '../utils/Interfaces'

export default class ButtonSetup {
  static buttonHeight = 50
  static buttonWidth = 200
  static offset = 10

  static setup(canvasSize: Size, state: State): Button[] {
    const buttons: Button[] = []

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasSize.width - 240,
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
          x: canvasSize.width - 240,
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
          x: canvasSize.width - 240,
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
          x: canvasSize.width - 240,
          y: 0
        }),
        text: 'Place Start',
        fillColour: 'green',
        selected: false,
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
          x: canvasSize.width - 240,
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
          x: canvasSize.width - 240,
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

    // start with Draw Barriers selected
    buttons[buttons.length - 1].action()

    buttons.push(
      new Button({
        size: {
          width: ButtonSetup.buttonWidth,
          height: ButtonSetup.buttonHeight
        },
        position: new Vector2D({
          x: canvasSize.width - 240,
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
          x: canvasSize.width - 240,
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
          x: canvasSize.width - 240,
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

    this.#setHeights(buttons, canvasSize)

    return buttons
  }

  static #setHeights(buttons: Button[], canvasSize: Size) {
    const midHeight = Math.floor(canvasSize.height / 2)
    const halfAmount = buttons.length / 2
    const totalDist = ButtonSetup.buttonHeight + ButtonSetup.offset

    buttons.forEach((button, index) => {
      button.position.y = midHeight - (halfAmount - index) * totalDist
    })
  }
}
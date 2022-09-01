import { BoxType } from './Box'
import Button from './Button'
import State from './State'
import Vector2D from './Vector2D'

interface Dimensions {
  width: number
  height: number
}

export default class ButtonSetup {
  static setup(canvasDimensions: Dimensions, state: State): Button[] {
    const buttons: Button[] = []

    buttons.push(
      new Button({
        size: {
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 - 150
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
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 - 90
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
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 - 30
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
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 + 30
        }),
        text: 'Place start',
        fillColour: 'green',
        selected: true,
        action: function() {
          this.selected = true
          state.drawType = BoxType.Start
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
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 + 90
        }),
        text: 'Place end',
        fillColour: 'red',
        selected: false,
        action: function() {
          this.selected = true
          state.drawType = BoxType.End
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
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 + 150
        }),
        text: 'Draw barriers',
        fillColour: 'gray',
        selected: false,
        action: function() {
          this.selected = true
          state.drawType = BoxType.Barrier
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
          width: 200,
          height: 50
        },
        position: new Vector2D({
          x: canvasDimensions.width - 240,
          y: canvasDimensions.height / 2 + 210
        }),
        text: 'Erase Barriers',
        fillColour: 'gray',
        selected: false,
        action: function() {
          this.selected = true
          state.drawType = BoxType.Blank
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

    return buttons
  }
}
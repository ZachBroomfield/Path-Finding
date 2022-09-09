import State from '../classes/State'

export function addEventListeners(state: State, callback: () => void) {
  document.addEventListener('mousedown', () => {
    callback()
  })
  
  document.addEventListener('mouseup', () => {
    state.mouse.leftClick = false
  })
  
  document.addEventListener('mousemove', e => {
    state.updateMousePosition(e)
  })
}

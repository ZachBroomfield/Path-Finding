import State from '../classes/State'

export function addEventListeners(state: State, callback: () => void) {
  document.addEventListener('mousedown', e => {
    state.updateMousePosition(e)
    if (e.button === 0) callback()
  })
  
  document.addEventListener('mouseup', e => {
    if (e.button === 0) state.mouse.leftClick = false
  })
  
  document.addEventListener('mousemove', e => {
    state.updateMousePosition(e)
  })
}

export type ToggleState = {
  on: boolean
  clicks: number
}

export type ToggleAction = {
  type: 'toggle'
}

function toggleReducer(state: ToggleState, action: ToggleAction): ToggleState {
  switch (action.type) {
    case 'toggle':
      return { on: !state.on, clicks: state.clicks + 1 }
    default:
      return state
  }
}

function customToggleReducer(
  state: ToggleState,
  action: ToggleAction
): ToggleState {
  switch (action.type) {
    case 'toggle':
      if (state.clicks >= 3) return state
      return { on: !state.on, clicks: state.clicks + 1 }
    default:
      return state
  }
}

export { customToggleReducer, toggleReducer }

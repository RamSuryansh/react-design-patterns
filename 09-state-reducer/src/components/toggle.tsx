import { useReducer } from 'react'
import type { ToggleAction, ToggleState } from '../reducer/toggle'
import { toggleReducer } from '../reducer/toggle'

type ToggleProps = {
  reducer?: (state: ToggleState, action: ToggleAction) => ToggleState
  onToggle?: (on: boolean) => void
}

const initialState: ToggleState = {
  on: false,
  clicks: 0,
}

export default function Toggle({
  reducer = toggleReducer,
  onToggle,
}: ToggleProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { on, clicks } = state

  function handleToggle() {
    dispatch({ type: 'toggle' })
    onToggle?.(!on)
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-md text-white cursor-pointer ${
          on ? 'bg-green-600' : 'bg-red-500'
        }`}
      >
        {on ? 'ON' : 'OFF'} (Clicks: {clicks})
      </button>
    </>
  )
}

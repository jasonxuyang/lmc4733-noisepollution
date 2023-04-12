import * as React from 'react'

export enum Actions {
  PLAY = 'play',
  PAUSE = 'pause',
  TOGGLE = 'toggle',
}

export function playAudio(): Action {
  return { type: Actions.PLAY }
}
export function pauseAudio(): Action {
  return { type: Actions.PAUSE }
}
export function toggleAudio(): Action {
  return { type: Actions.TOGGLE }
}

type Action = { type: string }
type Dispatch = (action: Action) => void
type State = { isPlaying: boolean }
type GlobalStateProviderProps = { children: React.ReactNode }

const GlobalStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function globalStateReducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.PLAY: {
      return { isPlaying: true }
    }
    case Actions.PAUSE: {
      return { isPlaying: false }
    }
    case Actions.TOGGLE: {
      return { isPlaying: !state.isPlaying }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [state, dispatch] = React.useReducer(globalStateReducer, { isPlaying: false })
  const value = { state, dispatch }
  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>
}

function useGlobalState() {
  const context = React.useContext(GlobalStateContext)
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider')
  }
  return context
}

export { GlobalStateProvider, useGlobalState }

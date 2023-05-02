import { Dispatch, useReducer } from 'react'

type State = {
   files: File[] | []
}

type Action = {
   type: 'FILE'
   payload: Partial<State>
}

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'FILE':
         return { ...state, ...action.payload }
      default:
         return state
   }
}

export const useFiles = (initialState: State): [State, Dispatch<Action>] => {
   return useReducer(reducer, initialState)
}

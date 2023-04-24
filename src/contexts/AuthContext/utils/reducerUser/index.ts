import { UserProps } from '@/models/user'
import { Dispatch, useReducer } from 'react'

type State = {
   user: UserProps | null
}

type Action = {
   type: 'USER'
   payload: Partial<State>
}

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'USER':
         return { ...state, ...action.payload }
      default:
         return state
   }
}

export const useUser = (initialState: State): [State, Dispatch<Action>] => {
   return useReducer(reducer, initialState)
}

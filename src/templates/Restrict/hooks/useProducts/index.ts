import { Dispatch, useReducer } from 'react'

type State = {
   media: File | null
   mediaUrl: string
}

type Action = {
   type: 'UPLOAD_IMAGE'
   payload: Partial<State>
}

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'UPLOAD_IMAGE':
         return { ...state, ...action.payload }

      default:
         return state
   }
}

export const useProducts = (initialState: State): [State, Dispatch<Action>] => {
   return useReducer(reducer, initialState)
}

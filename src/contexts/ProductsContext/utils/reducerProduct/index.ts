import { StorageProps } from '@/models/products'
import { Dispatch, useReducer } from 'react'

type State = {
   files: File[] | []
   wished: StorageProps[]
}

type Action = {
   type: 'FILE' | 'WISHED'
   payload: Partial<State>
}

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'FILE':
         return { ...state, ...action.payload }
      case 'WISHED':
         return { ...state, ...action.payload }
      default:
         return state
   }
}

export const useProductReduce = (initialState: State): [State, Dispatch<Action>] => {
   return useReducer(reducer, initialState)
}

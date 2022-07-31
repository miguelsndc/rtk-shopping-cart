import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './features/cart'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: [logger],
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

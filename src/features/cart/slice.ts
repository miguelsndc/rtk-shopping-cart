import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../catalog'

type CartItem = Product & {
  quantity: number
}

type CartState = {
  products: CartItem[]
  totalPrice: number
}

const initialState: CartState = {
  products: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  initialState,
  name: 'Cart',
  reducers: {
    addProductToCart: (state: CartState, action: PayloadAction<Product>) => {
      const newItem = action.payload

      const existingItemIndex = state.products.findIndex(
        product => product.id === newItem.id
      )

      if (existingItemIndex !== -1) {
        state.products[existingItemIndex].quantity += 1
      } else
        state.products.push({
          ...newItem,
          category: {
            ...newItem.category,
          },
          quantity: 1,
        })

      state.totalPrice += newItem.price
    },
    removeProductFromCart: (
      state: CartState,
      action: PayloadAction<{ id: number; full?: boolean }>
    ) => {
      const productId = action.payload.id
      const full = action.payload.full

      const productIndex = state.products.findIndex(
        product => product.id === productId
      )

      const currentProduct = state.products[productIndex]

      const priceToBeSubtractedFromTotal = full
        ? currentProduct.price * currentProduct.quantity
        : currentProduct.price

      state.products[productIndex].quantity -= 1

      if (full || state.products[productIndex].quantity <= 0) {
        state.products = state.products.filter(
          product => product.id !== productId
        )
      }

      state.totalPrice -= priceToBeSubtractedFromTotal
    },
  },
})

const { addProductToCart, removeProductFromCart } = cartSlice.actions
const cartReducer = cartSlice.reducer

export { addProductToCart, cartReducer, removeProductFromCart }

//

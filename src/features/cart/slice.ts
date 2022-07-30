import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../catalog'

type CartItem = Product & {
  quantity: number
  priceSum: number
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

      const currentProduct = state.products[existingItemIndex]

      if (existingItemIndex !== -1) {
        state.products[existingItemIndex] = {
          ...currentProduct,
          category: {
            ...currentProduct.category,
          },
          quantity: currentProduct.quantity + 1,
          priceSum: currentProduct.priceSum + newItem.price,
        }
      } else
        state.products.push({
          ...newItem,
          category: {
            ...newItem.category,
          },
          quantity: 1,
          priceSum: newItem.price,
        })

      state.totalPrice += newItem.price
    },
  },
})

const { addProductToCart } = cartSlice.actions
const cartReducer = cartSlice.reducer

export { addProductToCart, cartReducer }

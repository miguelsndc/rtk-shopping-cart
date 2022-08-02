import { useAppDispatch, useAppSelector } from '../../core/store-helpers'
import { Plus, Minus, TrashSimple } from 'phosphor-react'
import { addProductToCart, removeProductFromCart } from './slice'
import { Product } from '../catalog'

export const Cart = () => {
  const { products, totalPrice } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  function handleIncreaseProductQuantity(product: Product) {
    dispatch(addProductToCart(product))
  }

  function handleDecreaseProductQuantity(productId: number) {
    dispatch(removeProductFromCart({ id: productId }))
  }

  function handleDeleteProduct(productId: number) {
    dispatch(removeProductFromCart({ id: productId, full: true }))
  }

  const totalOfItems =
    products.length > 0 &&
    products
      .map(product => product.quantity)
      .reduce((acc, curQuantity) => (acc += curQuantity))

  return (
    <div className='p-4 rounded shadow-md flex flex-col gap-4 max-w-md '>
      {products.map(product => (
        <div key={product.id} className='flex gap-2 w-full'>
          <img
            src={product.images[0]}
            alt={product.title}
            className='rounded w-full max-w-[128px] aspect-auto'
          />
          <div className='flex flex-col justify-between w-full'>
            <div className='flex items-center justify-between w-full'>
              <span className='leading-relaxed'>{product.title}</span>
              <span className='font-semibold'>${product.price}</span>
            </div>
            <footer className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => handleDecreaseProductQuantity(product.id)}
                  disabled={product.quantity <= 1}
                  className='border border-gray-200 hover:bg-gray-200 transition-colors p-1 rounded disabled:pointer-events-none disabled:opacity-30'
                >
                  <Minus size={20} />
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => handleIncreaseProductQuantity(product)}
                  className='border border-gray-200 hover:bg-gray-200 transition-colors p-1 rounded'
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                className='flex items-center gap-[2px] text-sm p-2 rounded text-red-600 capitalize hover:bg-red-100 transition-colors'
                onClick={() => handleDeleteProduct(product.id)}
              >
                <TrashSimple size={20} />
                delete
              </button>
            </footer>
          </div>
        </div>
      ))}
      <footer>
        <div className='flex items-center justify-between'>
          <span>Subtotal ({totalOfItems || 0} items)</span>
          <span>${totalPrice}</span>
        </div>
      </footer>
    </div>
  )
}

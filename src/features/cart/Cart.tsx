import { useAppDispatch, useAppSelector } from '../../core/store-helpers'
import { Plus, Minus, TrashSimple, SmileySad, X } from 'phosphor-react'
import { addProductToCart, removeProductFromCart } from './slice'
import { Product } from '../catalog'

export const Cart = ({ onClose }: { onClose: () => void }) => {
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
    <div className='p-4 rounded shadow-md flex flex-col  bg-white w-full h-screen'>
      <button
        onClick={onClose}
        aria-label='close cart'
        className='px-4 self-end'
      >
        <X size={32} />
      </button>
      {products.length > 0 ? (
        <>
          <div className='overflow-y-auto flex-1 flex flex-col gap-8 p-4 scrol'>
            {products.map(product => (
              <div key={product.id} className='flex gap-3 w-full'>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  loading='lazy'
                  className='rounded w-full max-w-[128px] aspect-auto'
                />
                <div className='flex flex-col justify-between w-full'>
                  <div className='flex items-center justify-between w-full'>
                    <span className='leading-relaxed'>{product.title}</span>
                    <span className='font-semibold'>${product.price}</span>
                  </div>
                  <footer className='flex items-center justify-between mt-2'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() =>
                          handleDecreaseProductQuantity(product.id)
                        }
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
          </div>

          <footer className='flex items-end justify-between'>
            <span>Subtotal ({totalOfItems || 0} items)</span>
            <strong className='text-lg'>${totalPrice}</strong>
          </footer>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center flex-1'>
          <SmileySad size={96} color='#E5E7EB' />
          <span className='text-xl font-semibold'>Nothing to see here...</span>
          <span className='text-sm text-gray-400'>
            Try adding some items to your cart!
          </span>
        </div>
      )}
    </div>
  )
}

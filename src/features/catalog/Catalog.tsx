import { useCatalog } from './useCatalog'
import { useAppDispatch, useAppSelector } from '../../core/store-helpers'
import { addProductToCart, toggleCartOpened } from '../cart'
import toast from 'react-hot-toast'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

export const Catalog = () => {
  const { data, isLoading } = useCatalog()
  const dispatch = useAppDispatch()
  const isCartOpened = useAppSelector(state => state.cart.opened)

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        Loading...
      </div>
    )
  }

  function handleAddToCart(product: Product) {
    dispatch(addProductToCart(product))

    const onSeeCart = (toastId: string) => {
      toast.dismiss(toastId)
      dispatch(toggleCartOpened())
    }

    isCartOpened ||
      toast(t => (
        <div className='flex items-center gap-2'>
          <img
            src={product.images[0]}
            className='w-12 aspect-square rounded-sm'
          />
          <div className='flex flex-col items-start'>
            <span className='font-semibold'>Product added to the cart</span>
            <button
              className='text-sm text-gray-800'
              onClick={() => onSeeCart(t.id)}
            >
              See the cart
            </button>
          </div>
        </div>
      ))
  }

  return (
    <div className='w-full max-w-6xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-2 pt-[10vh]'>
      {data.map(product => (
        <div key={product.id} className='w-full flex flex-col justify-between'>
          <img
            src={product.images[0]}
            alt={product.title}
            loading='lazy'
            className='rounded-lg w-full flex-1 object-cover'
          />
          <footer className='flex flex-col justify-between mt-3 gap-2'>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg font-bold'>{product.title}</h1>
              <strong>$ {product.price}</strong>
            </div>
            <p className='leading-tight text-gray-500 block '>
              {product.description}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className='bg-indigo-700 hover:bg-indigo-800 transition-colors block mt-2 py-3 text-white rounded '
            >
              Add to Cart
            </button>
          </footer>
        </div>
      ))}
    </div>
  )
}

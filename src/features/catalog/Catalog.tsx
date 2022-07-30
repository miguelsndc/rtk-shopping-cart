import { useCatalog } from './useCatalog'
import { useAppDispatch } from '../../core/store-helpers'
import { addProductToCart } from '../cart'

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
  const { data, error, isLoading } = useCatalog()
  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        Loading...
      </div>
    )
  }

  function handleAddToCart(product: Product) {
    dispatch(addProductToCart(product))
  }

  return (
    <div className='w-full max-w-6xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-2'>
      {data.map(product => (
        <div key={product.id} className='w-full'>
          <img
            src={product.images[0]}
            alt={product.title}
            className='rounded-lg w-full'
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
              Adicionar ao Carrinho
            </button>
          </footer>
        </div>
      ))}
    </div>
  )
}

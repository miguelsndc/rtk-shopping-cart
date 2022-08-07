import { useCallback } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from './core/store-helpers'
import { Cart, toggleCartOpened } from './features/cart'
import { Catalog } from './features/catalog'
import { Header } from './features/catalog/Header'

function App() {
  const dispatch = useAppDispatch()
  const isCartOpened = useAppSelector(state => state.cart.opened)

  const handleCartClose = useCallback(() => {
    dispatch(toggleCartOpened())
  }, [])

  return (
    <div>
      <Toaster position='top-right' />
      <Header />

      <div>
        <Catalog />
        {isCartOpened && (
          <div
            className='fixed top-0 right-0 flex-1 w-full max-w-xl'
            onClick={e => e.stopPropagation()}
          >
            <Cart onClose={handleCartClose} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App

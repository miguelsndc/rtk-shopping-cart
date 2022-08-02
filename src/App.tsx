import { Toaster } from 'react-hot-toast'
import { Cart } from './features/cart'
import { Catalog } from './features/catalog'

function App() {
  return (
    <div className='App'>
      <Toaster position='top-right' />
      <Cart />
      <Catalog />
    </div>
  )
}

export default App

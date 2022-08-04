import { Toaster } from 'react-hot-toast'
import { Header } from './features/catalog/Header'
import { Router } from './router'

function App() {
  return (
    <div>
      <Toaster position='top-right' />
      <Header />
      <Router />
    </div>
  )
}

export default App

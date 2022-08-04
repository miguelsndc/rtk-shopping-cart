import { ShoppingCartSimple } from 'phosphor-react'
import { CartLink } from '../cart'

export function Header() {
  return (
    <header className='fixed top-0 w-full bg-white py-4 flex items-center justify-center h-[8vh] ring ring-black ring-opacity-5'>
      <nav className='flex items-center justify-between w-full max-w-6xl p-2'>
        <h1>logo</h1>
        <CartLink>
          <ShoppingCartSimple size={32} />
        </CartLink>
      </nav>
    </header>
  )
}

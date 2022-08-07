import { ShoppingCartSimple, Atom } from 'phosphor-react'
import { useAppDispatch } from '../../core/store-helpers'
import { toggleCartOpened } from '../cart'

export function Header() {
  const dispatch = useAppDispatch()

  return (
    <header className='fixed top-0 w-full bg-white py-4 flex items-center justify-center h-[8vh] ring ring-black ring-opacity-5'>
      <nav className='flex items-center justify-between w-full max-w-6xl p-2'>
        <h1>
          <Atom size={32} color='#4338CA' />
        </h1>
        <button onClick={() => dispatch(toggleCartOpened())}>
          <ShoppingCartSimple size={32} />
        </button>
      </nav>
    </header>
  )
}

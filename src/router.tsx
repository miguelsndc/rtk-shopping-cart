import {
  Location,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Cart } from './features/cart'
import { Catalog } from './features/catalog'

export function Router() {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route index element={<Catalog />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes location={state?.backgroundLocation || location}>
          <Route
            index
            element={
              <div
                className='fixed top-0 right-0 flex-1 w-full max-w-xl'
                onClick={e => e.stopPropagation()}
              >
                <Cart />
              </div>
            }
          />
        </Routes>
      )}
    </>
  )
}

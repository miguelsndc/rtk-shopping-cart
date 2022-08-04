import { useLocation } from 'react-router-dom'

export function useIsCartOpened() {
  const location = useLocation()

  return location.pathname.includes('/cart')
}

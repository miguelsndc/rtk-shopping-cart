import { Link, LinkProps, To, useLocation } from 'react-router-dom'

type Props = {
  to?: To
} & Omit<LinkProps, 'to'>

export function CartLink({ children, ...props }: Props) {
  const location = useLocation()

  return (
    <Link {...props} to='/cart' state={{ backgroundLocation: location }}>
      {children}
    </Link>
  )
}

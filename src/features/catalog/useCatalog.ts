import { useEffect, useState } from 'react'
import { api } from '../../core/api'

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

export const useCatalog = () => {
  const [data, setData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get<Product[]>('/products')
      .then(response => {
        setData(response.data)
      })
      .catch(() => {
        setError('An error ocurred')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { data, isLoading, error }
}

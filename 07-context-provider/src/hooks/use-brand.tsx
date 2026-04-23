import { useContext } from 'react'
import { BrandContext } from '../context'

export const useBrand = () => {
  const { brand, color } = useContext(BrandContext)

  return { brand, color }
}

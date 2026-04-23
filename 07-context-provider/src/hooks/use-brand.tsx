import { use } from 'react'
import { BrandContext } from '../context'

export const useBrand = () => {
  const { brand, color } = use(BrandContext)

  return { brand, color }
}

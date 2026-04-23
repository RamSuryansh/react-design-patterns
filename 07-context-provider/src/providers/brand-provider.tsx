import { BrandContext } from '../context'

const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrandContext value={{ brand: 'RD-Patterns', color: 'amber-500' }}>
      {children}
    </BrandContext>
  )
}

export default BrandProvider

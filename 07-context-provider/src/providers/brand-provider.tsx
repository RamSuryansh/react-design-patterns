import { BrandContext } from '../context'

const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrandContext value={{ brand: 'RDPatterns', color: 'blue-500' }}>
      {children}
    </BrandContext>
  )
}

export default BrandProvider

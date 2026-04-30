import { eventBus } from '../../libs/event-bus'
import type { CartItem } from '../../types/events'

const products: CartItem[] = [
  { id: crypto.randomUUID(), name: 'Soap' },
  { id: crypto.randomUUID(), name: 'Towel' },
  { id: crypto.randomUUID(), name: 'Bed' },
  { id: crypto.randomUUID(), name: 'Mirror' },
  { id: crypto.randomUUID(), name: 'Light' },
]

export default function AddToCartButton() {
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * products.length)
    const selectedProduct = products[randomIndex]

    if (!selectedProduct) {
      return
    }

    eventBus.publish('cart:add', {
      id: selectedProduct.id,
      name: selectedProduct.name,
    })
  }

  return (
    <div className='rounded-md border border-slate-200 bg-slate-50 p-4'>
      <h3 className='text-lg font-semibold text-slate-900'>Publisher</h3>
      <button
        className='mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700'
        onClick={handleClick}
        type='button'
      >
        Add to Cart
      </button>
    </div>
  )
}

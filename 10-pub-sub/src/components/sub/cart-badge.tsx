import { useState } from 'react'
import { useEvent } from '../../hooks/use-event'
import type { CartItem } from '../../types/events'

export default function CartBadge() {
  const [items, setItems] = useState<CartItem[]>([])

  useEvent('cart:add', (data) => {
    setItems((currentItems) => [...currentItems, data])
  })

  return (
    <div className='rounded-md border border-slate-200 bg-slate-50 p-4'>
      <h3 className='text-lg font-semibold text-slate-900'>Subscriber</h3>
      <p className='mt-4 text-4xl'>Cart: {items.length}</p>
      <ul className='mt-4 space-y-2 text-sm text-slate-600'>
        {items.map((item) => (
          <li className='rounded bg-white px-3 py-2' key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

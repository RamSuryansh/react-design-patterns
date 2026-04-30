import { useState } from 'react'
import { useEvent } from '../../hooks/use-event'
import type { CartItem } from '../../types/events'

export default function CartBadge() {
  const [items, setItems] = useState<CartItem[]>([])

  useEvent('cart:add', (data) => {
    setItems((currentItems) => [...currentItems, data])
  })

  return (
    <div className='flex flex-col text-center'>
      <h2 className='text-2xl'>Subscriber</h2>
      <p className='text-4xl text-center'>🛒 {items.length}</p>
      <ul className='list-none'>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

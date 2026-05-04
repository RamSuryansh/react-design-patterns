import CardItem from './card-item'
import type { User } from './data'

export default function NonVirtualList({ users }: { users: User[] }) {
  return (
    <div className='h-56 overflow-auto border rounded p-1'>
      {users.map((user) => (
        <CardItem key={user.id} user={user} />
      ))}
    </div>
  )
}

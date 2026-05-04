import type { User } from './data'

const CardItem = ({ user }: { user: User }) => {
  return (
    <div className='p-2 border rounded flex gap-1 m-1'>
      <div className='font-bold'>{user.name}</div>
      <div className='text-sm text-gray-500'>{user.email}</div>
      <div className='text-sm'>{user.bio}</div>
    </div>
  )
}

export default CardItem

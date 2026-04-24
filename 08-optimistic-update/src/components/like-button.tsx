import React, { startTransition, useOptimistic } from 'react'

type Props = {
  postId: number
  initialLikes: number
}

async function sendLikeToServer(postId: number) {
  // simulate network
  await new Promise((r) => setTimeout(r, 700))

  if (Math.random() < 0.2) throw new Error('Network failed')
  console.log(`Sent a like for the post id ${postId}`)
  return { success: true }
}

const LikeButton: React.FC<Props> = ({ initialLikes, postId }) => {
  const [likes, setLikes] = React.useState(initialLikes)
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes: number, nextValue: number) => currentLikes + nextValue,
  )

  const handleLike = async () => {
    addOptimisticLike(1)
    try {
      // Simulate an API call to like the post
      await sendLikeToServer(postId)
      setLikes((pre) => pre + 1)
      // If the API call is successful, do nothing as the optimistic update has already updated the UI
    } catch (error) {
      // If the API call fails, revert the optimistic update
      setLikes((pre) => pre)
      console.error('Failed to like the post:', error)
    }
  }

  return (
    <div className='flex items-center'>
      <button
        onClick={() => startTransition(() => handleLike())}
        className='bg-blue-500 text-white px-2 py-1 rounded'
      >
        Like ❤️
      </button>
      <span className='ml-2 text-xs'>{optimisticLikes} Likes</span>
    </div>
  )
}

export default LikeButton

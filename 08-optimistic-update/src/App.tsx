import LikeButton from './components/like-button'

function App() {
  return (
    <div className='container p-5'>
      <h1 className='text-2xl text-blue-500 mb-5'>Optimistic Updates</h1>
      <LikeButton postId={1} initialLikes={0} />
    </div>
  )
}

export default App

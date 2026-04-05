import Modal from './messy/modal'

function App() {
  return (
    <div className='mx-auto min-h-screen max-w-4xl p-5'>
      <p>Hello, Dev!!!</p>
      <Modal
        title='Delete Post'
        body='Are you sure you want to delete this post? This action cannot be undone.'
        primaryAction={<button className='btn btn-primary'>Delete</button>}
        secondaryAction={<button className='btn btn-secondary'>Cancel</button>}
      />
    </div>
  )
}

export default App

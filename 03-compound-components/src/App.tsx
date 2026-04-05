// import Modal from './messy/modal'

import React from 'react'
import Accordion from './with-pattern/accordion'
import Modal from './with-pattern/modal'

function App() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className='mx-auto min-h-screen max-w-4xl p-5'>
      <p>Hello, Dev!!!</p>
      {/* <Modal
        title='Delete Post'
        body='Are you sure you want to delete this post? This action cannot be undone.'
        primaryAction={<button className='btn btn-primary'>Delete</button>}
        secondaryAction={<button className='btn btn-secondary'>Cancel</button>}
      /> */}

      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <h2>Welcome!</h2>
        </Modal.Header>
        <Modal.Body>
          <p>This is a modal built with the Compound Component pattern.</p>
          <Accordion>
            <Accordion.Item title='What is Compound Component Pattern?'>
              It’s a React pattern that allows parent and child components to
              work together seamlessly while giving developers flexible
              composition.
            </Accordion.Item>

            <Accordion.Item title='Why use it?'>
              It makes UI libraries like modals, tabs, accordions, menus, etc.
              easier to build and use.
            </Accordion.Item>

            <Accordion.Item title='Pitfalls?'>
              Overusing it can lead to deeply nested structures or make things
              harder to debug if not documented well.
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <button onClick={() => alert('Action performed!')}>Do Action</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default App

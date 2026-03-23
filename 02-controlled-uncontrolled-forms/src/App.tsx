import MessyFeedbackForm from './messy/feedback-form'
import RefVsState from './ref-state/ref-vs-state'

function App() {
  return (
    <div className='mx-auto min-h-screen max-w-4xl p-5 space-y-1'>
      <div className='fle flex-col gap-5 w-full'>
        <h6 className='text-xl text-blue-400'>Diff Between Ref and State</h6>
        <RefVsState />
      </div>
      <h6 className='text-xl text-blue-400 mt-10'>Messy Feedback Form</h6>
      <MessyFeedbackForm />
    </div>
  )
}

export default App

import ControlledFeedbackForm from './controlled/feedback-form'
import MessyFeedbackForm from './messy/feedback-form'
import RefVsState from './ref-state/ref-vs-state'
import UCFormWithRef from './uncontrolled/form-with-ref'
import UCFormWithoutRef from './uncontrolled/form-without-ref'

function App() {
  return (
    <div className='mx-auto min-h-screen max-w-4xl p-5 space-y-1'>
      <div className='fle flex-col gap-5 w-full'>
        <h6 className='text-xl text-blue-400'>Diff Between Ref and State</h6>
        <RefVsState />
      </div>
      <h6 className='text-xl text-blue-400 mt-10'>Messy Feedback Form</h6>
      <MessyFeedbackForm />
      <h6 className='text-xl text-blue-400 mt-10'>Controlled Feedback Form</h6>
      <ControlledFeedbackForm />
      <h6 className='text-xl text-blue-400 mt-10'>
        Uncontrolled Feedback Form with Ref
      </h6>
      <UCFormWithRef />
      <h6 className='text-xl text-blue-400 mt-10'>
        Uncontrolled Feedback Form without Ref
      </h6>
      <UCFormWithoutRef />
    </div>
  )
}

export default App

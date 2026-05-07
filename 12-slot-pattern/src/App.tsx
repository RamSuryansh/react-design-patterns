import BoxDemo from './default-slot/box-demo'
import NamedSlotDemo from './named-slot-map/named-slot-demo'
import CardWithSlotDemo from './named-slots/card-with-slot-demo'

function App() {
  return (
    <div className='container m-auto p-5'>
      <h1 className='text-2xl text-blue-500'>Slot pattern - default</h1>
      <BoxDemo />

      <h1 className='text-xl text-blue-400 mt-5'>Named Slot Map Demo</h1>
      <NamedSlotDemo />

      <h1 className='text-xl text-blue-400 mt-5'>Card with Slots Demo</h1>
      <CardWithSlotDemo />
    </div>
  )
}

export default App

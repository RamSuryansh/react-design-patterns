// import BikeTracker from './messy/bike-tracker'
// import CarTracker from './messy/car-tracker'

import MouseTracker from './with-pattern/mouse-tracker'
import MouseTrackerWithChildren from './with-pattern/mouse-tracker-with-children'

function App() {
  return (
    <div className='flex flex-col items-center m-2'>
      {/* <CarTracker />
      <BikeTracker /> */}
      <p className='text-xl text-blue-500 mt-5'>With render prop</p>
      <MouseTracker
        render={(pos) => (
          <p>
            🚗 Car is at ({pos.x}, {pos.y})
          </p>
        )}
      />

      <MouseTracker
        render={({ x, y }) => (
          <p>
            🏍️ Bike is at ({x}, {y})
          </p>
        )}
      />

      <p className='text-xl text-blue-500 mt-5'>With Children</p>

      <MouseTrackerWithChildren>
        {({ x, y }) => (
          <p>
            🚗 Car is at ({x}, {y})
          </p>
        )}
      </MouseTrackerWithChildren>

      <MouseTrackerWithChildren>
        {({ x, y }) => (
          <p>
            🏍️ Bike is at ({x}, {y})
          </p>
        )}
      </MouseTrackerWithChildren>
    </div>
  )
}

export default App

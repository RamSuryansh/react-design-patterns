import AddToCartButton from './components/pub/add-to-card-btn'
import NotificationPublisher from './components/pub/notification-publisher'
import CartBadge from './components/sub/cart-badge'
import NotificationPanel from './components/sub/notification-panel'

function App() {
  return (
    <div className='min-h-screen bg-slate-100 px-4 py-8 text-slate-950 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <header className='mb-8'>
          <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Pub-Sub Pattern
          </p>
          <h1 className='mt-2 text-4xl font-bold text-slate-950'>
            Notifications Dashboard
          </h1>
          <p className='mt-3 max-w-2xl text-base leading-7 text-slate-600'>
            Publishers emit events, subscribers react to them, and the event bus
            keeps both sides independent.
          </p>
        </header>

        <main className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]'>
          <div className='space-y-6'>
            <NotificationPublisher />

            <section className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='mb-5'>
                <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                  Existing Example
                </p>
                <h2 className='text-2xl font-semibold text-slate-950'>
                  Cart Pub-Sub Example
                </h2>
              </div>
              <div className='grid gap-4 md:grid-cols-2'>
                <AddToCartButton />
                <CartBadge />
              </div>
            </section>
          </div>

          <NotificationPanel />
        </main>
      </div>
    </div>
  )
}

export default App

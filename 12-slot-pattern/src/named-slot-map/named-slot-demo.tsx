import Article from './article'
import SlotLayout from './slot-layout'

const NamedSlotDemo = () => {
  return (
    <div>
      <SlotLayout
        slots={{
          header: <h1>My App</h1>,
          sidebar: <nav>Navigation</nav>,
          content: <Article />,
          footer: <footer>Footer</footer>,
        }}
      />
    </div>
  )
}

export default NamedSlotDemo

import { Activity, useState } from 'react'

type AccordionProps = {
  children: React.ReactNode
}

type AccordionItemProps = {
  title: string
  children: React.ReactNode
}

function Accordion({ children }: AccordionProps) {
  return <div className='accordion'>{children}</div>
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='accordion-item'>
      <button className='accordion-title' onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      <Activity mode={isOpen ? 'visible' : 'hidden'}>
        <div className='accordion-content'>{children}</div>
      </Activity>
    </div>
  )
}

// Attach subcomponents
Accordion.Item = AccordionItem

export default Accordion

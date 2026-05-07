/**
 * Card using named slots via props.
 * Pros: simple, explicit
 * Cons: many props can get awkward when the number of slots grows
 */

type CardWithSlotsProps = {
  header: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
  style?: React.CSSProperties
}

export default function CardWithSlots({
  header,
  content,
  footer,
  style,
}: CardWithSlotsProps) {
  return (
    <div className='border border-gray-300 w-135' style={style}>
      <div className='p-3 border-b border-gray-200 bg-yellow-50 text-gray-800'>
        {/* header is a slot prop — consumer passes a React node */}
        {header}
      </div>

      <div className='p-3'>
        {/* main content slot */}
        {content}
      </div>

      <div className='p-3 border-t border-gray-200 bg-green-50 text-gray-800'>
        {/* footer slot */}
        {footer}
      </div>
    </div>
  )
}

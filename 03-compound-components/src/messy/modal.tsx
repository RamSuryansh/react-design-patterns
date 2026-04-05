type ModalProps = {
  title: string
  body: string
  primaryAction: React.ReactNode
  secondaryAction: React.ReactNode
}

function Modal({ title, body, primaryAction, secondaryAction }: ModalProps) {
  return (
    <div className='modal-backdrop'>
      <div className='modal-container'>
        <h2 className='modal-header'>{title}</h2>
        <p className='modal-body'>{body}</p>
        <div className='modal-footer'>
          {secondaryAction}
          {primaryAction}
        </div>
      </div>
    </div>
  )
}

export default Modal

type ModalProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className='modal-backdrop'>
      <div className='modal-container'>
        {children}
        <button className='modal-close' onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  )
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className='modal-header'>{children}</div>
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className='modal-body'>{children}</div>
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className='modal-footer'>{children}</div>
}

// Attach subComponents
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal

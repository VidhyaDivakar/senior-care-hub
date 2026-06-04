import { X } from 'lucide-react'

type ModalProps = {
  title: string
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <X size={20} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal

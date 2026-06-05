import { NavLink } from 'react-router-dom'
import { useRole } from '../../hooks/useRole'
import { X } from 'lucide-react'

type SidebarProps = {
  onLogout: () => void
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ onLogout, isOpen, onClose }: SidebarProps) => {
  const { isSenior, isProvider, loaded } = useRole()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col justify-between py-8 px-6
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>
        <div>
          <button
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <NavLink to="/" className="block text-xl font-bold text-indigo-900 mb-10 hover:text-indigo-700">
            Senior NexCore
          </NavLink>

          <ul className="flex flex-col gap-4 list-none">
            <li><NavLink to="/dashboard" end className={linkClass} onClick={onClose}>Dashboard</NavLink></li>

            {loaded && isSenior && (
              <>
                <li><NavLink to="/dashboard/learning" className={linkClass} onClick={onClose}>Learning Requests</NavLink></li>
                <li><NavLink to="/dashboard/skills" className={linkClass} onClick={onClose}>My Skills</NavLink></li>
                <li><NavLink to="/dashboard/community" className={linkClass} onClick={onClose}>Community Board</NavLink></li>
              </>
            )}

            {loaded && isProvider && (
              <>
                <li><NavLink to="/dashboard/provider" className={linkClass} onClick={onClose}>Browse Requests</NavLink></li>
                <li><NavLink to="/dashboard/community" className={linkClass} onClick={onClose}>Community Board</NavLink></li>
              </>
            )}

            <li><NavLink to="/dashboard/profile" className={linkClass} onClick={onClose}>My Profile</NavLink></li>
          </ul>
        </div>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </aside>
    </>
  )
}

export default Sidebar

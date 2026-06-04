import { NavLink } from 'react-router-dom'

type SidebarProps = {
  onLogout: () => void
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between py-8 px-6">
      <div>
        <h2 className="text-xl font-bold text-indigo-900 mb-10">SeniorCare Hub</h2>
        <ul className="flex flex-col gap-4 list-none">
          <li><NavLink to="/dashboard" end className={linkClass}>My Profile</NavLink></li>
          <li><NavLink to="/dashboard/skills" className={linkClass}>My Skills</NavLink></li>
          <li><NavLink to="/dashboard/learning" className={linkClass}>Learning Requests</NavLink></li>
          <li><NavLink to="/dashboard/community" className={linkClass}>Community Board</NavLink></li>
        </ul>
      </div>
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </aside>
  )
}

export default Sidebar

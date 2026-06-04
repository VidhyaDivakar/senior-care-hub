import { Bell } from 'lucide-react'

type DashboardHeaderProps = {
  username: string
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between bg-white px-10 py-4 shadow-sm">
      <div>
        <h3 className="text-xl font-bold text-gray-800">
          Welcome Back, <span className="text-indigo-600">{username || '...'}</span> 👋
        </h3>
        <p className="text-sm text-gray-400">Stay active, keep learning, and connect with your community.</p>
      </div>
      <div className="flex items-center gap-4">
        <Bell size={22} className="text-gray-500 cursor-pointer hover:text-indigo-600" />
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {username ? username[0].toUpperCase() : '?'}
          </div>
          <span className="text-gray-700 font-medium">{username || '...'}</span>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader

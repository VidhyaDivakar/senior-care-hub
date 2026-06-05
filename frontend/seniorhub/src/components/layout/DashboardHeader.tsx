import { Bell, Menu } from 'lucide-react'

type DashboardHeaderProps = {
  username: string
  onMenuToggle: () => void
}

const DashboardHeader = ({ username, onMenuToggle }: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between bg-white px-4 sm:px-10 py-4 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-gray-500 hover:text-indigo-600"
          onClick={onMenuToggle}
        >
          <Menu size={22} />
        </button>
        <div>
          <h3 className="text-base sm:text-xl font-bold text-gray-800">
            Welcome Back, <span className="text-indigo-600">{username || '...'}</span> 👋
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Stay active, keep learning, and connect with your community.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Bell size={22} className="text-gray-500 cursor-pointer hover:text-indigo-600" />
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {username ? username[0].toUpperCase() : '?'}
          </div>
          <span className="text-gray-700 font-medium hidden sm:block">{username || '...'}</span>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader

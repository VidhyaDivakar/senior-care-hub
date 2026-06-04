import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSkills } from '../../api/skills'
import { getLearningRequests } from '../../api/learningRequests'
import { getCommunityPosts } from '../../api/communityPosts'
import { Lightbulb, BookOpen, Newspaper, MessageCircle } from 'lucide-react'
//<Outlet /> is a placeholder that tells React Router "render the child route's component here."

const DashboardLayout = () => {
  const navigate = useNavigate()
  const [skillCount, setSkillCount] = useState(0)
  const [learningCount, setLearningCount] = useState(0)
  const [postCount, setPostCount] = useState(0)

  useEffect(() => {
    getSkills().then(data => setSkillCount(data.length)).catch(() => {})
    getLearningRequests().then(data => setLearningCount(data.length)).catch(() => {})
    getCommunityPosts().then(data => setPostCount(data.length)).catch(() => {})
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const cards = [
    { label: 'My Skills', count: skillCount, icon: <Lightbulb size={32} />, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'Learning Requests', count: learningCount, icon: <BookOpen size={32} />, bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Community Posts', count: postCount, icon: <Newspaper size={32} />, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Messages', count: 'Coming Soon', icon: <MessageCircle size={32} />, bg: 'bg-pink-50', color: 'text-pink-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold text-indigo-900">SeniorCare Hub</h2>
        <ul className="flex gap-6 list-none">
          <li><NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>My Profile</NavLink></li>
          <li><NavLink to="/dashboard/skills" className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>My Skills</NavLink></li>
          <li><NavLink to="/dashboard/learning" className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>Learning Requests</NavLink></li>
          <li><NavLink to="/dashboard/community" className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>Community Board</NavLink></li>
        </ul>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Logout</button>
      </nav>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 py-8">
        {cards.map(card => (
          <div key={card.label} className={`${card.bg} rounded-xl p-6 text-center`}>
            <div className={`flex justify-center mb-3 ${card.color}`}>{card.icon}</div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{card.count}</p>
            <p className="text-gray-500 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      <main className="px-10 pb-10">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout

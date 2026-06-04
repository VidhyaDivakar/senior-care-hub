import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSkills } from '../../api/skills'
import { getLearningRequests } from '../../api/learningRequests'
import { getCommunityPosts } from '../../api/communityPosts'
import { Lightbulb, BookOpen, Newspaper, MessageCircle } from 'lucide-react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import StatCard from '../../components/StatCard'
import RecentActivity from '../../components/RecentActivity'
import UpcomingEvents from '../../components/UpcomingEvents'
import QuickActions from '../../components/QuickActions'
import AddSkillForm from '../../components/AddSkillForm'
import AddLearningForm from '../../components/AddLearningForm'
import CreatePostForm from '../../components/CreatePostForm'
import SkillsPreview from '../../components/SkillsPreview'
import type { ActivityItem, Skill } from '../../types'
//<Outlet /> is a placeholder that tells React Router "render the child route's component here."

const DashboardLayout = () => {
  const navigate = useNavigate()
  const [skills, setSkills] = useState<Skill[]>([])
  const [learningRequests, setLearningRequests] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [username, setUsername] = useState('')
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showLearningModal, setShowLearningModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)

  useEffect(() => {
    getSkills().then(data => setSkills(data)).catch(() => {})
    getLearningRequests().then(data => setLearningRequests(data)).catch(() => {})
    getCommunityPosts().then(data => setPosts(data)).catch(() => {})
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3006/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsername(res.data.username)).catch(() => {})
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const recentActivity: ActivityItem[] = [
    ...skills.map(s => ({ label: s.title, type: 'Skill', createdAt: s.createdAt })),
    ...learningRequests.map(l => ({ label: l.title, type: 'Learning Request', createdAt: l.createdAt })),
    ...posts.map(p => ({ label: p.title, type: 'Community Post', createdAt: p.createdAt })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3)

  const cards = [
    { label: 'My Skills', count: skills.length, icon: <Lightbulb size={32} />, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'Learning Requests', count: learningRequests.length, icon: <BookOpen size={32} />, bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Community Posts', count: posts.length, icon: <Newspaper size={32} />, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Messages', count: 'Coming Soon', icon: <MessageCircle size={32} />, bg: 'bg-pink-50', color: 'text-pink-600' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader username={username} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 py-8">
          {cards.map(card => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 pb-8">
          <RecentActivity activities={recentActivity} />
          <UpcomingEvents />
        </div>

        <SkillsPreview skills={skills} />

        <QuickActions
          onAddSkill={() => setShowSkillModal(true)}
          onNewLearning={() => setShowLearningModal(true)}
          onCreatePost={() => setShowPostModal(true)}
        />

        <main className="px-10 pb-10">
          <Outlet />
        </main>
      </div>

      {showSkillModal && <AddSkillForm onClose={() => setShowSkillModal(false)} onSuccess={skill => setSkills([...skills, skill])} />}
      {showLearningModal && <AddLearningForm onClose={() => setShowLearningModal(false)} onSuccess={req => setLearningRequests([...learningRequests, req])} />}
      {showPostModal && <CreatePostForm onClose={() => setShowPostModal(false)} onSuccess={post => setPosts([post, ...posts])} />}
    </div>
  )
}

export default DashboardLayout

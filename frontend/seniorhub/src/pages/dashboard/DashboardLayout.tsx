import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSkills } from '../../api/skills'
import { getLearningRequests } from '../../api/learningRequests'
import { getCommunityPosts } from '../../api/communityPosts'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import RecentActivity from '../../components/RecentActivity'
import QuickActions from '../../components/QuickActions'
import AddSkillForm from '../../components/AddSkillForm'
import AddLearningForm from '../../components/AddLearningForm'
import CreatePostForm from '../../components/CreatePostForm'
import type { ActivityItem } from '../../types'
//<Outlet /> is a placeholder that tells React Router "render the child route's component here."

const DashboardLayout = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showLearningModal, setShowLearningModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)

  useEffect(() => {
    Promise.all([getSkills(), getLearningRequests(), getCommunityPosts()])
      .then(([skills, requests, posts]) => {
        const activity: ActivityItem[] = [
          ...skills.map((s: any) => ({ label: s.title, type: 'Skill', createdAt: s.createdAt })),
          ...requests.map((l: any) => ({ label: l.title, type: 'Learning Request', createdAt: l.createdAt })),
          ...posts.map((p: any) => ({ label: p.title, type: 'Community Post', createdAt: p.createdAt })),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3)
        setRecentActivity(activity)
      }).catch(() => {})
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex overflow-hidden">

        {/* Main scrollable content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <DashboardHeader username={user?.username || ''} />
          <main className="px-8 py-6 pb-10">
            <Outlet />
          </main>
        </div>

        {/* Right side pane */}
        <aside className="w-72 bg-white border-l border-gray-100 flex flex-col gap-6 p-6 overflow-y-auto">
          <RecentActivity activities={recentActivity} />
          <QuickActions
            onAddSkill={() => setShowSkillModal(true)}
            onNewLearning={() => setShowLearningModal(true)}
            onCreatePost={() => setShowPostModal(true)}
          />
        </aside>

      </div>

      {showSkillModal && <AddSkillForm onClose={() => setShowSkillModal(false)} onSuccess={() => {}} />}
      {showLearningModal && <AddLearningForm onClose={() => setShowLearningModal(false)} onSuccess={() => {}} />}
      {showPostModal && <CreatePostForm onClose={() => setShowPostModal(false)} onSuccess={() => {}} />}
    </div>
  )
}

export default DashboardLayout

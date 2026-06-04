import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSkills, createSkill } from '../../api/skills'
import { getLearningRequests, createLearningRequest } from '../../api/learningRequests'
import { getCommunityPosts, createCommunityPost } from '../../api/communityPosts'
import { Lightbulb, BookOpen, Newspaper, MessageCircle, Bell, Calendar, PlusCircle, Users } from 'lucide-react'
import axios from 'axios'
import Modal from '../../components/Modal'
import StatCard from '../../components/StatCard'
import type { ActivityItem } from '../../types'
//<Outlet /> is a placeholder that tells React Router "render the child route's component here."

const DashboardLayout = () => {
  const navigate = useNavigate()
  const [skills, setSkills] = useState<any[]>([])
  const [learningRequests, setLearningRequests] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [username, setUsername] = useState('')

  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showLearningModal, setShowLearningModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)

  const [skillTitle, setSkillTitle] = useState('')
  const [skillCategory, setSkillCategory] = useState('')
  const [skillDescription, setSkillDescription] = useState('')
  const [skillLevel, setSkillLevel] = useState('Beginner')

  const [learnTitle, setLearnTitle] = useState('')
  const [learnDescription, setLearnDescription] = useState('')
  const [learnLevel, setLearnLevel] = useState('Beginner')

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postCategory, setPostCategory] = useState('General')

  useEffect(() => {
    getSkills().then(data => setSkills(data)).catch(() => {})
    getLearningRequests().then(data => setLearningRequests(data)).catch(() => {})
    getCommunityPosts().then(data => setPosts(data)).catch(() => {})

    const token = localStorage.getItem('token')
    axios.get('http://localhost:3006/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsername(res.data.username)).catch(() => {})
  }, [])

  const handleAddSkill = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newSkill = await createSkill(skillTitle, skillCategory, skillDescription, skillLevel)
      setSkills([...skills, newSkill])
      setSkillTitle(''); setSkillCategory(''); setSkillDescription(''); setSkillLevel('Beginner')
      setShowSkillModal(false)
    } catch { }
  }

  const handleAddLearning = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      // Preferred Level is appended to description as workaround — backend has no preferredLevel field
      const fullDescription = `${learnDescription} | Preferred Level: ${learnLevel}`
      const newRequest = await createLearningRequest(learnTitle, fullDescription, 'Open')
      setLearningRequests([...learningRequests, newRequest])
      setLearnTitle(''); setLearnDescription(''); setLearnLevel('Beginner')
      setShowLearningModal(false)
    } catch { }
  }

  const recentActivity: ActivityItem[] = [
    ...skills.map(s => ({ label: s.title, type: 'Skill', createdAt: s.createdAt })),
    ...learningRequests.map(l => ({ label: l.title, type: 'Learning Request', createdAt: l.createdAt })),
    ...posts.map(p => ({ label: p.title, type: 'Community Post', createdAt: p.createdAt })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  const activityIcon = (type: string) => {
    if (type === 'Skill') return <Lightbulb size={16} className="text-indigo-600" />
    if (type === 'Learning Request') return <BookOpen size={16} className="text-purple-600" />
    return <Newspaper size={16} className="text-blue-600" />
  }

  const handleCreatePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newPost = await createCommunityPost(postTitle, postContent, postCategory)
      setPosts([newPost, ...posts])
      setPostTitle(''); setPostContent(''); setPostCategory('General')
      setShowPostModal(false)
    } catch { }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const cards = [
    { label: 'My Skills', count: skills.length, icon: <Lightbulb size={32} />, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'Learning Requests', count: learningRequests.length, icon: <BookOpen size={32} />, bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Community Posts', count: posts.length, icon: <Newspaper size={32} />, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Messages', count: 'Coming Soon', icon: <MessageCircle size={32} />, bg: 'bg-pink-50', color: 'text-pink-600' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between py-8 px-6">
        <div>
          <h2 className="text-xl font-bold text-indigo-900 mb-10">SeniorCare Hub</h2>
          <ul className="flex flex-col gap-4 list-none">
            <li><NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>My Profile</NavLink></li>
            <li><NavLink to="/dashboard/skills" className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>My Skills</NavLink></li>
            <li><NavLink to="/dashboard/learning" className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>Learning Requests</NavLink></li>
            <li><NavLink to="/dashboard/community" className={({ isActive }) => isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'}>Community Board</NavLink></li>
          </ul>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Logout</button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="flex items-center justify-between bg-white px-10 py-4 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Welcome Back, <span className="text-indigo-600">{username || '...'}</span> 👋</h3>
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

        {/* Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 py-8">
          {cards.map(card => (
            <StatCard key={card.label} label={card.label} count={card.count} icon={card.icon} bg={card.bg} color={card.color} />
          ))}
        </div>

        {/* Recent Activity + Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 pb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h4>
            {recentActivity.length === 0 ? (
              <p className="text-gray-400 text-sm">No recent activity yet.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    {activityIcon(item.type)}
                    <span><span className="font-medium">{item.type}:</span> {item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Upcoming Events</h4>
            <div className="flex items-center gap-3 text-gray-400">
              <Calendar size={20} />
              <p className="text-sm">No upcoming events scheduled.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-10 pb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h4>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowSkillModal(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
              <Lightbulb size={16} /> Add Skill
            </button>
            <button onClick={() => setShowLearningModal(true)} className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
              <BookOpen size={16} /> New Learning Request
            </button>
            <button onClick={() => setShowPostModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              <PlusCircle size={16} /> Create Post
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-600 px-5 py-2 rounded-lg cursor-not-allowed">
              <Users size={16} /> Browse Members
            </button>
          </div>
        </div>

        <main className="px-10 pb-10">
          <Outlet />
        </main>

      </div>

      {/* Add Skill Modal */}
      {showSkillModal && (
        <Modal title="Add Skill" onClose={() => setShowSkillModal(false)}>
          <form onSubmit={handleAddSkill} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="skillTitle" className="text-sm font-medium text-gray-700">Skill Title</label>
              <input id="skillTitle" type="text" value={skillTitle} onChange={e => setSkillTitle(e.target.value)} placeholder='e.g. "Photography"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="skillCategory" className="text-sm font-medium text-gray-700">Category</label>
              <input id="skillCategory" type="text" value={skillCategory} onChange={e => setSkillCategory(e.target.value)} placeholder='e.g. "Arts"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="skillDescription" className="text-sm font-medium text-gray-700">Description</label>
              <textarea id="skillDescription" value={skillDescription} onChange={e => setSkillDescription(e.target.value)} placeholder="Describe your skill" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" rows={3} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="skillLevel" className="text-sm font-medium text-gray-700">Proficiency Level</label>
              <select id="skillLevel" value={skillLevel} onChange={e => setSkillLevel(e.target.value)} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Add Skill</button>
          </form>
        </Modal>
      )}

      {/* New Learning Request Modal */}
      {showLearningModal && (
        <Modal title="New Learning Request" onClose={() => setShowLearningModal(false)}>
          <form onSubmit={handleAddLearning} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="learnTitle" className="text-sm font-medium text-gray-700">What do you want to learn?</label>
              <input id="learnTitle" type="text" value={learnTitle} onChange={e => setLearnTitle(e.target.value)} placeholder='e.g. "Basic Photography"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="learnDescription" className="text-sm font-medium text-gray-700">Describe your learning goal</label>
              <textarea id="learnDescription" value={learnDescription} onChange={e => setLearnDescription(e.target.value)} placeholder="Write a short description" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" rows={3} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="learnLevel" className="text-sm font-medium text-gray-700">Preferred Level</label>
              <select id="learnLevel" value={learnLevel} onChange={e => setLearnLevel(e.target.value)} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="" disabled>Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button type="submit" className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Submit Request</button>
          </form>
        </Modal>
      )}

      {/* Create Post Modal */}
      {showPostModal && (
        <Modal title="Create Post" onClose={() => setShowPostModal(false)}>
          <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="postTitle" className="text-sm font-medium text-gray-700">Post Title</label>
              <input id="postTitle" type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} placeholder='e.g. "Weekend Gardening Workshop"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="postContent" className="text-sm font-medium text-gray-700">Content</label>
              <textarea id="postContent" value={postContent} onChange={e => setPostContent(e.target.value)} placeholder="Write your post content here" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} />
            </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="postCategory" className="text-sm font-medium text-gray-700">Category</label>
                <select id="postCategory" value={postCategory} onChange={e => setPostCategory(e.target.value)} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="General">General</option>
                  <option value="Event">Event</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
              </div>
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Create Post</button>
          </form>
        </Modal>
      )}

    </div>
  )
}

export default DashboardLayout

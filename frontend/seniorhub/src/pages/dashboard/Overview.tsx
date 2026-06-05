import { Lightbulb, BookOpen, Newspaper, MessageCircle } from 'lucide-react'
import { useSkills } from '../../hooks/useSkills'
import { useLearningRequests } from '../../hooks/useLearningRequests'
import { useCommunityPosts } from '../../hooks/useCommunityPosts'
import StatCard from '../../components/ui/StatCard'
import SkillsPreview from '../../components/skills/SkillsPreview'
import LearningRequestsPreview from '../../components/learning/LearningRequestsPreview'
import CommunityPostsPreview from '../../components/community/CommunityPostsPreview'
import UpcomingEvents from '../../components/dashboard/UpcomingEvents'

const Overview = () => {
  const { skills } = useSkills()
  const { requests } = useLearningRequests()
  const { posts } = useCommunityPosts()

  const cards = [
    { label: 'My Skills', count: skills.length, icon: <Lightbulb size={24} />, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { label: 'Learning Requests', count: requests.length, icon: <BookOpen size={24} />, bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Community Posts', count: posts.length, icon: <Newspaper size={24} />, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Messages', count: 0, icon: <MessageCircle size={24} />, bg: 'bg-pink-50', color: 'text-pink-600' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsPreview skills={skills} />
        <LearningRequestsPreview requests={requests} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommunityPostsPreview posts={posts} />
        <UpcomingEvents />
      </div>
    </div>
  )
}

export default Overview

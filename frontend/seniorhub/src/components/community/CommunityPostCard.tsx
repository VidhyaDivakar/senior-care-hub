import { Newspaper } from 'lucide-react'
import type { CommunityPost } from '../../types'

type CommunityPostCardProps = {
  post: CommunityPost
}

const gradients = [
  'from-blue-400 to-indigo-500',
  'from-teal-400 to-blue-500',
  'from-emerald-400 to-cyan-500',
  'from-cyan-400 to-teal-500',
  'from-sky-400 to-blue-500',
  'from-green-400 to-emerald-500',
  'from-indigo-400 to-cyan-500',
  'from-blue-500 to-teal-400',
]

const getGradient = (str: string) => {
  const hash = str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

const categoryStyle: Record<string, string> = {
  General: 'bg-gray-100 text-gray-700',
  Event: 'bg-blue-100 text-blue-700',
  Announcement: 'bg-red-100 text-red-700',
  Workshop: 'bg-orange-100 text-orange-700',
  Volunteer: 'bg-green-100 text-green-700',
}

const CommunityPostCard = ({ post }: CommunityPostCardProps) => {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
      <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${getGradient(post.title)} flex items-center justify-center flex-shrink-0`}>
        <Newspaper size={20} className="text-white" />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <h5 className="font-semibold text-gray-800 text-sm truncate">{post.title}</h5>
        <p className="text-xs text-gray-500 line-clamp-2">{post.content}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${categoryStyle[post.category]}`}>
          {post.category}
        </span>
      </div>
    </div>
  )
}

export default CommunityPostCard

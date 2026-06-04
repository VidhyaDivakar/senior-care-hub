import type { CommunityPost } from '../../types'

type CommunityPostCardProps = {
  post: CommunityPost
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
      {/* Image placeholder — swap src when image is available */}
      <div className="w-12 h-12 rounded-md bg-blue-100 flex-shrink-0" />

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

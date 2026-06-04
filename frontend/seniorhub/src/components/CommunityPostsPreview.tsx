import { useNavigate } from 'react-router-dom'
import CommunityPostCard from './CommunityPostCard'
import type { CommunityPost } from '../types'

type CommunityPostsPreviewProps = {
  posts: CommunityPost[]
}

const CommunityPostsPreview = ({ posts }: CommunityPostsPreviewProps) => {
  const navigate = useNavigate()
  const preview = posts.slice(0, 2)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800">Community Posts</h4>
        {posts.length > 0 && (
          <button
            onClick={() => navigate('/dashboard/community')}
            className="text-sm text-blue-600 hover:underline"
          >
            View All →
          </button>
        )}
      </div>

      {preview.length === 0 ? (
        <p className="text-gray-400 text-sm">No community posts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {preview.map(post => (
            <CommunityPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommunityPostsPreview

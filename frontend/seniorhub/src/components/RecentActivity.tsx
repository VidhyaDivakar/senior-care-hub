import { Lightbulb, BookOpen, Newspaper } from 'lucide-react'
import type { ActivityItem } from '../types'

type RecentActivityProps = {
  activities: ActivityItem[]
}

const activityIcon = (type: string) => {
  if (type === 'Skill') return <Lightbulb size={16} className="text-indigo-600" />
  if (type === 'Learning Request') return <BookOpen size={16} className="text-purple-600" />
  return <Newspaper size={16} className="text-blue-600" />
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h4>
      {activities.length === 0 ? (
        <p className="text-gray-400 text-sm">No recent activity yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {activities.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
              {activityIcon(item.type)}
              <span><span className="font-medium">{item.type}:</span> {item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecentActivity

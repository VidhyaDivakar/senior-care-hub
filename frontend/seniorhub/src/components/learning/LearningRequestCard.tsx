import { BookOpen } from 'lucide-react'
import type { LearningRequest } from '../../types'

type LearningRequestCardProps = {
  request: LearningRequest
}

const gradients = [
  'from-purple-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-blue-400 to-violet-500',
  'from-fuchsia-400 to-purple-500',
  'from-indigo-400 to-blue-500',
  'from-pink-400 to-rose-500',
  'from-cyan-400 to-blue-500',
  'from-sky-400 to-indigo-500',
]

const getGradient = (str: string) => {
  const hash = str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

const statusStyle: Record<string, string> = {
  'Open': 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Completed': 'bg-green-100 text-green-700',
}

const LearningRequestCard = ({ request }: LearningRequestCardProps) => {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
      <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${getGradient(request.title)} flex items-center justify-center flex-shrink-0`}>
        <BookOpen size={20} className="text-white" />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <h5 className="font-semibold text-gray-800 text-sm truncate">{request.title}</h5>
        <p className="text-xs text-gray-500 line-clamp-2">{request.description}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${statusStyle[request.status]}`}>
          {request.status}
        </span>
      </div>
    </div>
  )
}

export default LearningRequestCard

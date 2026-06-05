import type { LearningRequest } from '../../types'

type LearningRequestCardProps = {
  request: LearningRequest
}

const statusStyle: Record<string, string> = {
  'Open': 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Completed': 'bg-green-100 text-green-700',
}

const LearningRequestCard = ({ request }: LearningRequestCardProps) => {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(request.title)}/64/64`}
        alt={request.title}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />
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

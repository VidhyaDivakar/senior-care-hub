import { Calendar } from 'lucide-react'

const UpcomingEvents = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Upcoming Events</h4>
      <div className="flex items-center gap-3 text-gray-400">
        <Calendar size={20} />
        <p className="text-sm">No upcoming events scheduled.</p>
      </div>
    </div>
  )
}

export default UpcomingEvents

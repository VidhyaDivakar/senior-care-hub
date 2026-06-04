import { Lightbulb, BookOpen, PlusCircle, Users } from 'lucide-react'

type QuickActionsProps = {
  onAddSkill: () => void
  onNewLearning: () => void
  onCreatePost: () => void
}

const QuickActions = ({ onAddSkill, onNewLearning, onCreatePost }: QuickActionsProps) => {
  return (
    <div className="px-10 pb-8">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h4>
      <div className="flex flex-wrap gap-4">
        <button onClick={onAddSkill} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
          <Lightbulb size={16} /> Add Skill
        </button>
        <button onClick={onNewLearning} className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
          <BookOpen size={16} /> New Learning Request
        </button>
        <button onClick={onCreatePost} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          <PlusCircle size={16} /> Create Post
        </button>
        <button className="flex items-center gap-2 bg-gray-200 text-gray-600 px-5 py-2 rounded-lg cursor-not-allowed">
          <Users size={16} /> Browse Members
        </button>
      </div>
    </div>
  )
}

export default QuickActions

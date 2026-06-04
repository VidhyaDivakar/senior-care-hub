import { Lightbulb } from 'lucide-react'
import type { Skill } from '../types'

type SkillCardProps = {
  skill: Skill
}

const levelStyle: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Image placeholder */}
      <div className="bg-indigo-100 flex items-center justify-center h-28">
        <Lightbulb size={40} className="text-indigo-400" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h5 className="font-semibold text-gray-800">{skill.title}</h5>
        <p className="text-sm text-gray-500 line-clamp-2">{skill.description}</p>
        <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${levelStyle[skill.proficiencyLevel]}`}>
          {skill.proficiencyLevel}
        </span>
      </div>
    </div>
  )
}

export default SkillCard

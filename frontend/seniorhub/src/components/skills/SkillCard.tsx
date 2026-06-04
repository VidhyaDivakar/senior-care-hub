import { Lightbulb } from 'lucide-react'
import type { Skill } from '../../types'

type SkillCardProps = {
  skill: Skill
}

const gradients = [
  'from-indigo-400 to-purple-500',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-pink-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-rose-500',
  'from-teal-400 to-cyan-500',
  'from-violet-400 to-indigo-500',
  'from-rose-400 to-pink-500',
]

const getGradient = (str: string) => {
  const hash = str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

const levelStyle: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
      <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${getGradient(skill.title)} flex items-center justify-center flex-shrink-0`}>
        <Lightbulb size={20} className="text-white" />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <h5 className="font-semibold text-gray-800 text-sm truncate">{skill.title}</h5>
        <p className="text-xs text-gray-500 line-clamp-2">{skill.description}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${levelStyle[skill.proficiencyLevel]}`}>
          {skill.proficiencyLevel}
        </span>
      </div>
    </div>
  )
}

export default SkillCard

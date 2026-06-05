import type { Skill } from '../../types'

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
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(skill.title)}/64/64`}
        alt={skill.title}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />
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

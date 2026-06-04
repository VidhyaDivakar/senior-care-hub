import { useNavigate } from 'react-router-dom'
import SkillCard from './SkillCard'
import type { Skill } from '../../types'

type SkillsPreviewProps = {
  skills: Skill[]
}

const SkillsPreview = ({ skills }: SkillsPreviewProps) => {
  const navigate = useNavigate()
  const preview = skills.slice(0, 2)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800">My Skills</h4>
        {skills.length > 0 && (
          <button
            onClick={() => navigate('/dashboard/skills')}
            className="text-sm text-indigo-600 hover:underline"
          >
            View All →
          </button>
        )}
      </div>

      {preview.length === 0 ? (
        <p className="text-gray-400 text-sm">No skills added yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {preview.map(skill => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillsPreview

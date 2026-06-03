import { useState, useEffect } from 'react'
import { getSkills, createSkill } from '../../api/skills'

type Skill = {
  _id: string
  title: string
  category: string
  description: string
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced'
}

const MySkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [proficiencyLevel, setProficiencyLevel] = useState('Beginner')

  useEffect(() => {
    getSkills()
      .then(data => setSkills(data))
      .catch(() => setError('Failed to load skills'))
  }, [])

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newSkill = await createSkill(title, category, description, proficiencyLevel)
      setSkills([...skills, newSkill])
      setTitle('')
      setCategory('')
      setDescription('')
      setProficiencyLevel('Beginner')
    } catch {
      setError('Failed to create skill')
    }
  }

  return (
    <div>
      <h2>My Skills</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter skill title"
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label>Proficiency Level</label>
          <select value={proficiencyLevel} onChange={(e) => setProficiencyLevel(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit">Add Skill</button>
      </form>

      {skills.length === 0 ? (
        <p>No skills added yet.</p>
      ) : (
        <ul>
          {skills.map(skill => (
            <li key={skill._id}>
              <h3>{skill.title}</h3>
              <p>Category: {skill.category}</p>
              <p>{skill.description}</p>
              <p>Level: {skill.proficiencyLevel}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MySkills
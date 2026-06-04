export type Skill = {
  _id: string
  title: string
  category: string
  description: string
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  createdAt: string
}

export type LearningRequest = {
  _id: string
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Completed'
  createdAt: string
}

export type CommunityPost = {
  _id: string
  title: string
  content: string
  category: 'Event' | 'Announcement' | 'Workshop' | 'Volunteer' | 'General'
  user: { _id: string; username: string; email: string }
  createdAt: string
}

export type ActivityItem = {
  label: string
  type: string
  createdAt: string
}

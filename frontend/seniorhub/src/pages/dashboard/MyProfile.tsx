import { useState, useEffect } from 'react'
import { Pencil, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Modal from '../../components/ui/Modal'
import { getProfile, saveProfile } from '../../api/profile'

const memberSince = (id: string) => {
  try {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000
    return new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return 'N/A'
  }
}

const MyProfile = () => {
  const { user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    getProfile().then(data => {
      setPhone(data.phone || '')
      setDob(data.dob || '')
      setLocation(data.location || '')
      setBio(data.bio || '')
    }).catch(() => {})
  }, [])

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const inputClass = (editable: boolean) =>
    `w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${editable ? 'bg-white text-gray-800' : 'bg-gray-50 text-gray-500 cursor-default'}`

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
          {user?.username?.[0]?.toUpperCase() ?? '?'}
        </div>
        <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
      </div>

      <fieldset>
        <legend className="sr-only">Profile Information</legend>

        {/* 3 + 3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="fullName" type="text" value={user?.username ?? ''} readOnly aria-label="Full Name" className={inputClass(false)} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input id="email" type="email" value={user?.email ?? ''} readOnly aria-label="Email Address" className={inputClass(false)} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} readOnly={!isEditing} aria-label="Phone Number" placeholder={isEditing ? 'Enter phone number' : 'Not provided'} className={inputClass(isEditing)} />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input id="dob" type="date" value={dob} onChange={e => setDob(e.target.value)} readOnly={!isEditing} aria-label="Date of Birth" className={inputClass(isEditing)} />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input id="location" type="text" value={location} onChange={e => setLocation(e.target.value)} readOnly={!isEditing} aria-label="Location" placeholder={isEditing ? 'Enter your location' : 'Not provided'} className={inputClass(isEditing)} />
            </div>
            <div>
              <label htmlFor="memberSince" className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
              <input id="memberSince" type="text" value={user?._id ? memberSince(user._id) : 'N/A'} readOnly aria-label="Member Since" className={inputClass(false)} />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            readOnly={!isEditing}
            aria-label="Bio"
            placeholder={isEditing ? 'Tell the community about yourself...' : 'No bio added yet.'}
            rows={4}
            className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none ${isEditing ? 'bg-white text-gray-800' : 'bg-gray-50 text-gray-500 cursor-default'}`}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={async () => {
              if (isEditing) {
                await saveProfile({ phone, dob, location, bio }).catch(() => {})
              }
              setIsEditing(!isEditing)
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
            aria-label="Edit Profile"
          >
            <Pencil size={15} />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 text-sm font-medium"
            aria-label="Change Password"
          >
            <Lock size={15} />
            Change Password
          </button>
        </div>
      </fieldset>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <Modal title="Change Password" onClose={() => { setShowPasswordModal(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword('') }}>
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setShowPasswordModal(false) }}>
            <div className="flex flex-col gap-1">
              <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Current Password</label>
              <input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required placeholder="Enter current password" className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</label>
              <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="Enter new password" className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm New Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Confirm new password" className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium">
              Update Password
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default MyProfile

import type { ApiUser, UserFormData } from './types'

type UserProfileProps = {
  user: ApiUser
  isEditing: boolean
  formData: UserFormData
  handleInputChange: (field: keyof UserFormData, value: string) => void
  setIsEditing: (editing: boolean) => void
  handleSaveProfile: () => void
}

const UserProfile = ({
  formData,
  handleInputChange,
  user,
  isEditing,
  setIsEditing,
  handleSaveProfile,
}: UserProfileProps) => {
  return (
    <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-xs sm:p-8'>
      <div className='flex flex-col gap-6 sm:flex-row sm:items-start'>
        <img
          src={`https://i.pravatar.cc/160?img=${user.id}`}
          alt={`${user.name}'s avatar`}
          className='h-28 w-28 rounded-2xl border border-slate-200 object-cover shadow-sm'
        />

        {!isEditing ? (
          <div className='flex-1'>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
              {user.name}
            </h1>
            <p className='mt-1 text-slate-600'>{user.email}</p>
            <p className='mt-1 text-sm text-slate-500'>{user.phone}</p>
            <p className='mt-4 rounded-xl bg-slate-50 p-4 text-slate-700'>
              {formData.bio || 'No bio yet.'}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className='mt-5 rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700'
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className='flex-1 space-y-4'>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Name'
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500'
            />
            <input
              type='email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder='Email'
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500'
            />
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder='Bio'
              rows={4}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500'
            />
            <div className='flex gap-3'>
              <button
                onClick={() => setIsEditing(false)}
                className='rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className='rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700'
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile

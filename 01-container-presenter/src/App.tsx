// import UserProfile from './components/messy-way/user-profile'
import ProfileContainer from './components/with-pattern/profile-container'

function App() {
  return (
    <div className='min-h-screen bg-slate-100'>
      {/* <UserProfile userId={7} /> */}
      <ProfileContainer userId={7} />
    </div>
  )
}

export default App

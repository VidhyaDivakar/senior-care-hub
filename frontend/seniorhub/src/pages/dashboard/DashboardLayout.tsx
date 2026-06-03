import { Outlet, NavLink, useNavigate } from 'react-router-dom'
//<Outlet /> is a placeholder that tells React Router "render the child route's component here."

const DashboardLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <nav>
        <h2>SeniorCare Hub</h2>
        <ul>
          <li><NavLink to="/dashboard">My Profile</NavLink></li>
          <li><NavLink to="/dashboard/skills">My Skills</NavLink></li>
          <li><NavLink to="/dashboard/learning">Learning Requests</NavLink></li>
          <li><NavLink to="/dashboard/community">Community Board</NavLink></li>
          <li><NavLink to="/dashboard/events">Events</NavLink></li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout

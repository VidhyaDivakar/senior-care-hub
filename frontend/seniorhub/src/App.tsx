import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import MyProfile from './pages/dashboard/MyProfile'
import MySkills from './pages/dashboard/MySkills'
import LearningRequests from './pages/dashboard/LearningRequests'
import CommunityBoard from './pages/dashboard/CommunityBoard'
import Events from './pages/dashboard/Events'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="skills" element={<MySkills />} />
          <Route path="learning" element={<LearningRequests />} />
          <Route path="community" element={<CommunityBoard />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

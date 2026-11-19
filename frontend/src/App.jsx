
import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import MainLayout from './components/layout/MainLayout'
import Patients from './pages/Patients/Patients'
import Doctors from './pages/Doctors/Doctors'
import Laboratory from './pages/Laboratory/Laboratory'
import Pharmacy from './pages/Pharmacy/Pharmacy'
import Billing from './pages/Billing/Billing'
import StaffReports from './pages/StaffReports/StaffReports'
import SettingsSecurity from './pages/SettingsSecurity/SettingsSecurity'
import Login from './pages/Login/Login'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const handleLogin = (userData) => {
    setLoggedInUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoggedInUser(null)
    setActivePage('dashboard')
  }

    if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={handleLogout}
    >
      {activePage === 'dashboard' ? (
        <Dashboard />
      ) : activePage === 'patients' ? (
        <Patients />
      ) : activePage === 'doctors' ? (
        <Doctors />
      ) : activePage === 'laboratory' ? (
        <Laboratory />
      ) : activePage === 'pharmacy' ? (
        <Pharmacy />
      ) : activePage === 'billing' ? (
        <Billing />
      ) : activePage === 'reports' ? (
        <StaffReports />
      ) : activePage === 'settings' ? (
        <SettingsSecurity />
      ) : (
        <Dashboard />
      )}
    </MainLayout>
  )
}

export default App

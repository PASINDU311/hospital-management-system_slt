
import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import MainLayout from './components/layout/MainLayout'
import Patients from './pages/Patients/Patients'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {activePage === 'dashboard' ? (
        <Dashboard />
      ) : activePage === 'patients' ? (
        <Patients />
      ) : (
        <main className="dashboard">
          <h1 style={{ color: '#123B5D' }}>
            Coming soon
          </h1>

          <p style={{ color: '#64748B' }}>
            This module will be implemented in a later development step.
          </p>

          <button
            type="button"
            onClick={() => setActivePage('dashboard')}
            style={{
              border: 0,
              borderRadius: 8,
              padding: '10px 16px',
              background: '#123B5D',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </button>
        </main>
      )}
    </MainLayout>
  )
}

export default App

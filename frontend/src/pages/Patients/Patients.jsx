
import { useEffect, useState } from 'react'
import './Patients.css'

import PatientDirectory from './PatientDirectory'
import PatientProfile from './PatientProfile'
import PatientRegistration from './PatientRegistration'
import { api } from '../../services/api'

function Patients() {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPatientForm, setShowPatientForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPatients()
  }, [])

  async function loadPatients() {
    try {
      setLoading(true)
      setError('')

      const data = await api.get('/patients')

      setPatients(data)
      setSelectedPatient(data.length > 0 ? data[0] : null)
    } catch (err) {
      setError(err.message || 'Failed to load patients.')
    } finally {
      setLoading(false)
    }
  }

  async function handlePatientSubmit(formData) {
    try {
      setError('')

      const savedPatient = await api.post('/patients', {
        ...formData,
        age: Number(formData.age),
      })

      setPatients((current) => [savedPatient, ...current])
      setSelectedPatient(savedPatient)
      setShowPatientForm(false)
    } catch (err) {
      setError(err.message || 'Failed to register patient.')
    }
  }

  return (
    <main className="dashboard patients-page">
      <section className="patients-heading">
        <div>
          <h1>Patient Management & Clinical Records</h1>
          <p>Manage patient information and clinical history.</p>
        </div>

        <button
          type="button"
          className="register-patient-button"
          onClick={() => setShowPatientForm((current) => !current)}
        >
          {showPatientForm ? 'Close Form' : '+ Register Patient'}
        </button>
      </section>

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}

      {showPatientForm && (
        <PatientRegistration
          onSubmit={handlePatientSubmit}
          onClose={() => setShowPatientForm(false)}
        />
      )}

      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <section className="patients-workspace">
          <PatientDirectory
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {selectedPatient ? (
            <PatientProfile patient={selectedPatient} />
          ) : (
            <p>No patients registered yet.</p>
          )}
        </section>
      )}
    </main>
  )
}

export default Patients

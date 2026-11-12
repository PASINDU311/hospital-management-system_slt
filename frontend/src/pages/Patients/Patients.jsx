
import { useState } from 'react'
import './Patients.css'

import PatientDirectory from './PatientDirectory'
import PatientProfile from './PatientProfile'
import PatientRegistration from './PatientRegistration'

const initialPatients = [
  { id: 'PT-9042', name: 'Nimal Kumara', age: '42', gender: 'Male', phone: '0771234567', bloodGroup: 'O+', address: 'Anuradhapura' },
  { id: 'PT-8871', name: 'Sanduni Fernando', age: '29', gender: 'Female', phone: '0712345678', bloodGroup: 'A+', address: 'Kurunegala' },
  { id: 'PT-6520', name: 'Janaka Peris', age: '64', gender: 'Male', phone: '0763456789', bloodGroup: 'B+', address: 'Kandy' },
  { id: 'PT-7391', name: 'Anjali Madushani', age: '34', gender: 'Female', phone: '0754567890', bloodGroup: 'AB+', address: 'Colombo' },
  { id: 'PT-8109', name: 'Ruwan Kumara', age: '51', gender: 'Male', phone: '0785678901', bloodGroup: 'O-', address: 'Galle' },
]

function Patients() {
  const [patients, setPatients] = useState(initialPatients)
  const [selectedPatient, setSelectedPatient] = useState(initialPatients[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [showPatientForm, setShowPatientForm] = useState(false)

  function handlePatientSubmit(formData) {
    const nextNumber = 9000 + patients.length + 1

    const newPatient = {
      ...formData,
      id: `PT-${nextNumber}`,
    }

    setPatients((current) => [newPatient, ...current])
    setSelectedPatient(newPatient)
    setShowPatientForm(false)
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

      {showPatientForm && (
        <PatientRegistration
          onSubmit={handlePatientSubmit}
          onClose={() => setShowPatientForm(false)}
        />
      )}

      <section className="patients-workspace">
        <PatientDirectory
          patients={patients}
          selectedPatient={selectedPatient}
          onSelectPatient={setSelectedPatient}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PatientProfile patient={selectedPatient} />
      </section>
    </main>
  )
}

export default Patients


function PatientDirectory({
  patients,
  selectedPatient,
  onSelectPatient,
  searchTerm,
  onSearchChange,
}) {
  const filteredPatients = patients.filter((patient) => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) return true

    return [patient.id, patient.name, patient.phone]
      .some((value) => value.toLowerCase().includes(query))
  })

  return (
    <section className="patient-directory">
      <div className="patient-directory-header">
        <div>
          <h2>Patient Directory</h2>
          <p>{patients.length} registered patients</p>
        </div>
      </div>

      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search patients..."
        className="patient-search-input"
      />

      <div className="patient-directory-list">
        {filteredPatients.map((patient) => (
          <button
            type="button"
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`patient-directory-item ${
              selectedPatient?.id === patient.id ? 'active' : ''
            }`}
          >
            <div className="patient-directory-avatar">
              {patient.name.charAt(0).toUpperCase()}
            </div>

            <div className="patient-directory-info">
              <strong>{patient.name}</strong>
              <span>{patient.id}</span>
              <small>{patient.age} years · {patient.gender}</small>
            </div>
          </button>
        ))}

        {filteredPatients.length === 0 && (
          <p className="no-patients-message">
            No matching patients found.
          </p>
        )}
      </div>
    </section>
  )
}

export default PatientDirectory

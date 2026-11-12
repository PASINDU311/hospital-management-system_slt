
import PatientClinicalTabs from './PatientClinicalTabs'

function PatientProfile({ patient }) {
  if (!patient) {
    return (
      <section className="patient-profile">
        <div className="patient-profile-empty">
          <h2>Select a Patient</h2>
          <p>
            Select a patient from the directory to view their clinical profile.
          </p>
        </div>
      </section>
    )
  }

  const vitals = [
    {
      label: 'Blood Pressure',
      value: '128/82',
      unit: 'mmHg',
      note: 'Demo value',
      icon: '🩺',
    },
    {
      label: 'Heart Rate',
      value: '76',
      unit: 'bpm',
      note: 'Demo value',
      icon: '❤️',
    },
    {
      label: 'Oxygen (SpO₂)',
      value: '99',
      unit: '%',
      note: 'Demo value',
      icon: '🫁',
    },
    {
      label: 'Temperature',
      value: '36.9',
      unit: '°C',
      note: 'Demo value',
      icon: '🌡️',
    },
    {
      label: 'BMI',
      value: '23.4',
      unit: 'kg/m²',
      note: 'Demo value',
      icon: '⚖️',
    },
  ]

  return (
    <section className="patient-profile">

      {/* Patient Header */}
      <div className="patient-profile-header">
        <div className="patient-profile-avatar">
          {patient.name.charAt(0).toUpperCase()}
        </div>

        <div className="patient-profile-heading-info">
          <h2>{patient.name}</h2>

          <p>
            Patient ID: <strong>{patient.id}</strong>
          </p>

          <div className="patient-profile-badges">
            <span className="patient-profile-status">
              Registered Patient
            </span>

            <span className="patient-blood-badge">
              {patient.bloodGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="patient-profile-details">
        <h3>Personal Information</h3>

        <div className="patient-profile-grid">
          <div>
            <small>Age</small>
            <strong>{patient.age} years</strong>
          </div>

          <div>
            <small>Gender</small>
            <strong>{patient.gender}</strong>
          </div>

          <div>
            <small>Phone Number</small>
            <strong>{patient.phone}</strong>
          </div>

          <div>
            <small>Blood Group</small>
            <strong>{patient.bloodGroup}</strong>
          </div>

          <div>
            <small>Address</small>
            <strong>{patient.address}</strong>
          </div>
        </div>
      </div>

      {/* Clinical Vitals */}
      <div className="patient-vitals-section">
        <div className="patient-section-heading">
          <div>
            <h3>Clinical Vitals</h3>
            <p>
              Illustrative readings — not actual patient measurements.
            </p>
          </div>
        </div>

        <div className="patient-vitals-grid">
          {vitals.map((vital) => (
            <article className="patient-vital-card" key={vital.label}>
              <div className="patient-vital-top">
                <span>{vital.label}</span>
                <span className="patient-vital-icon">
                  {vital.icon}
                </span>
              </div>

              <div className="patient-vital-reading">
                <strong>{vital.value}</strong>
                <small>{vital.unit}</small>
              </div>

              <span className="patient-vital-note">
                {vital.note}
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* Clinical Record Tabs */}
      <PatientClinicalTabs patient={patient} />

    </section>
  )
}

export default PatientProfile

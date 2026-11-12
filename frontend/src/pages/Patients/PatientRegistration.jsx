
function PatientRegistration({ onSubmit, onClose }) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newPatient = {
      name: formData.get('name').trim(),
      age: formData.get('age'),
      gender: formData.get('gender'),
      phone: formData.get('phone').trim(),
      bloodGroup: formData.get('bloodGroup'),
      address: formData.get('address').trim(),
    }

    onSubmit(newPatient)
  }

  return (
    <section className="patient-registration-form">
      <div className="patient-registration-heading">
        <div>
          <h2>New Patient Registration</h2>
          <p>Enter the patient's personal information.</p>
        </div>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="patient-form-grid">
          <label>
            Full Name
            <input
              name="name"
              type="text"
              placeholder="Patient full name"
              required
            />
          </label>

          <label>
            Age
            <input
              name="age"
              type="number"
              min="0"
              max="120"
              placeholder="Age"
              required
            />
          </label>

          <label>
            Gender
            <select name="gender" defaultValue="Male">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Phone Number
            <input
              name="phone"
              type="tel"
              placeholder="07XXXXXXXX"
              pattern="0[0-9]{9}"
              required
            />
          </label>

          <label>
            Blood Group
            <select name="bloodGroup" defaultValue="Unknown">
              <option>Unknown</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </label>

          <label>
            Address
            <input
              name="address"
              type="text"
              placeholder="City / address"
              required
            />
          </label>
        </div>

        <button type="submit" className="save-patient-button">
          Save Patient
        </button>
      </form>
    </section>
  )
}

export default PatientRegistration

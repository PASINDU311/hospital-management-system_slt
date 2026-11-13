
import React, { useState } from 'react';
import './DoctorRegistration.css';

function DoctorRegistration({ onClose, onSave, doctorToEdit }) {
const [formData, setFormData] = useState({
  firstName: doctorToEdit?.firstName || '',
  lastName: doctorToEdit?.lastName || '',
  email: doctorToEdit?.email || '',
  phone: doctorToEdit?.phone || '',
  gender: doctorToEdit?.gender || '',
  dateOfBirth: doctorToEdit?.dateOfBirth || '',
  specialization: doctorToEdit?.specialization || '',
  department: doctorToEdit?.department || '',
  qualification: doctorToEdit?.qualification || '',
  experience: doctorToEdit?.experience || '',
  licenseNumber: doctorToEdit?.licenseNumber || '',
  consultationFee: doctorToEdit?.consultationFee || '',
  address: doctorToEdit?.address || '',
});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="doctor-registration-overlay">
      <div className="doctor-registration-modal">

        <div className="doctor-registration-header">
          <div>
            <span className="material-symbols-outlined">
              medical_information
            </span>
            <h2>{doctorToEdit ? 'Edit Doctor Details' : 'Register New Doctor'}</h2>
            <p>Enter the doctor's personal and professional details.</p>
          </div>

          <button
            type="button"
            className="doctor-registration-close"
            onClick={onClose}
            aria-label="Close registration form"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="doctor-form-section">
            <h3>Personal Information</h3>

            <div className="doctor-form-grid">
              <div className="doctor-form-field">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="doctor-form-field">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div className="doctor-form-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  required
                />
              </div>

              <div className="doctor-form-field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="doctor-form-field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="doctor-form-field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="doctor-form-section">
            <h3>Professional Information</h3>

            <div className="doctor-form-grid">
              <div className="doctor-form-field">
                <label>Specialization *</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Gynecology">Gynecology</option>
                </select>
              </div>

              <div className="doctor-form-field">
                <label>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="doctor-form-field">
                <label>Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g. MBBS, MD"
                  required
                />
              </div>

              <div className="doctor-form-field">
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  min="0"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Enter experience"
                />
              </div>

              <div className="doctor-form-field">
                <label>Medical License Number *</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Enter license number"
                  required
                />
              </div>

              <div className="doctor-form-field">
                <label>Consultation Fee (LKR)</label>
                <input
                  type="number"
                  name="consultationFee"
                  min="0"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  placeholder="Enter fee"
                />
              </div>
            </div>
          </div>

          <div className="doctor-form-section">
            <h3>Contact Information</h3>

            <div className="doctor-form-field">
              <label>Residential Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter residential address"
                rows="3"
              />
            </div>
          </div>

          <div className="doctor-registration-actions">
            <button
              type="button"
              className="doctor-form-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="doctor-form-submit"
            >
              <span className="material-symbols-outlined">
                person_add
              </span>
              {doctorToEdit ? 'Update Doctor' : 'Register Doctor'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default DoctorRegistration;


import React, { useState } from 'react';
import './AppointmentBooking.css';

function AppointmentBooking({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientMrn: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    visitType: 'First Visit',
    priority: 'Routine',
    symptoms: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave(formData);
  };

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal">
        <div className="appointment-modal-header">
          <div>
            <span className="appointment-modal-eyebrow">
              APPOINTMENT MANAGEMENT
            </span>
            <h2>Book New Appointment</h2>
            <p>Enter patient and consultation details below.</p>
          </div>

          <button
            type="button"
            className="appointment-modal-close"
            onClick={onClose}
            aria-label="Close appointment form"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="appointment-modal-body">
            <div className="appointment-form-grid">
              <div className="appointment-form-field">
                <label htmlFor="patientName">Patient Name *</label>
                <input
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  required
                />
              </div>

              <div className="appointment-form-field">
                <label htmlFor="patientMrn">Patient MRN *</label>
                <input
                  id="patientMrn"
                  name="patientMrn"
                  value={formData.patientMrn}
                  onChange={handleChange}
                  placeholder="Enter patient MRN"
                  required
                />
              </div>

              <div className="appointment-form-field">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              <div className="appointment-form-field">
                <label htmlFor="doctor">Doctor *</label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Donald Vance">Dr. Donald Vance</option>
                  <option value="Dr. Elena Thorne">Dr. Elena Thorne</option>
                  <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
                  <option value="Dr. Mateo Ramos">Dr. Mateo Ramos</option>
                </select>
              </div>

              <div className="appointment-form-field">
                <label htmlFor="appointmentDate">Appointment Date *</label>
                <input
                  id="appointmentDate"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="appointment-form-field">
                <label htmlFor="appointmentTime">Time Slot *</label>
                <select
                  id="appointmentTime"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                </select>
              </div>

              <div className="appointment-form-field">
                <label htmlFor="visitType">Visit Type *</label>
                <select
                  id="visitType"
                  name="visitType"
                  value={formData.visitType}
                  onChange={handleChange}
                  required
                >
                  <option value="First Visit">First Visit</option>
                  <option value="Routine Follow-up">Routine Follow-up</option>
                  <option value="Post-Op Check">Post-Op Check</option>
                </select>
              </div>

              <div className="appointment-form-field">
                <label htmlFor="priority">Clinical Priority *</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="appointment-form-field full-width">
                <label htmlFor="symptoms">Symptoms / Clinical Indication</label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows="3"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Enter symptoms or clinical indication..."
                />
              </div>
            </div>
          </div>

          <div className="appointment-modal-actions">
            <button
              type="button"
              className="appointment-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="appointment-save-btn"
            >
              <span className="material-symbols-outlined">event_available</span>
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentBooking;

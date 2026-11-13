
import React, { useState } from 'react';
import './Doctors.css';
import DoctorRegistration from '../../components/doctors/DoctorRegistration';

function Doctors() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [doctorToEdit, setDoctorToEdit] = useState(null);
    const handleRegisterDoctor = (doctorData) => {
        const newDoctor = {
            ...doctorData,
            id: Date.now(),
        };

        setRegisteredDoctors((previousDoctors) => [
            ...previousDoctors,
            newDoctor,
        ]);

        setIsRegistrationOpen(false);
    };

    const handleUpdateDoctor = (doctorData) => {
        setRegisteredDoctors((previousDoctors) =>
            previousDoctors.map((doctor) =>
                doctor.id === doctorToEdit.id
                    ? { ...doctorData, id: doctorToEdit.id }
                    : doctor
                )
        );

        setDoctorToEdit(null);
        setIsRegistrationOpen(false);
    };
  const summaryCards = [
    {
      title: 'Active Doctors',
      value: '42',
      total: '/ 48 On Duty',
      icon: 'stethoscope',
      color: 'teal',
    },
    {
      title: 'Scheduled Today',
      value: '148',
      total: 'Bookings',
      icon: 'event_available',
      color: 'blue',
    },
    {
      title: 'Slot Capacity',
      value: '84%',
      total: 'Peak Rate',
      icon: 'pie_chart',
      color: 'purple',
    },
    {
      title: 'Cancelled / Void',
      value: '4',
      total: 'Slots freed',
      icon: 'event_busy',
      color: 'red',
    },
  ];

  return (
    <div className="doctors-page">

      {/* Doctors Dashboard Header */}
      <section className="doctors-hero">
        <div className="doctors-hero-info">
          <span className="doctors-eyebrow">
            CENTRAL CLINICAL ROSTER
          </span>

          <h1>
            Doctor Rostering
            <br />
            & Appointment Scheduling
          </h1>

          <p>
            Coordinate outpatient clinics, physician surgical
            rotations, and live consultation pipelines across
            hospital departments.
          </p>
        </div>

        <div className="doctors-kpi-grid">
          {summaryCards.map((card) => (
            <div
              className="doctors-kpi-card"
              key={card.title}
            >
              <div className={`doctors-kpi-icon ${card.color}`}>
                <span className="material-symbols-outlined">
                  {card.icon}
                </span>
              </div>

              <div className="doctors-kpi-details">
                <p>{card.title}</p>

                <div className="doctors-kpi-value">
                  <strong>{card.value}</strong>
                  <span>{card.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

        {isRegistrationOpen && (
        <DoctorRegistration
            onClose={() => {
            setIsRegistrationOpen(false);
            setDoctorToEdit(null);
            }}
            onSave={doctorToEdit ? handleUpdateDoctor : handleRegisterDoctor}
            doctorToEdit={doctorToEdit}
        />
        )}

      {/* Schedule Navigation */}
      <section className="schedule-navigation">

        <div className="schedule-view-tabs">
          <button className="schedule-tab active">
            <span className="material-symbols-outlined">calendar_view_week</span>
            Weekly Matrix
          </button>

          <button className="schedule-tab">
            <span className="material-symbols-outlined">view_day</span>
            Day Schedule
          </button>

          <button className="schedule-tab">
            <span className="material-symbols-outlined">table_chart</span>
            Roster Table
          </button>

          <button className="schedule-tab">
            <span className="material-symbols-outlined">domain</span>
            Department View
          </button>
        </div>

        <div className="schedule-navigation-actions">
          <button className="week-navigation-btn">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className="current-week">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>
              Week of
              <strong> Nov 09 – Nov 15, 2026</strong>
            </span>
          </div>

          <button className="week-navigation-btn">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          <button className="today-btn">Today</button>

          <button className="new-schedule-btn">
            <span className="material-symbols-outlined">event_note</span>
            New Doctor Schedule
          </button>

          <button className="book-appointment-btn">
            <span className="material-symbols-outlined">add_circle</span>
            Book New Appointment
          </button>

          <button
            type="button"
            className="register-doctor-btn"
            onClick={() => setIsRegistrationOpen(true)}
          >
            <span className="material-symbols-outlined">person_add</span>
            Register New Doctor
          </button>
        </div>

      </section>


      {/* Department Schedule Matrix */}
      <section className="department-schedule">

        <div className="schedule-matrix-header">
          <div className="schedule-matrix-title">
            <span className="matrix-title-dot"></span>
            <div>
              <h2>Department Schedule Matrix</h2>
              <p>Live clinical bed & cabin assignment (Monday – Sunday)</p>
            </div>
          </div>

          <div className="schedule-legend">
            <span><i className="legend-confirmed"></i> Confirmed Consultation</span>
            <span><i className="legend-progress"></i> In-Consultation</span>
            <span><i className="legend-surgery"></i> Surgical Procedure</span>
            <span><i className="legend-available"></i> Available / Walk-in</span>
          </div>
        </div>

        <div className="schedule-matrix-scroll">
          <table className="schedule-matrix-table">
            <thead>
              <tr>
                <th>Specialist & Unit</th>
                <th>MON 09</th>
                <th>TUE 10</th>
                <th>WED 11</th>
                <th>THU 12</th>
                <th>FRI 13</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>Dr. Donald Vance</strong>
                  <small>Cardiology · Suite 302</small>
                  <small>08:00 – 16:00</small>
                </td>
                <td><div className="matrix-event confirmed">ECG Consultation<small>09:00 – 10:30</small></div></td>
                <td><div className="matrix-event confirmed">Cardiac Clinic<small>10:00 – 12:00</small></div></td>
                <td><div className="matrix-event progress">Cath Lab OR 2<small>08:30 – 13:00</small></div></td>
                <td><div className="matrix-event confirmed">Cardio Echo Clinic<small>09:00 – 11:00</small></div></td>
                <td><div className="matrix-event confirmed">Outpatient Clinic<small>13:00 – 17:00</small></div></td>
              </tr>

              <tr>
                <td>
                  <strong>Dr. Elena Thorne</strong>
                  <small>Neurology · Suite 410</small>
                  <small>09:00 – 17:00</small>
                </td>
                <td><div className="matrix-event confirmed">EEG Diagnostic<small>09:00 – 11:30</small></div></td>
                <td><div className="matrix-event confirmed">Stroke Clinic<small>10:00 – 14:00</small></div></td>
                <td><div className="matrix-event confirmed">Neuro Rounds<small>10:00 – 11:00</small></div></td>
                <td><div className="matrix-event available">Academic Rounds</div></td>
                <td><div className="matrix-event confirmed">Outpatient Follow-ups<small>13:00 – 17:00</small></div></td>
              </tr>

              <tr>
                <td>
                  <strong>Dr. Sarah Jenkins</strong>
                  <small>General Surgery · OR Block A</small>
                  <small>07:30 – 15:30</small>
                </td>
                <td><div className="matrix-event surgery">Laparoscopy OR 1<small>08:00 – 12:00</small></div></td>
                <td><div className="matrix-event surgery">Post-Op Wound Review<small>11:00 – 15:00</small></div></td>
                <td><div className="matrix-event surgery">Cholecystectomy OR 4<small>09:30 – 13:00</small></div></td>
                <td><div className="matrix-event confirmed">Surgical Consults<small>09:00 – 12:00</small></div></td>
                <td><div className="matrix-event surgery">Hernia Repair Batch<small>08:00 – 12:30</small></div></td>
              </tr>

              <tr>
                <td>
                  <strong>Dr. Mateo Ramos</strong>
                  <small>Pediatrics · Wing B</small>
                  <small>08:00 – 16:00</small>
                </td>
                <td><div className="matrix-event confirmed">Well-Baby Screening<small>09:00 – 12:00</small></div></td>
                <td><div className="matrix-event confirmed">Immunization Center<small>10:00 – 15:00</small></div></td>
                <td><div className="matrix-event confirmed">Pediatric Clinic<small>09:00 – 12:00</small></div></td>
                <td><div className="matrix-event confirmed">Developmental Check<small>09:00 – 13:00</small></div></td>
                <td><div className="matrix-event confirmed">Peds Consultation<small>11:00 – 16:00</small></div></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="schedule-matrix-footer">
          <span>Showing 4 of 42 specialists</span>
          <span>Use filters to switch between departments</span>
          
          <button type="button">
            <span className="material-symbols-outlined">download</span>
            Export Weekly PDF Roster
          </button>
        </div>

      </section>
      
      {/* Registered Doctors Directory */}
      <section className="registered-doctors-section">
        <div className="appointment-queue-header">
          <div>
            <h2>Registered Doctors</h2>
            <p>Doctor registration directory</p>
          </div>
          <span className="active-appointments-count">
            {registeredDoctors.length} Registered
          </span>
        </div>

        {registeredDoctors.length === 0 ? (
          <p>No doctors registered yet.</p>
        ) : (
          <div>
            {registeredDoctors.map((doctor) => (
              <div key={doctor.id}>
                <strong>
                  Dr. {doctor.firstName} {doctor.lastName}
                </strong>
                <p>{doctor.specialization} · {doctor.department}</p>
                <p>{doctor.email} · {doctor.phone}</p>
                <p>License: {doctor.licenseNumber}</p>
                <button
                    type="button"
                    onClick={() => {
                        setDoctorToEdit(doctor);
                        setIsRegistrationOpen(true);
                    }}
                >
                    <span className="material-symbols-outlined">edit</span>
                    Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* Appointment Queue & Triage Management */}
      <section className="appointment-queue-section">

        <div className="appointment-queue-header">
          <div>
            <h2>Appointment Queue & Triage Management</h2>
            <p>Real-time outpatient reception and priority triage</p>
          </div>

          <div className="queue-header-actions">
            <span className="active-appointments-count">
              14 Active Today
            </span>

            <select aria-label="Filter appointments by status">
              <option>All Statuses</option>
              <option>Confirmed</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <button type="button" className="queue-refresh-btn">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        <div className="appointment-table-scroll">
          <table className="appointment-queue-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient & MRN</th>
                <th>Physician & Dept.</th>
                <th>Visit Type</th>
                <th>Cabin / Room</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>10:15 AM</td>
                <td>
                  <strong>Marcus Henderson</strong>
                  <small>MRN-90241-CA</small>
                </td>
                <td>
                  <strong>Dr. Donald Vance</strong>
                  <small>Cardiology</small>
                </td>
                <td><span className="visit-type urgent">Urgent Triage</span></td>
                <td>Cabin 302</td>
                <td><span className="appointment-status in-progress">In Progress</span></td>
              </tr>

              <tr>
                <td>10:30 AM</td>
                <td>
                  <strong>Liam O'Connor</strong>
                  <small>MRN-88410-PD</small>
                </td>
                <td>
                  <strong>Dr. Mateo Ramos</strong>
                  <small>Pediatrics</small>
                </td>
                <td><span className="visit-type first-visit">First Visit</span></td>
                <td>Peds Wing B-1</td>
                <td><span className="appointment-status confirmed">Confirmed</span></td>
              </tr>

              <tr>
                <td>11:00 AM</td>
                <td>
                  <strong>Charlotte Lin</strong>
                  <small>MRN-77319-NE</small>
                </td>
                <td>
                  <strong>Dr. Elena Thorne</strong>
                  <small>Neurology</small>
                </td>
                <td><span className="visit-type routine">Routine Follow-up</span></td>
                <td>Cabin 410</td>
                <td><span className="appointment-status scheduled">Scheduled</span></td>
              </tr>

              <tr>
                <td>11:30 AM</td>
                <td>
                  <strong>Arthur Pendleton</strong>
                  <small>MRN-44912-GS</small>
                </td>
                <td>
                  <strong>Dr. Sarah Jenkins</strong>
                  <small>General Surgery</small>
                </td>
                <td><span className="visit-type post-op">Post-Op Check</span></td>
                <td>Recovery Ste 2</td>
                <td><span className="appointment-status confirmed">Confirmed</span></td>
              </tr>

              <tr>
                <td>09:00 AM</td>
                <td>
                  <strong>Annette Becker</strong>
                  <small>MRN-33109-CA</small>
                </td>
                <td>
                  <strong>Dr. Donald Vance</strong>
                  <small>Cardiology</small>
                </td>
                <td><span className="visit-type routine">Routine Follow-up</span></td>
                <td>Cabin 302</td>
                <td><span className="appointment-status completed">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="appointment-queue-footer">
          <span>Showing 1 to 5 of 148 scheduled appointments</span>
          <div className="queue-pagination">
            <button type="button" disabled>Prev</button>
            <button type="button" className="current-page">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">Next</button>
          </div>
        </div>

      </section>


      {/* Fast Slot Booking */}
      <section className="fast-slot-booking">

        <div className="fast-booking-header">
          <div>
            <h2>
              <span className="material-symbols-outlined">
                event_available
              </span>
              Fast Slot Booking
            </h2>
            <p>Instant check-in and doctor matching</p>
          </div>

          <span className="live-check-badge">LIVE CHECK</span>
        </div>

        <form className="fast-booking-form">

          <div className="booking-field">
            <label>Patient Identifier / MRN</label>
            <div className="booking-input-with-action">
              <input
                type="text"
                placeholder="Enter patient name or MRN..."
              />
              <button type="button">Register New</button>
            </div>
          </div>

          <div className="booking-field">
            <label>Specialty Department</label>
            <select defaultValue="">
              <option value="" disabled>Select Department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>General Surgery</option>
              <option>Pediatrics</option>
              <option>General Medicine</option>
            </select>
          </div>

          <div className="booking-field">
            <label>Attending Physician</label>
            <select defaultValue="">
              <option value="" disabled>Select Doctor</option>
              <option>Dr. Donald Vance</option>
              <option>Dr. Elena Thorne</option>
              <option>Dr. Sarah Jenkins</option>
              <option>Dr. Mateo Ramos</option>
            </select>
            <small className="doctor-availability-note">
              <span></span>
              Select a department to view available doctors
            </small>
          </div>

          <div className="booking-date-time">
            <div className="booking-field">
              <label>Date</label>
              <input type="date" />
            </div>

            <div className="booking-field">
              <label>Time Slot</label>
              <select defaultValue="">
                <option value="" disabled>Select Time</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>10:30 AM</option>
                <option>11:00 AM</option>
                <option>11:30 AM</option>
                <option>01:00 PM</option>
                <option>02:00 PM</option>
              </select>
            </div>
          </div>

          <div className="booking-field">
            <label>Clinical Priority</label>
            <div className="clinical-priority-options">
              <label className="priority-option routine-priority">
                <input
                  type="radio"
                  name="clinicalPriority"
                  value="routine"
                  defaultChecked
                />
                Routine
              </label>

              <label className="priority-option urgent-priority">
                <input
                  type="radio"
                  name="clinicalPriority"
                  value="urgent"
                />
                Urgent
              </label>

              <label className="priority-option emergency-priority">
                <input
                  type="radio"
                  name="clinicalPriority"
                  value="emergency"
                />
                STAT / Emergency
              </label>
            </div>
          </div>

          <div className="booking-field">
            <label>Visit Symptoms / Clinical Indication</label>
            <textarea
              rows="3"
              placeholder="Enter patient symptoms or clinical indication..."
            />
          </div>

          <div className="booking-form-actions">
            <button type="reset" className="booking-clear-btn">
              Clear
            </button>

            <button type="button" className="booking-confirm-btn">
              <span className="material-symbols-outlined">
                print
              </span>
              Confirm & Print Slip
            </button>
          </div>

        </form>

        <div className="doctor-slot-summary">
          <div className="slot-doctor-avatar">DV</div>
          <div>
            <strong>Doctor Availability</strong>
            <small>Doctor details will appear after selection</small>
          </div>
        </div>

      </section>



      {/* Intelligent Doctor Allocation Banner */}
      <section className="doctor-allocation-banner">

        <div className="allocation-banner-content">
          <div className="allocation-eyebrow">
            <span className="material-symbols-outlined">
              verified_user
            </span>
            AUTOMATED HOSPITAL DISPATCH
          </div>

          <h2>
            Intelligent Surgeon & Doctor Allocation Protocol
          </h2>

          <p>
            The medical scheduling engine synchronizes outpatient
            rosters with operating theater availability, alerting
            emergency coordinators 45 minutes prior to shifts.
          </p>

          <div className="allocation-banner-actions">
            <button type="button" className="run-roster-audit-btn">
              Run Auto-Roster Audit
            </button>

            <button type="button" className="view-triage-btn">
              View Triage Protocols
              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <div className="allocation-banner-image">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800"
            alt="Hospital clinical team working together"
          />

          <div className="allocation-image-caption">
            <span>St. Jude Central Wing B</span>
            <span>
              <i></i>
              Live Feed
            </span>
          </div>
        </div>

      </section>




  

    </div>
  );
}

export default Doctors;

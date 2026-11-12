import './App.css'

const appointments = [
  { initials: 'NK', name: 'Nimal Kumara', age: '42y • Male', id: 'PT-9042', doctor: 'Dr. Perera', dept: 'Cardiology • Room 302', time: '10:30 AM', status: 'In Consultation', tone: 'teal' },
  { initials: 'SF', name: 'Sanduni Fernando', age: '29y • Female', id: 'PT-8871', doctor: 'Dr. Silva', dept: 'Orthopedics • Room 114', time: '11:00 AM', status: 'Waiting in Lobby', tone: 'muted' },
  { initials: 'JP', name: 'Janaka Peris', age: '64y • Male', id: 'PT-6520', doctor: 'Dr. Jayasinghe', dept: 'ICU / Cardiology', time: 'STAT Lab', status: 'Critical Lab Alert', tone: 'red' },
  { initials: 'AM', name: 'Anjali Madushani', age: '34y • Female', id: 'PT-7391', doctor: 'Dr. Fernando', dept: 'Neurology • Room 408', time: '09:45 AM', status: 'Completed', tone: 'green' },
  { initials: 'RK', name: 'Ruwan Kumara', age: '51y • Male', id: 'PT-8109', doctor: 'Dr. Perera', dept: 'General Surgery', time: '11:30 AM', status: 'Triaged / Pre-Op', tone: 'muted' },
]

const wards = [
  { name: 'Intensive Care Unit (ICU)', pct: 92, count: '22/24', color: 'red' },
  { name: 'Surgical Inpatient Ward', pct: 78, count: '39/50', color: 'navy' },
  { name: 'General Medical Ward', pct: 64, count: '64/100', color: 'teal' },
  { name: 'Private Rooms', pct: 85, count: '17/20', color: 'blue' },
]

function Icon({ children }) {
  return <span className="material-symbols-outlined">{children}</span>
}

function App() {
  return (
    <div className="hms-app">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-mark">✚</div>
            <div><strong>HOSPITAL HMS</strong><small>Hospital Management System</small></div>
          </div>
          <div className="nav-caption">CLINICAL OPERATIONS</div>
          <nav className="nav-list">
            <a className="nav-link selected" href="#overview"><Icon>grid_view</Icon>Dashboard</a>
            <a className="nav-link" href="#patients"><Icon>personal_injury</Icon>Patients &amp; EMR</a>
            <a className="nav-link" href="#appointments"><Icon>calendar_month</Icon>Doctors &amp; Scheduling</a>
            <a className="nav-link" href="#laboratory"><Icon>biotech</Icon>Clinical Laboratory</a>
            <a className="nav-link" href="#pharmacy"><Icon>medication</Icon>Pharmacy Inventory</a>
            <a className="nav-link" href="#billing"><Icon>receipt_long</Icon>Billing &amp; Inpatient</a>
            <a className="nav-link" href="#reports"><Icon>analytics</Icon>Staff &amp; Reports</a>
            <a className="nav-link" href="#settings"><Icon>settings</Icon>Settings &amp; Security</a>
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="system-state"><span className="pulse-dot" /><div><b>System Operational</b><small>Central Hospital System</small></div><Icon>verified</Icon></div>
          <div className="signed-in"><div className="avatar">AD</div><div><b>Admin User</b><small>Administrator</small></div><button aria-label="Profile options">•••</button></div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumbs"><span>Hospital Operations</span><Icon>chevron_right</Icon><b>Overview</b></div>
          <label className="search-box"><Icon>search</Icon><input placeholder="Search patient, doctor, invoice or medicine..." /></label>
          <div className="top-actions"><span className="date-label">Friday, 13 November 2026</span><button className="icon-button" aria-label="Notifications"><Icon>notifications</Icon><i>3</i></button><div className="avatar">AD</div></div>
        </header>

        <main id="overview" className="dashboard">
          <section className="kpi-grid">
            <article className="kpi-card accent-navy"><div className="kpi-top"><div><label>TOTAL PATIENTS</label><strong>2,450</strong></div><span className="kpi-icon navy"><Icon>groups</Icon></span></div><div className="kpi-foot positive"><Icon>trending_up</Icon> +8.4% <span>vs last month</span></div></article>
            <article className="kpi-card accent-teal"><div className="kpi-top"><div><label>TODAY'S APPOINTMENTS</label><strong>148</strong></div><span className="kpi-icon teal"><Icon>calendar_today</Icon></span></div><div className="mini-stats"><span>DONE <b>84</b></span><span>IN-CONSULT <b>38</b></span><span>PENDING <b>26</b></span></div></article>
            <article className="kpi-card accent-blue"><div className="kpi-top"><div><label>DOCTORS ON-DUTY</label><strong>42 <small>/ 56</small></strong></div><span className="kpi-icon blue"><Icon>stethoscope</Icon></span></div><div className="kpi-foot"><span className="green-dot" /> 8 Wings Active <span className="right-note">6 on standby</span></div></article>
            <article className="kpi-card accent-aqua"><div className="kpi-top"><div><label>TODAY'S REVENUE</label><strong>Rs. 1.28M</strong></div><span className="kpi-icon aqua"><Icon>payments</Icon></span></div><div className="kpi-foot positive"><Icon>trending_up</Icon> +12.3% <span>payments cleared today</span></div></article>
          </section>

          <section className="main-grid">
            <div className="left-column">
              <article className="panel queue-panel" id="appointments">
                <div className="panel-heading"><div><div className="heading-with-dot"><span className="live-dot" /><h2>Appointment Schedule &amp; Live Queue</h2></div><p>Consultation schedule, patient records and triage tracking.</p></div><div className="panel-actions"><button><Icon>filter_list</Icon>Filter</button><button><Icon>download</Icon>Export</button></div></div>
                <div className="queue-tabs"><button className="active">All Appointments (148)</button><button>In Consultation (38)</button><button>Lab Pending (22)</button><button>Completed (84)</button></div>
                <div className="table-scroll"><table className="queue-table"><thead><tr><th>Patient Information</th><th>Physician &amp; Dept</th><th>Time Slot</th><th>Clinical Status</th><th>Actions</th></tr></thead><tbody>{appointments.map((p) => <tr key={p.id}><td><div className="patient-cell"><span className={`patient-avatar ${p.tone}`}>{p.initials}</span><div><b>{p.name}</b><small>{p.age} <em>•</em> {p.id}</small></div></div></td><td><b>{p.doctor}</b><small>{p.dept}</small></td><td><b>{p.time}</b><small>Today's schedule</small></td><td><span className={`status ${p.tone}`}>{p.status}</span></td><td><div className="row-actions"><button>EMR</button><button>View</button></div></td></tr>)}</tbody></table></div>
                <div className="table-footer"><span>Showing 5 of 148 patient consultations</span><span>‹ &nbsp; 1 / 30 &nbsp; ›</span></div>
              </article>

              <article className="panel chart-panel">
                <div className="panel-heading"><div><h2>Departmental Inflow &amp; Admission Overview</h2><p>Weekly admissions and hospital revenue summary</p></div><span className="period-pill">This week⌄</span></div>
                <div className="chart-legend"><span><i className="legend-navy" /> Admissions</span><span><i className="legend-teal" /> Revenue (Rs. '000)</span><span><i className="legend-line" /> Capacity trend</span></div>
                <div className="bar-chart">{[{d:'Mon',a:66,r:53},{d:'Tue',a:78,r:68},{d:'Wed',a:88,r:82},{d:'Thu',a:60,r:56},{d:'Fri',a:72,r:64},{d:'Sat',a:46,r:39},{d:'Sun',a:34,r:28}].map((v) => <div className="bar-group" key={v.d}><div className="bars"><i style={{height:`${v.a}%`}}/><i style={{height:`${v.r}%`}}/></div><small>{v.d}</small></div>)}</div>
                <div className="chart-summary"><div><Icon>bed</Icon><span>General Ward Inflow<b>142 Inpatients</b></span></div><div><Icon>emergency</Icon><span>Emergency Triage<b>36 Incoming / Shift</b></span></div><div><Icon>receipt</Icon><span>Average Patient Bill<b>Rs. 8,679.00</b></span></div></div>
              </article>
            </div>

            <div className="right-column">
              <article className="panel alerts-panel">
                <div className="alerts-heading"><div><span className="live-dot red-dot" /><h2>Critical Hospital Alerts</h2></div><b>3 STAT</b></div>
                <div className="alert-list">
                  <div className="alert-card critical"><div className="alert-meta">STAT LAB REQUEST <small>12m ago</small></div><b>Urgent laboratory result review</b><p>Patient record • ICU</p><button>Acknowledge</button></div>
                  <div className="alert-card pharmacy"><div className="alert-meta">PHARMACY STOCK LOW <small>28m ago</small></div><b>Medicine stock below threshold</b><p>Pharmacy inventory alert</p><button>Review stock</button></div>
                  <div className="alert-card surgery"><div className="alert-meta">INPATIENT UPDATE <small>14:30 Today</small></div><b>Ward admission requires preparation</b><p>Inpatient management</p><button>View details</button></div>
                </div>
              </article>

              <article className="panel occupancy-panel">
                <div className="panel-heading"><div><h2>Ward &amp; Bed Occupancy</h2><p>Capacity utilization across facility</p></div><b className="occupancy-total">142/194</b></div>
                <div className="ward-list">{wards.map((w) => <div className="ward" key={w.name}><div><b>{w.name}</b><strong>{w.pct}% <small>({w.count})</small></strong></div><div className="progress"><i className={w.color} style={{width:`${w.pct}%`}} /></div></div>)}</div>
                <div className="beds-cleared"><Icon>meeting_room</Icon><span>Beds Cleared Today: <b>18</b></span><a href="#billing">View wards →</a></div>
              </article>

              <article className="panel operations-panel">
                <h2>Immediate Operations</h2><div className="operations-grid">
                  <button className="op-primary"><Icon>person_add</Icon><b>Register Patient</b><small>Create patient record</small></button>
                  <button className="op-teal"><Icon>add_alarm</Icon><b>Book Appointment</b><small>Schedule consultation</small></button>
                  <button><Icon>receipt_long</Icon><b>Billing / Invoice</b><small>Generate patient bill</small></button>
                  <button><Icon>airline_seat_flat</Icon><b>Admit to Ward</b><small>Assign room &amp; bed</small></button>
                </div>
              </article>
            </div>
          </section>
          <footer className="dashboard-footer">Hospital Management System · Clinical Operations Dashboard</footer>
        </main>
      </div>
    </div>
  )
}

export default App

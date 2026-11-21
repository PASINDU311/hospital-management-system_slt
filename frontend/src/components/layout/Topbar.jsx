
function Topbar({ activePage }) {
  const pageTitles = {
    dashboard: 'Overview',
    patients: 'Patients & EMR',
    appointments: 'Doctors & Scheduling',
    laboratory: 'Clinical Laboratory',
    pharmacy: 'Pharmacy Inventory',
    billing: 'Billing & Inpatient',
    reports: 'Staff & Reports',
    settings: 'Settings & Security',
  }

  return (
    <header className="topbar">
      <div className="breadcrumbs">
        <span>Hospital Operations</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <b>{pageTitles[activePage] || 'Module preview'}</b>
      </div>

      <div className="search-box">
        <span className="material-symbols-outlined">search</span>
        <input
          type="search"
          placeholder="Search hospital records..."
        />
      </div>

      <div className="top-actions">
        <span className="date-label">
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button type="button" className="icon-button" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <i>3</i>
        </button>
        <div className="avatar">AD</div>
      </div>
    </header>
  )
}

export default Topbar

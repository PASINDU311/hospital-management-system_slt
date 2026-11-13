
function Sidebar({ activePage, onNavigate }) {
  const navigationItems = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
    { id: 'patients', icon: 'personal_injury', label: 'Patients & EMR' },
    { id: 'doctors', icon: 'calendar_month', label: 'Doctors & Scheduling' },
    { id: 'laboratory', icon: 'biotech', label: 'Clinical Laboratory' },
    { id: 'pharmacy', icon: 'medication', label: 'Pharmacy Inventory' },
    { id: 'billing', icon: 'receipt_long', label: 'Billing & Inpatient' },
    { id: 'reports', icon: 'analytics', label: 'Staff & Reports' },
    { id: 'settings', icon: 'settings', label: 'Settings & Security' },
  ]

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-mark">✚</div>
          <div>
            <strong>HOSPITAL HMS</strong>
            <small>Hospital Management System</small>
          </div>
        </div>

        <div className="nav-caption">CLINICAL OPERATIONS</div>

        <nav className="nav-list">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${activePage === item.id ? 'selected' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="system-state">
          <span className="pulse-dot" />
          <div>
            <b>System Operational</b>
            <small>Central Hospital System</small>
          </div>
          <span className="material-symbols-outlined">verified</span>
        </div>

        <div className="signed-in">
          <div className="avatar">AD</div>
          <div>
            <b>Admin User</b>
            <small>Administrator</small>
          </div>
          <button type="button" aria-label="Profile options">•••</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

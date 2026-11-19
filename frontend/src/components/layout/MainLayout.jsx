
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function MainLayout({ activePage, onNavigate, onLogout, children }) {
  return (
    <div className="hms-app">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="workspace">
        <Topbar activePage={activePage} />
        {children}
      </div>
    </div>
  )
}

export default MainLayout

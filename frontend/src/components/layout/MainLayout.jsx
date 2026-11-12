
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function MainLayout({ activePage, onNavigate, children }) {
  return (
    <div className="hms-app">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
      />

      <div className="workspace">
        <Topbar activePage={activePage} />
        {children}
      </div>
    </div>
  )
}

export default MainLayout

import { useState, useRef, useEffect } from 'react'
import './Login.css'

const STAFF = [
    { initials: 'MW', name: 'Marcus Webb, BSN, RN', role: 'ICU Lead Charge Nurse • Tier 3 Admin', status: 'Active shift', live: true },
    { initials: 'SJ', name: 'Dr. Sarah Jenkins, MD', role: 'Chief of Surgery • Attending L4', status: 'Badge ready' },
    { initials: 'JW', name: 'James Wilson, PharmD', role: 'Lead Clinical Pharmacist • Rx Dispenser L3', status: 'Central Pharmacy' },
    { initials: 'EV', name: 'Eleanor Vance', role: 'Patient Billing & Inpatient Admitting', status: 'Admissions Desk' }
]

const TABS = [
    { id: 'directory', label: 'Directory SSO' },
    { id: 'clinical', label: 'Clinical Credentials' },
    { id: 'emergency', label: 'Code Silver' }
]

const HEADINGS = {
    directory: 'Staff Directory Login',
    clinical: 'Clinical Credentials Login',
    emergency: 'Emergency Access'
}

/* Small inline icons so the UI doesn't depend on emoji rendering */
const Icon = ({ name }) => {
    const paths = {
        lock: <><rect x="4" y="11" width="16" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
        shield: <path d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z" />,
        card: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18M7 15h4" /></>,
        key: <><circle cx="8" cy="14" r="4" /><path d="m11 11 8-8M16 6l3 3" /></>,
        monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
        phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18h2" /></>,
        alert: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 10v4.5M12 17.5v.01" /></>,
        check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
        help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17v.01" /></>
    }
    return (
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            {paths[name]}
        </svg>
    )
}

function Login({ onLogin }) {
    const [loginType, setLoginType] = useState('directory')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState('Surgical ICU — Floor 3 West')
    const [shift, setShift] = useState('Shift A')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [errorKey, setErrorKey] = useState(0)
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [scanning, setScanning] = useState(false)
    const [loading, setLoading] = useState(false)
    const timers = useRef([])

    useEffect(() => () => timers.current.forEach(clearTimeout), [])

    const showError = (message) => {
        setError(message)
        setErrorKey((k) => k + 1) // re-triggers the shake animation
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!email.trim() || !password.trim()) {
            showError('Please enter your Staff ID / Email and password.')
            return
        }

        setLoading(true)
        timers.current.push(
            setTimeout(() => {
                onLogin({ email, department, shift })
            }, 1100)
        )
    }

    const handleScan = () => {
        if (scanning) return
        setError('')
        setScanning(true)
        timers.current.push(
            setTimeout(() => {
                setScanning(false)
                showError('Badge reader hardware is not connected. Sign in with your credentials instead.')
            }, 2000)
        )
    }

    const activeIndex = TABS.findIndex((t) => t.id === loginType)
    const isEmergency = loginType === 'emergency'

    return (
        <div className="login-page">
            <div className="login-bg" aria-hidden="true">
                <span className="bg-orb orb-a" />
                <span className="bg-orb orb-b" />
                <span className="bg-grid" />
            </div>

            <header className="login-header reveal" style={{ '--d': '0ms' }}>
                <div className="login-brand">
                    <div className="login-brand-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3Z" />
                        </svg>
                    </div>
                    <div>
                        <h2>MEDICARE HMS</h2>
                        <p>St. Jude Memorial Hospital</p>
                    </div>
                </div>

                <div className="login-header-info">
                    <span className="security-pill"><i className="dot" /> Secure hospital access</span>
                    <span className="header-meta"><Icon name="lock" /> Staff access</span>
                    <span className="header-meta"><Icon name="shield" /> Security status: Protected</span>
                </div>
            </header>

            <div className="login-terminal-bar reveal" style={{ '--d': '80ms' }}>
                <span><Icon name="monitor" /> Floor 3 West — Clinical Workstation</span>
                <span className="ws-id">WS-ID: HMS-CLIN-0842</span>
                <span className="terminal-ok"><i className="dot" /> Secure access enabled</span>
            </div>

            <main className="login-content">
                <section className="login-left-column">
                    <div className={`badge-card reveal ${scanning ? 'is-scanning' : ''}`} style={{ '--d': '160ms' }}>
                        <div className="section-heading">
                            <div>
                                <h3>Rapid Clinical Tap-In</h3>
                                <p>Proximity NFC • RFID badge • Hardware token</p>
                            </div>
                            <span className="reader-status"><i className="dot" /> Reader ready</span>
                        </div>

                        <button type="button" className="badge-scanner" onClick={handleScan} aria-label="Start badge scan">
                            <span className="scanner-stage">
                                <span className="ring ring-1" />
                                <span className="ring ring-2" />
                                <span className="ring ring-3" />
                                <span className="scanner-sweep" />
                                <span className="scanner-circle">
                                    <span className="scanner-inner">
                                        <Icon name="card" />
                                        <strong>{scanning ? 'Reading…' : 'Tap badge'}</strong>
                                    </span>
                                </span>
                            </span>
                            <span className="scanner-title">
                                {scanning ? 'Verifying badge' : 'Hold hospital ID over scanner'}
                            </span>
                            <span className="scanner-sub">RFID and NFC badge authentication</span>
                            <span className="scanner-info"><i className="dot" /> Scanner interface preview</span>
                        </button>

                        <div className="hardware-buttons">
                            <button type="button" onClick={() => showError('SmartCard authentication requires hardware integration.')}>
                                <Icon name="card" /> PIV SmartCard
                            </button>
                            <button type="button" onClick={() => showError('FIDO2 authentication requires hardware integration.')}>
                                <Icon name="key" /> FIDO2 / YubiKey
                            </button>
                        </div>
                    </div>

                    <div className="roster-card reveal" style={{ '--d': '240ms' }}>
                        <h3>Shift Roster Workstation Switch</h3>
                        <p className="roster-subtitle">Select a staff profile for workstation access</p>

                        {STAFF.map((staff) => (
                            <button
                                className={`roster-person ${selectedStaff === staff.initials ? 'selected' : ''}`}
                                key={staff.initials}
                                type="button"
                                aria-pressed={selectedStaff === staff.initials}
                                onClick={() => {
                                    setEmail(staff.name)
                                    setSelectedStaff(staff.initials)
                                }}
                            >
                                <span className="roster-avatar">
                                    {selectedStaff === staff.initials ? <Icon name="check" /> : staff.initials}
                                    {staff.live && <i className="avatar-live" />}
                                </span>
                                <span className="roster-person-info">
                                    <strong>{staff.name}</strong>
                                    <small>{staff.role}</small>
                                </span>
                                <span className="roster-person-status">{staff.status}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section
                    className={`login-form-card reveal ${isEmergency ? 'is-emergency' : ''}`}
                    style={{ '--d': '200ms' }}
                >
                    <div className="login-tabs" style={{ '--i': activeIndex }} role="tablist">
                        <span className="tab-indicator" aria-hidden="true" />
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                role="tab"
                                aria-selected={loginType === tab.id}
                                className={[
                                    loginType === tab.id ? 'active' : '',
                                    tab.id === 'emergency' ? 'emergency-tab' : ''
                                ].join(' ').trim()}
                                onClick={() => setLoginType(tab.id)}
                                type="button"
                            >
                                {tab.id === 'emergency' && <Icon name="alert" />}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="login-form-heading">
                        <h2 key={loginType}>{HEADINGS[loginType]}</h2>
                        <span><i className="dot" /> Secure login</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login-email">Hospital Email or Staff ID Number</label>
                        <input
                            id="login-email"
                            type="text"
                            autoComplete="username"
                            placeholder="Enter your email or Staff ID"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setSelectedStaff(null)
                            }}
                            required
                        />

                        <div className="password-label-row">
                            <label htmlFor="login-password">Clinical Passphrase</label>
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() => showError('Please contact the hospital system administrator for password recovery.')}
                            >
                                Forgot PIN or password?
                            </button>
                        </div>

                        <div className="password-input-wrap">
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <div className="login-select-grid">
                            <div>
                                <label htmlFor="login-department">Active Department / Care Area</label>
                                <select id="login-department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    <option>Surgical ICU — Floor 3 West</option>
                                    <option>Emergency Department</option>
                                    <option>Cardiology</option>
                                    <option>Clinical Laboratory</option>
                                    <option>Central Pharmacy</option>
                                    <option>Billing & Admissions</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="login-shift">Assigned Duty Shift</label>
                                <select id="login-shift" value={shift} onChange={(e) => setShift(e.target.value)}>
                                    <option>Shift A</option>
                                    <option>Shift B</option>
                                    <option>Shift C</option>
                                </select>
                            </div>
                        </div>

                        <div className="mfa-panel">
                            <div className="mfa-heading">
                                <strong><Icon name="shield" /> Multi-Factor Authentication (MFA)</strong>
                                <span>Demo UI</span>
                            </div>
                            <div className="mfa-device">
                                <span className="mfa-device-icon"><Icon name="phone" /></span>
                                <div>
                                    <strong>Authenticator verification</strong>
                                    <small>Second-factor verification interface preview</small>
                                </div>
                                <span className="mfa-pending"><i className="dot" /> Pending</span>
                            </div>
                            <p>Fingerprint / Windows Hello • Authenticator code</p>
                        </div>

                        {error && (
                            <div className="login-error" key={errorKey} role="alert">
                                <Icon name="alert" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`authenticate-button ${loading ? 'is-loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner" aria-hidden="true" />
                                    Verifying credentials…
                                </>
                            ) : (
                                <>
                                    <Icon name="lock" />
                                    Authenticate & Access Clinical Workstation
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-help-links">
                        <span><Icon name="phone" /> Request IT provisioning, ext. #4400</span>
                        <span><Icon name="help" /> Security support guide</span>
                    </div>
                </section>
            </main>

            <section className="break-glass-banner reveal" style={{ '--d': '320ms' }}>
                <div className="break-glass-text">
                    <h3><Icon name="alert" /> Critical Care Break-Glass Protocol</h3>
                    <p>Emergency access interface preview. Real emergency authorization and audit logging require backend integration.</p>
                </div>
                <button type="button" onClick={() => showError('Emergency break-glass access is not enabled in demo mode.')}>
                    Initiate Break-Glass
                </button>
            </section>

            <footer className="login-footer reveal" style={{ '--d': '380ms' }}>
                <span><Icon name="lock" /> Hospital security interface</span>
                <span>Encrypted session preview</span>
                <span>© 2026 Medicare HMS</span>
            </footer>
        </div>
    )
}

export default Login
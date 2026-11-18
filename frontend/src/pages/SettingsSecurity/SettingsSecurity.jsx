
import React, { useState } from 'react'
import './SettingsSecurity.css'

function SettingsSecurity() {
    const [activeTab, setActiveTab] = useState('users')
    const [searchTerm, setSearchTerm] = useState('')
    const [departmentFilter, setDepartmentFilter] = useState('All Departments')
    const [roleFilter, setRoleFilter] = useState('All Security Roles')
    const [statusFilter, setStatusFilter] = useState('All Statuses')

    const [users, setUsers] = useState([
        { id: 1, name: 'Dr. Sarah Jenkins, MD', email: 'sarah.jenkins@hospital.lk', department: 'Surgery', role: 'Attending Physician', mfa: 'Hardware Key', lastLogin: 'Just now', status: 'Active' },
        { id: 2, name: 'Marcus Webb, BSN, RN', email: 'marcus.webb@hospital.lk', department: 'ICU', role: 'Inpatient Nurse Admin', mfa: 'Biometric Mobile App', lastLogin: '18m ago', status: 'Active' },
        { id: 3, name: 'James Wilson, PharmD', email: 'james.wilson@hospital.lk', department: 'Pharmacy', role: 'Pharmacist Dispenser', mfa: 'Hardware Key', lastLogin: '1h ago', status: 'Active' },
        { id: 4, name: 'Priya Nair, MS, MLS', email: 'priya.nair@hospital.lk', department: 'Laboratory', role: 'Laboratory Specialist', mfa: 'SMS Authenticator', lastLogin: '3h ago', status: 'Active' },
        { id: 5, name: 'Eleanor Vance', email: 'eleanor.vance@hospital.lk', department: 'Billing', role: 'Revenue Specialist', mfa: 'SMS Authenticator', lastLogin: 'Yesterday', status: 'Active' },
        { id: 6, name: 'Dr. Aris Thorne', email: 'aris.thorne@hospital.lk', department: 'Cardiology', role: 'Resident Physician', mfa: 'Pending Setup', lastLogin: 'Oct 22, 2026', status: 'MFA Required' },
    ])

    const [auditLogs, setAuditLogs] = useState([
        {
            id: 1,
            action: 'User Login',
            user: 'Dr. Sarah Jenkins, MD',
            details: 'Successfully logged in using Hardware Key',
            time: 'Just now',
            status: 'Success'
        },
        {
            id: 2,
            action: 'MFA Verification',
            user: 'Marcus Webb, BSN, RN',
            details: 'Biometric authentication completed',
            time: '18 minutes ago',
            status: 'Success'
        },
        {
            id: 3,
            action: 'Password Reset',
            user: 'James Wilson, PharmD',
            details: 'Password reset requested',
            time: '1 hour ago',
            status: 'Pending'
        }
    ])

    const [securityPolicies, setSecurityPolicies] = useState({
        mfaEnabled: true,
        sessionTimeout: 15,
        minPasswordLength: 12,
        ssoEnabled: false
    })

    const [savedPolicies, setSavedPolicies] = useState({
        mfaEnabled: true,
        sessionTimeout: 15,
        minPasswordLength: 12,
        ssoEnabled: false
    })

    const [policyMessage, setPolicyMessage] = useState('')

    const [selectedUser, setSelectedUser] = useState(users[1])
    const [showUserModal, setShowUserModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editUser, setEditUser] = useState(null)
    
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        department: 'Surgery',
        role: 'Doctor',
        employeeId: '',
        jobTitle: '',
        phone: '',
        setupMethod: 'Email Invitation'
    })

    const departments = ['Surgery', 'ICU', 'Pharmacy', 'Laboratory', 'Billing', 'Cardiology', 'Emergency']
    const roles = [...new Set(users.map(user => user.role))]

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesDepartment =
            departmentFilter === 'All Departments' || user.department === departmentFilter

        const matchesRole =
            roleFilter === 'All Security Roles' || user.role === roleFilter

        const matchesStatus =
            statusFilter === 'All Statuses' || user.status === statusFilter

        return matchesSearch && matchesDepartment && matchesRole && matchesStatus
    })

    const displayedSelectedUser =
        filteredUsers.find(user => user.id === selectedUser?.id) ||
        filteredUsers[0] ||
        null

    const handleAddUser = (e) => {
        e.preventDefault()

        const user = {
            id: Date.now(),
            ...newUser,
            mfa: 'Pending Setup',
            lastLogin: 'Never',
            status: 'Active'
        }

        setUsers(previous => [...previous, user])
        setAuditLogs(previous => [
            {
                id: Date.now(),
                action: 'User Created',
                user: user.name,
                details: `New account created for ${user.email}`,
                time: new Date().toLocaleString(),
                status: 'Success'
            },
            ...previous
        ])
        setSelectedUser(user)
        setNewUser({
            name: '',
            email: '',
            department: 'Surgery',
            role: 'Doctor',
            employeeId: '',
            jobTitle: '',
            phone: '',
            setupMethod: 'Email Invitation'
        })
        setShowUserModal(false)
    }

    const handleEditUser = (user) => {
        setEditUser({ ...user })
        setShowEditModal(true)
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()

        if (!editUser) return

        setUsers(previous =>
            previous.map(user =>
                user.id === editUser.id ? editUser : user
            )
        )

        setAuditLogs(previous => [
            {
                id: Date.now(),
                action: 'User Updated',
                user: editUser.name,
                details: `User account details updated for ${editUser.email}`,
                time: new Date().toLocaleString(),
                status: 'Success'
            },
            ...previous
        ])

        setSelectedUser(editUser)
        setShowEditModal(false)
        setEditUser(null)
    }

    const handleDeleteUser = (id) => {
        const targetUser = users.find(user => user.id === id)

        if (!targetUser) return

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        )

        if (!confirmDelete) return

        setUsers(previous =>
            previous.filter(user => user.id !== id)
        )

        setSelectedUser(previous =>
            previous?.id === id ? null : previous
        )

        setAuditLogs(previous => [
            {
                id: Date.now(),
                action: 'User Deleted',
                user: targetUser.name,
                details: `User account deleted: ${targetUser.email}`,
                time: new Date().toLocaleString(),
                status: 'Success'
            },
            ...previous
        ])
    }

    
    const handleSavePolicies = () => {
        if (
            !Number.isInteger(securityPolicies.sessionTimeout) ||
            securityPolicies.sessionTimeout < 5 ||
            securityPolicies.sessionTimeout > 120
        ) {
            setPolicyMessage('Session timeout must be between 5 and 120 minutes.')
            return
        }

        if (
            !Number.isInteger(securityPolicies.minPasswordLength) ||
            securityPolicies.minPasswordLength < 8 ||
            securityPolicies.minPasswordLength > 32
        ) {
            setPolicyMessage('Password length must be between 8 and 32 characters.')
            return
        }

        setSavedPolicies({ ...securityPolicies })

        setPolicyMessage('Security policies saved successfully!')

        setAuditLogs(previous => [
            {
                id: Date.now(),
                action: 'Security Policies Updated',
                user: 'Admin User',
                details: 'Hospital security policy settings were updated',
                time: new Date().toLocaleString(),
                status: 'Success'
            },
            ...previous
        ])
    }


    const handleSuspendUser = (id) => {
        const targetUser = users.find(user => user.id === id)

        if (!targetUser) return

        const newStatus =
            targetUser.status === 'Suspended' ? 'Active' : 'Suspended'

        setUsers(previous =>
            previous.map(user =>
                user.id === id
                    ? { ...user, status: newStatus }
                    : user
            )
        )

        setSelectedUser(previous =>
            previous?.id === id
                ? { ...previous, status: newStatus }
                : previous
        )

        setAuditLogs(previous => [
            {
                id: Date.now(),
                action: newStatus === 'Suspended'
                    ? 'User Suspended'
                    : 'User Reactivated',
                user: targetUser.name,
                details: `Account status changed to ${newStatus}`,
                time: new Date().toLocaleString(),
                status: 'Success'
            },
            ...previous
        ])
    }

    const handleResetPassword = () => {
        alert('Password reset request created. Backend integration is required to send a real reset link.')
    }

    const handleExportUsers = () => {
        const headers = ['Name', 'Email', 'Department', 'Role', 'MFA', 'Last Login', 'Status']
        const rows = filteredUsers.map(user => [
            user.name, user.email, user.department, user.role,
            user.mfa, user.lastLogin, user.status
        ])

        const csv = [headers, ...rows]
            .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
            .join('\n')

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'hospital-user-directory.csv'
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="security-page">
            <div className="security-heading">
                <div>
                    <h1>User Management & Role-Based Access Governance</h1>
                    <p>Hospital-wide directory authentication, granular clinical role permissions, biometric MFA enforcement and audit trails.</p>
                </div>

                <div className="security-header-actions">
                    <button className="security-btn secondary" onClick={handleExportUsers}>
                        Export Access Audit
                    </button>
                    <button className="security-btn primary" onClick={() => setShowUserModal(true)}>
                        + Provision New User
                    </button>
                </div>
            </div>

            <div className="security-kpi-grid">
                <div className="security-kpi">
                    <span>Total Active Users</span>
                    <strong>{users.filter(user => user.status === 'Active').length + users.filter(user => user.status === 'MFA Required').length}</strong>
                    <small>Registered system accounts</small>
                </div>

                <div className="security-kpi">
                    <span>Active Security Roles</span>
                    <strong>7 Standard Roles</strong>
                    <small>Role-based access control</small>
                </div>

                <div className="security-kpi">
                    <span>Biometric & MFA Rate</span>
                    <strong>98.8%</strong>
                    <small>Multi-factor authentication</small>
                </div>

                <div className="security-kpi">
                    <span>Security & Audit Status</span>
                    <strong>0 Critical</strong>
                    <small>Last 30 days demo status</small>
                </div>
            </div>

            <div className="security-tabs">
                <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>User Directory ({users.length})</button>
                <button className={activeTab === 'roles' ? 'active' : ''} onClick={() => setActiveTab('roles')}>Role & Permission Matrix</button>
                <button className={activeTab === 'audit' ? 'active' : ''} onClick={() => setActiveTab('audit')}>Audit Trail</button>
                <button className={activeTab === 'policies' ? 'active' : ''} onClick={() => setActiveTab('policies')}>Security Policies & SSO</button>
            </div>

            {activeTab === 'users' && (
                <div className="security-panel">
                    <div className="security-filter-row">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />

                        <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
                            <option>All Departments</option>
                            {departments.map(department => <option key={department}>{department}</option>)}
                        </select>

                        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                            <option>All Security Roles</option>
                            {roles.map(role => <option key={role}>{role}</option>)}
                        </select>

                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Suspended</option>
                            <option>MFA Required</option>
                        </select>
                    </div>

                    <div className="security-table-wrap">
                        <table className="security-table">
                            <thead>
                                <tr>
                                    <th>User / Identity</th>
                                    <th>Department</th>
                                    <th>Assigned Role</th>
                                    <th>MFA Method</th>
                                    <th>Last Login</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr
                                        key={user.id}
                                        className={displayedSelectedUser?.id === user.id ? 'selected' : ''}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <td>
                                            <strong>{user.name}</strong>
                                            <small>{user.email}</small>
                                        </td>
                                        <td>{user.department}</td>
                                        <td>{user.role}</td>
                                        <td>{user.mfa}</td>
                                        <td>{user.lastLogin}</td>
                                        <td>
                                            <span className={`security-status ${user.status.toLowerCase().replace(' ', '-')}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="security-empty">No matching users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {displayedSelectedUser && (
                        <div className="security-user-detail">
                            <div className="security-detail-heading">
                                <div>
                                    <h3>{displayedSelectedUser.name}</h3>
                                    <p>{displayedSelectedUser.role} · {displayedSelectedUser.department}</p>
                                </div>

                                <span className={`security-status ${displayedSelectedUser.status.toLowerCase().replace(' ', '-')}`}>
                                    {displayedSelectedUser.status}
                                </span>
                            </div>


                            <div className="security-user-extra-details">
                                <div>
                                    <span>Employee ID</span>
                                    <strong>{displayedSelectedUser.employeeId || 'Not provided'}</strong>
                                </div>

                                <div>
                                    <span>Job Title</span>
                                    <strong>{displayedSelectedUser.jobTitle || 'Not provided'}</strong>
                                </div>

                                <div>
                                    <span>Phone Number</span>
                                    <strong>{displayedSelectedUser.phone || 'Not provided'}</strong>
                                </div>

                                <div>
                                    <span>Account Setup Method</span>
                                    <strong>{displayedSelectedUser.setupMethod || 'Not specified'}</strong>
                                </div>
                            </div>


                            <div className="security-detail-actions">
                                <button
                                    className="security-btn secondary"
                                    onClick={() => handleEditUser(displayedSelectedUser)}
                                >
                                    Edit User
                                </button>
                                <button className="security-btn secondary" onClick={handleResetPassword}>
                                    Reset Password
                                </button>

                                <button
                                    className="security-btn danger"
                                    onClick={() => handleSuspendUser(displayedSelectedUser.id)}
                                >
                                    {displayedSelectedUser.status === 'Suspended' ? 'Reactivate User' : 'Suspend User'}
                                </button>

                                <button
                                    className="security-btn danger"
                                    onClick={() => handleDeleteUser(displayedSelectedUser.id)}
                                >
                                    Delete User
                                </button>
                            </div>

                            <p className="security-demo-note">
                                Demo user data only. Real authentication, password reset and access enforcement require backend integration.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'roles' && (
                <div className="security-panel">
                    <h2>Role & Permission Matrix</h2>
                    <p>Illustrative access permissions for hospital system roles.</p>
                    <div className="security-table-wrap">
                        <table className="security-table">
                            <thead>
                                <tr>
                                    <th>Permission</th>
                                    <th>Administrator</th>
                                    <th>Doctor</th>
                                    <th>Nurse</th>
                                    <th>Receptionist</th>
                                    <th>Laboratory Staff</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['View Patient Records', 'Granted', 'Granted', 'Granted', 'Limited', 'Limited'],
                                    ['Edit Clinical Records', 'Granted', 'Granted', 'Limited', 'Restricted', 'Restricted'],
                                    ['Manage Appointments', 'Granted', 'Granted', 'Granted', 'Granted', 'Restricted'],
                                    ['Manage Pharmacy Stock', 'Granted', 'Restricted', 'Restricted', 'Restricted', 'Restricted'],
                                    ['Manage Billing', 'Granted', 'Restricted', 'Restricted', 'Limited', 'Restricted'],
                                    ['Manage User Accounts', 'Granted', 'Restricted', 'Restricted', 'Restricted', 'Restricted']
                                ].map(row => (
                                    <tr key={row[0]}>
                                        {row.map((value, index) => <td key={index}>{value}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="security-demo-note">Permissions shown are sample policy definitions, not enforced access controls.</p>
                </div>
            )}

            {activeTab === 'audit' && (
                <div className="security-panel">
                    <h2>User Activity Audit Trail</h2>

                    <div className="security-audit-list">
                        {auditLogs.map(log => (
                            <div key={log.id}>
                                <strong>
                                    {log.time} — {log.action}
                                </strong>

                                <span>
                                    {log.user} · {log.details}
                                </span>

                                <span className={`security-status ${log.status.toLowerCase()}`}>
                                    {log.status}
                                </span>
                            </div>
                        ))}

                        {auditLogs.length === 0 && (
                            <p className="security-empty">
                                No audit events recorded yet.
                            </p>
                        )}
                    </div>

                    <p className="security-demo-note">
                        Demo audit records only. Production audit logging must be securely stored on the backend.
                    </p>
                </div>
            )}

            {activeTab === 'policies' && (
                <div className="security-panel">
                    <h2>Security Policies & SSO</h2>

                    <div className="security-policy-list">

                        <div className="security-policy-item">
                            <div>
                                <strong>Multi-Factor Authentication</strong>
                                <span>Require MFA for privileged accounts</span>
                            </div>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={securityPolicies.mfaEnabled}
                                    onChange={e => setSecurityPolicies({
                                        ...securityPolicies,
                                        mfaEnabled: e.target.checked
                                    })}
                                />
                                Enabled
                            </label>
                        </div>

                        <div className="security-policy-item">
                            <div>
                                <strong>Automatic Session Timeout</strong>
                                <span>Minutes of inactivity before session timeout</span>
                            </div>

                            <input
                                type="number"
                                min="5"
                                max="120"
                                value={securityPolicies.sessionTimeout}
                                onChange={e => setSecurityPolicies({
                                    ...securityPolicies,
                                    sessionTimeout: Number(e.target.value)
                                })}
                            />
                        </div>

                        <div className="security-policy-item">
                            <div>
                                <strong>Password Policy</strong>
                                <span>Minimum required password length</span>
                            </div>

                            <input
                                type="number"
                                min="8"
                                max="32"
                                value={securityPolicies.minPasswordLength}
                                onChange={e => setSecurityPolicies({
                                    ...securityPolicies,
                                    minPasswordLength: Number(e.target.value)
                                })}
                            />
                        </div>

                        <div className="security-policy-item">
                            <div>
                                <strong>Single Sign-On (SSO)</strong>
                                <span>Enable hospital SSO integration</span>
                            </div>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={securityPolicies.ssoEnabled}
                                    onChange={e => setSecurityPolicies({
                                        ...securityPolicies,
                                        ssoEnabled: e.target.checked
                                    })}
                                />
                                Enabled
                            </label>
                        </div>

                    </div>

                    <button
                        className="security-btn primary"
                        onClick={handleSavePolicies}
                    >
                        Save Policy Changes
                    </button>

                    
                    {policyMessage && (
                        <div
                            className={`security-policy-alert ${
                                policyMessage.toLowerCase().includes('success')
                                    ? 'success'
                                    : 'error'
                            }`}
                            role="status"
                        >
                            <span className="security-alert-icon">
                                {policyMessage.toLowerCase().includes('success') ? '✓' : '⚠'}
                            </span>

                            <div>
                                <strong>
                                    {policyMessage.toLowerCase().includes('success')
                                        ? 'Changes Saved Successfully!'
                                        : 'Unable to Save Changes'}
                                </strong>
                                <p>{policyMessage}</p>
                            </div>
                        </div>
                    )}


                    <p className="security-demo-note">
                        Demo settings only. Actual authentication and security enforcement require backend integration.
                    </p>
                </div>
            )}

            {showEditModal && editUser && (
                <div className="security-modal-backdrop">
                    <form className="security-modal" onSubmit={handleUpdateUser}>
                        <h2>Edit User</h2>

                        <label>Full Name</label>
                        <input
                            required
                            value={editUser.name}
                            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
                        />

                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            value={editUser.email}
                            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                        />

                        <label>Department</label>
                        <select
                            value={editUser.department}
                            onChange={e => setEditUser({ ...editUser, department: e.target.value })}
                        >
                            {departments.map(department => (
                                <option key={department}>{department}</option>
                            ))}
                        </select>

                        <label>Assigned Role</label>
                        <select
                            value={editUser.role}
                            onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                        >
                            {roles.map(role => (
                                <option key={role}>{role}</option>
                            ))}
                        </select>


                        <label>Employee ID</label>
                        <input
                            required
                            value={editUser.employeeId || ''}
                            onChange={e => setEditUser({ ...editUser, employeeId: e.target.value })}
                        />

                        <label>Job Title</label>
                        <input
                            required
                            value={editUser.jobTitle || ''}
                            onChange={e => setEditUser({ ...editUser, jobTitle: e.target.value })}
                        />

                        <label>Phone Number</label>
                        <input
                            required
                            type="tel"
                            value={editUser.phone || ''}
                            onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
                        />


                        <label>MFA Method</label>
                        <select
                            value={editUser.mfa}
                            onChange={e => setEditUser({ ...editUser, mfa: e.target.value })}
                        >
                            <option>Hardware Key</option>
                            <option>Biometric Mobile App</option>
                            <option>SMS Authenticator</option>
                            <option>Pending Setup</option>
                        </select>

                        <label>Account Status</label>
                        <select
                            value={editUser.status}
                            onChange={e => setEditUser({ ...editUser, status: e.target.value })}
                        >
                            <option>Active</option>
                            <option>Suspended</option>
                            <option>MFA Required</option>
                        </select>


                        
                        <label>Account Setup Method</label>
                        <select
                            value={editUser.setupMethod || 'Email Invitation'}
                            onChange={e => setEditUser({ ...editUser, setupMethod: e.target.value })}
                        >
                            <option value="Email Invitation">Email Invitation</option>
                            <option value="Admin Created">Admin Created</option>
                            <option value="Manual Setup">Manual Setup</option>
                        </select>



                        <div className="security-modal-actions">
                            <button
                                type="button"
                                className="security-btn secondary"
                                onClick={() => {
                                    setShowEditModal(false)
                                    setEditUser(null)
                                }}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="security-btn primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showUserModal && (
                <div className="security-modal-backdrop">
                    <form className="security-modal" onSubmit={handleAddUser}>
                        <h2>Provision New User</h2>

                        <label>Full Name</label>
                        <input
                            required
                            value={newUser.name}
                            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                            placeholder="Enter full name"
                        />

                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            value={newUser.email}
                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="name@hospital.lk"
                        />


                        <label>Employee ID</label>
                        <input
                            required
                            value={newUser.employeeId}
                            onChange={e => setNewUser({ ...newUser, employeeId: e.target.value })}
                            placeholder="e.g. EMP-2026-001"
                        />

                        <label>Job Title</label>
                        <input
                            required
                            value={newUser.jobTitle}
                            onChange={e => setNewUser({ ...newUser, jobTitle: e.target.value })}
                            placeholder="Enter job title"
                        />

                        <label>Phone Number</label>
                        <input
                            type="tel"
                            required
                            value={newUser.phone}
                            onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                            placeholder="07XXXXXXXX"
                        />


                        <label>Department</label>
                        <select value={newUser.department} onChange={e => setNewUser({ ...newUser, department: e.target.value })}>
                            {departments.map(department => <option key={department}>{department}</option>)}
                        </select>

                        <label>Assigned Role</label>
                        <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                            {roles.map(role => <option key={role}>{role}</option>)}
                        </select>

                        <div className="security-modal-actions">
                            <button type="button" className="security-btn secondary" onClick={() => setShowUserModal(false)}>Cancel</button>
                            <button type="submit" className="security-btn primary">Create User</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default SettingsSecurity

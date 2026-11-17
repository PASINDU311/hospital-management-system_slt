import React, { useState } from 'react'
import './StaffReports.css'

const staffMembers = [
    { id: 1, initials: 'SJ', name: 'Dr. Sarah Jenkins, MD', role: 'Chief of Surgery', department: 'General Surgery', shifts: ['Morning (OR)', 'Morning (OR)', 'Day / Clinic', 'On-Call 24h', 'Morning (OR)'], color: 'navy' },
    { id: 2, initials: 'MW', name: 'Marcus Webb, BSN, RN', role: 'Charge Nurse', department: 'ICU', shifts: ['Morning 07:00', 'Morning 07:00', 'Morning 07:00', 'Night 23:00', 'Night 23:00'], color: 'teal' },
    { id: 3, initials: 'DV', name: 'Dr. Donald Vance, MD', role: 'Cardiologist', department: 'Cardiology', shifts: ['Clinic Consult', 'Cath Lab', 'Rounding', 'Morning 07:00', 'On-Call'], color: 'grey' },
    { id: 4, initials: 'ER', name: 'Elena Rostova, RN', role: 'Staff Nurse II', department: 'Emergency', shifts: ['Eve 15:00', 'Eve 15:00', 'Off Duty', 'Morning 07:00', 'Morning 07:00'], color: 'grey' },
    { id: 5, initials: 'JW', name: 'James Wilson, PharmD', role: 'Lead Pharmacist', department: 'Inpatient Pharmacy', shifts: ['Morning 07:00', 'Morning 07:00', 'Morning 07:00', 'Morning 07:00', 'Eve 15:00'], color: 'navy' },
    { id: 6, initials: 'PN', name: 'Priya Nair, MS, MLS', role: 'Medical Technologist', department: 'Laboratory', shifts: ['Morning 07:00', 'Morning 07:00', 'Eve 15:00', 'Eve 15:00', 'Off Duty'], color: 'grey' },
]

function StaffReports() {
    const [activeTab, setActiveTab] = useState('roster')
    const [activeShift, setActiveShift] = useState('A')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
    const [departments, setDepartments] = useState([
        'General Surgery',
        'ICU',
        'Cardiology',
        'Emergency',
        'Inpatient Pharmacy',
        'Laboratory',
        'Administration',
    ])
    const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false)
    const [isEditDepartment, setIsEditDepartment] = useState(false)
    const [originalDepartmentName, setOriginalDepartmentName] = useState('')
    const [isDeleteDepartmentModalOpen, setIsDeleteDepartmentModalOpen] = useState(false)
    const [selectedDepartmentToDelete, setSelectedDepartmentToDelete] = useState('')

    const [departmentForm, setDepartmentForm] = useState({
        name: '',
        head: '',
        location: '',
        contact: '',
    })
    const [departmentDetails, setDepartmentDetails] = useState({})
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false)
    const [registeredStaff, setRegisteredStaff] = useState([])
    const [staffNotification, setStaffNotification] = useState({
        type: '',
        message: '',
    })

    const [staffForm, setStaffForm] = useState({
        name: '',
        role: '',
        department: '',
        email: '',
        phone: '',
    })

    const filteredStaff = [...staffMembers, ...registeredStaff].filter(staff => {
        const matchesSearch =
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.department.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesDepartment =
            selectedDepartment === 'All Departments' ||
            staff.department === selectedDepartment

        return matchesSearch && matchesDepartment
    })

    const handleStaffSubmit = (e) => {
        e.preventDefault()

        if (
            !staffForm.name.trim() ||
            !staffForm.role.trim() ||
            !staffForm.department
        ) {
            setStaffNotification({
                type: 'error',
                message: 'Please fill in all required fields.',
            })
            return
        }

        const newStaff = {
            id: Date.now(),
            initials: staffForm.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            name: staffForm.name,
            role: staffForm.role,
            department: staffForm.department,
            email: staffForm.email,
            phone: staffForm.phone,
            shifts: [
                'Not Assigned',
                'Not Assigned',
                'Not Assigned',
                'Not Assigned',
                'Not Assigned',
            ],
            color: 'teal',
        }

        setRegisteredStaff(previous => [...previous, newStaff])

        setStaffForm({
            name: '',
            role: '',
            department: '',
            email: '',
            phone: '',
        })

        setIsStaffModalOpen(false)

        setStaffNotification({
            type: 'success',
            message: `${newStaff.name} has been registered successfully!`,
        })

        setTimeout(() => {
            setStaffNotification({ type: '', message: '' })
        }, 4000)
    }

    const handleAddDepartment = (departmentName) => {
        const name = departmentName.trim()

        if (!name) {
            setStaffNotification({
                type: 'error',
                message: 'Please enter a department name.',
            })
            return false
        }

        const alreadyExists = departments.some(
            department => department.toLowerCase() === name.toLowerCase()
        )

        if (alreadyExists) {
            setStaffNotification({
                type: 'error',
                message: 'This department already exists.',
            })
            return false
        }

        setDepartments(previous => [...previous, name])

        setStaffNotification({
            type: 'success',
            message: `${name} department added successfully!`,
        })

        setTimeout(() => {
            setStaffNotification({ type: '', message: '' })
        }, 4000)

        return true
    }

    const handleDepartmentSubmit = (e) => {
        e.preventDefault()

        const name = departmentForm.name.trim()

        if (!name) {
            setStaffNotification({
                type: 'error',
                message: 'Please enter a department name.',
            })
            return
        }

        const duplicate = departments.some(department =>
            department.toLowerCase() === name.toLowerCase() &&
            (!isEditDepartment || department !== originalDepartmentName)
        )

        if (duplicate) {
            setStaffNotification({
                type: 'error',
                message: 'This department already exists.',
            })
            return
        }

        if (isEditDepartment) {
            const oldName = originalDepartmentName

            setDepartments(previous =>
                previous.map(department =>
                    department === oldName ? name : department
                )
            )

            setDepartmentDetails(previous => {
                const updated = { ...previous }
                delete updated[oldName]

                updated[name] = {
                    head: departmentForm.head,
                    location: departmentForm.location,
                    contact: departmentForm.contact,
                }

                return updated
            })

            setStaffNotification({
                type: 'success',
                message: `${name} department updated successfully!`,
            })
        } else {
            setDepartments(previous => [...previous, name])

            setDepartmentDetails(previous => ({
                ...previous,
                [name]: {
                    head: departmentForm.head,
                    location: departmentForm.location,
                    contact: departmentForm.contact,
                },
            }))

            setStaffNotification({
                type: 'success',
                message: `${name} department added successfully!`,
            })
        }

        setDepartmentForm({
            name: '',
            head: '',
            location: '',
            contact: '',
        })

        setIsDepartmentModalOpen(false)
        setIsEditDepartment(false)
        setOriginalDepartmentName('')

        setTimeout(() => {
            setStaffNotification({ type: '', message: '' })
        }, 4000)
    }

    const handleConfirmDepartmentDelete = () => {
        if (!selectedDepartmentToDelete) return

        const departmentName = selectedDepartmentToDelete

        setDepartments(previous =>
            previous.filter(item => item !== departmentName)
        )

        setDepartmentDetails(previous => {
            const updated = { ...previous }
            delete updated[departmentName]
            return updated
        })

        setIsDeleteDepartmentModalOpen(false)
        setSelectedDepartmentToDelete('')

        setStaffNotification({
            type: 'success',
            message: `${departmentName} department deleted successfully!`,
        })

        setTimeout(() => {
            setStaffNotification({ type: '', message: '' })
        }, 4000)
    }

    return ( 
        <div className="staff-reports-page">

            {staffNotification.message && (
                <div className={`staff-notification ${staffNotification.type}`}>
                    <span className="material-symbols-outlined">
                        {staffNotification.type === 'success'
                            ? 'check_circle'
                            : 'error'}
                    </span>

                    <div className="staff-notification-content">
                        <strong>
                            {staffNotification.type === 'error'
                                ? 'Operation Failed!'
                                : staffNotification.message.includes('deleted successfully')
                                    ? 'Department Deleted Successfully!'
                                    : staffNotification.message.includes('department added successfully')
                                        ? 'Department Added Successfully!'
                                        : 'Registration Successful!'}
                        </strong>
                        <p>{staffNotification.message}</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setStaffNotification({
                            type: '',
                            message: '',
                        })}
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="staff-page-header">
                <div>
                    <div className="staff-breadcrumb">
                        Hospital Operations &nbsp; › &nbsp; Human Resources
                        &nbsp; › &nbsp; Staff Rostering
                    </div>

                    <h1>Staff Management & Clinical Rostering</h1>

                    <p>
                        Hospital workforce directory, shift roster allocation,
                        real-time biometric attendance, and credential compliance
                        tracking across all acute wards.
                    </p>
                </div>

                <div className="staff-header-actions">
                    <button className="staff-secondary-btn">
                        <span className="material-symbols-outlined">download</span>
                        Export Roster
                    </button>

                    <button className="staff-teal-btn">
                        <span className="material-symbols-outlined">emergency</span>
                        Emergency OT Dispatch
                    </button>

                    <button
                        className="staff-primary-btn"
                        onClick={() => setIsStaffModalOpen(true)}
                    >
                        <span className="material-symbols-outlined">person_add</span>
                        Onboard New Staff
                    </button>
                </div>
            </div>

            <div className="staff-metrics-grid">

                <div className="staff-metric-card navy-accent">
                    <span className="metric-label">TOTAL ACTIVE WORKFORCE</span>
                    <h2>482 <small>Headcount</small></h2>
                    <div className="metric-details">
                        <span>Doctors: <b>142</b></span>
                        <span>Nurses: <b>228</b></span>
                        <span>Allied: <b>64</b></span>
                        <span>Ops/Admin: <b>48</b></span>
                    </div>
                </div>

                <div className="staff-metric-card teal-accent">
                    <span className="metric-label">SHIFT A (MORNING) COVERAGE</span>
                    <h2>186 <small>/ 194 Required</small></h2>
                    <div className="staff-progress">
                        <span style={{ width: '96%' }}></span>
                    </div>
                    <p className="metric-warning">ICU & ED Under-staffed</p>
                </div>

                <div className="staff-metric-card cyan-accent">
                    <span className="metric-label">BIOMETRIC ATTENDANCE TODAY</span>
                    <h2>182 <small>Present at Stations</small></h2>
                    <div className="attendance-breakdown">
                        <span>182 <small>On Time</small></span>
                        <span>6 <small>Late</small></span>
                        <span>4 <small>Excused</small></span>
                        <span>2 <small>Unplanned</small></span>
                    </div>
                </div>

                <div className="staff-metric-card navy-accent">
                    <span className="metric-label">CREDENTIAL & LICENSURE</span>
                    <h2>0 <small>Critical Lapsed</small></h2>
                    <div className="credential-warning">
                        <span className="material-symbols-outlined">notifications_active</span>
                        5 Expiring in less than 30 days
                    </div>
                </div>

            </div>

            {isStaffModalOpen && (
                <div className="staff-modal-overlay">
                    <div className="staff-modal">
                        <div className="staff-modal-header">
                            <div>
                                <h2>Register New Staff</h2>
                                <p>Add a new employee to the hospital workforce.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsStaffModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleStaffSubmit}>
                            <label>Full Name *</label>
                            <input
                                type="text"
                                value={staffForm.name}
                                onChange={e => setStaffForm({...staffForm, name: e.target.value})}
                                placeholder="Enter full name"
                                required
                            />

                            <label>Job Role *</label>
                            <input
                                type="text"
                                value={staffForm.role}
                                onChange={e => setStaffForm({...staffForm, role: e.target.value})}
                                placeholder="e.g. Staff Nurse"
                                required
                            />

                            <label>Department *</label>
                            <select
                                value={staffForm.department}
                                onChange={e => setStaffForm({...staffForm, department: e.target.value})}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="General Surgery">General Surgery</option>
                                <option value="ICU">ICU</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Inpatient Pharmacy">Inpatient Pharmacy</option>
                                <option value="Laboratory">Laboratory</option>
                                <option value="Administration">Administration</option>
                            </select>

                            <label>Email Address</label>
                            <input
                                type="email"
                                value={staffForm.email}
                                onChange={e => setStaffForm({...staffForm, email: e.target.value})}
                                placeholder="Enter email address"
                            />

                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={staffForm.phone}
                                onChange={e => setStaffForm({...staffForm, phone: e.target.value})}
                                placeholder="Enter phone number"
                            />

                            <div className="staff-modal-actions">
                                <button
                                    type="button"
                                    className="staff-cancel-btn"
                                    onClick={() => setIsStaffModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="staff-primary-btn">
                                    Register Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDepartmentModalOpen && (
                <div className="staff-modal-overlay">
                    <div className="staff-modal">
                        <div className="staff-modal-header">
                            <div>
                                <h2>Add New Department</h2>
                                <p>Enter the department information below.</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsDepartmentModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleDepartmentSubmit}>
                            <label>Department Name *</label>
                            <input
                                type="text"
                                value={departmentForm.name}
                                onChange={e => setDepartmentForm({
                                    ...departmentForm,
                                    name: e.target.value,
                                })}
                                placeholder="Enter department name"
                                required
                            />

                            <label>Department Head</label>
                            <input
                                type="text"
                                value={departmentForm.head}
                                onChange={e => setDepartmentForm({
                                    ...departmentForm,
                                    head: e.target.value,
                                })}
                                placeholder="Enter department head"
                            />

                            <label>Department Location</label>
                            <input
                                type="text"
                                value={departmentForm.location}
                                onChange={e => setDepartmentForm({
                                    ...departmentForm,
                                    location: e.target.value,
                                })}
                                placeholder="Enter location"
                            />

                            <label>Contact Number</label>
                            <input
                                type="tel"
                                value={departmentForm.contact}
                                onChange={e => setDepartmentForm({
                                    ...departmentForm,
                                    contact: e.target.value,
                                })}
                                placeholder="Enter contact number"
                            />

                            <div className="staff-modal-actions">
                                <button
                                    type="button"
                                    className="staff-cancel-btn"
                                    onClick={() => setIsDepartmentModalOpen(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="staff-primary-btn"
                                >
                                    Save Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteDepartmentModalOpen && (
                <div className="staff-modal-overlay">
                    <div className="staff-modal staff-delete-modal">
                        <div className="staff-delete-icon">
                            <span className="material-symbols-outlined">
                                warning
                            </span>
                        </div>

                        <div className="staff-delete-content">
                            <h2>Delete Department?</h2>
                            <p>
                                Are you sure you want to delete
                                <strong> {selectedDepartmentToDelete}</strong>?
                                This action cannot be undone.
                            </p>
                        </div>

                        <div className="staff-modal-actions">
                            <button
                                type="button"
                                className="staff-cancel-btn"
                                onClick={() => {
                                    setIsDeleteDepartmentModalOpen(false)
                                    setSelectedDepartmentToDelete('')
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="staff-confirm-delete-btn"
                                onClick={handleConfirmDepartmentDelete}
                            >
                                Delete Department
                            </button>
                        </div>
                    </div>
                </div>
            )}

            

            <div className="staff-main-grid">

                <div className="staff-main-column">

                    <div className="staff-workspace">

                        <div className="staff-tabs">
                            <button
                                className={activeTab === 'roster' ? 'active' : ''}
                                onClick={() => setActiveTab('roster')}
                            >
                                Active Roster Matrix
                            </button>

                            <button
                                className={activeTab === 'directory' ? 'active' : ''}
                                onClick={() => setActiveTab('directory')}
                            >
                                Staff Directory (482)
                            </button>

                            <button
                                className={activeTab === 'departments' ? 'active' : ''}
                                onClick={() => setActiveTab('departments')}
                            >
                                Department Management
                            </button>

                            <button
                                className={activeTab === 'attendance' ? 'active' : ''}
                                onClick={() => setActiveTab('attendance')}
                            >
                                Attendance & Timesheets
                            </button>

                            <button
                                className={activeTab === 'leave' ? 'active' : ''}
                                onClick={() => setActiveTab('leave')}
                            >
                                Leave & Absence
                            </button>
                        </div>

                        <div className="staff-filter-bar">

                            {['A', 'B', 'C'].map(shift => (
                                <button
                                    key={shift}
                                    className={activeShift === shift ? 'active' : ''}
                                    onClick={() => setActiveShift(shift)}
                                >
                                    Shift {shift}
                                    {shift === 'A' && ' (07:00–15:30)'}
                                    {shift === 'B' && ' (15:00–23:30)'}
                                    {shift === 'C' && ' (23:00–07:30)'}
                                </button>
                            ))}

                        </div>

                        <div className="staff-search-row">

                            <select
                                value={selectedDepartment}
                                onChange={e => setSelectedDepartment(e.target.value)}
                            >
                                <option>All Departments</option>
                                <option>ICU</option>
                                <option>Emergency</option>
                                <option>Cardiology</option>
                                <option>Laboratory</option>
                                <option>General Surgery</option>
                                <option>Inpatient Pharmacy</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Search staff or department..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />

                        </div>

                        {activeTab === 'departments' && (
                            <div className="staff-directory">
                                <div className="staff-section-heading">
                                    <div>
                                        <h3>Department Management</h3>
                                        <p>Manage hospital departments and their availability.</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="staff-primary-btn"
                                        onClick={() => setIsDepartmentModalOpen(true)}
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        Add Department
                                    </button>
                                </div>

                                <div className="staff-department-grid">
                                    {departments.map((department, index) => (
                                        <div className="staff-department-card" key={department}>
                                            <div className="staff-department-icon">
                                                <span className="material-symbols-outlined">business</span>
                                            </div>

                                            <div className="staff-department-info">
                                                <h4>{department}</h4>

                                                {departmentDetails[department]?.head && (
                                                    <p>
                                                        <strong>Department Head:</strong> {departmentDetails[department].head}
                                                    </p>
                                                )}

                                                {departmentDetails[department]?.location && (
                                                    <p>
                                                        <strong>Location:</strong> {departmentDetails[department].location}
                                                    </p>
                                                )}

                                                {departmentDetails[department]?.contact && (
                                                    <p>
                                                        <strong>Contact:</strong> {departmentDetails[department].contact}
                                                    </p>
                                                )}
                                                <p>
                                                    {staffMembers.filter(
                                                        staff => staff.department === department
                                                    ).length +
                                                        registeredStaff.filter(
                                                            staff => staff.department === department
                                                        ).length} Staff Members
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="staff-department-edit"
                                                title="Edit Department"
                                                onClick={() => {
                                                    setIsEditDepartment(true)
                                                    setOriginalDepartmentName(department)

                                                    setDepartmentForm({
                                                        name: department,
                                                        head: departmentDetails[department]?.head || '',
                                                        location: departmentDetails[department]?.location || '',
                                                        contact: departmentDetails[department]?.contact || '',
                                                    })

                                                    setIsDepartmentModalOpen(true)
                                                }}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="staff-department-delete"
                                                title="Delete Department"
                                                onClick={() => {
                                                    setSelectedDepartmentToDelete(department)
                                                    setIsDeleteDepartmentModalOpen(true)
                                                }}
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'roster' && (
                            <div className="staff-roster-section">

                                <div className="roster-heading">
                                    <h3>Weekly Ward Roster Matrix</h3>
                                    <span>Cycle: Mon Oct 21 – Sun Oct 27, 2024</span>
                                </div>

                                <div className="staff-table-wrapper">
                                    <table className="staff-roster-table">
                                        <thead>
                                            <tr>
                                                <th>STAFF MEMBER & DEPARTMENT</th>
                                                <th>MON 21</th>
                                                <th>TUE 22</th>
                                                <th>WED 23</th>
                                                <th>THU 24</th>
                                                <th>FRI 25</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredStaff.map(staff => (
                                                <tr key={staff.id}>
                                                    <td>
                                                        <div className="staff-identity">
                                                            <span className={`staff-avatar ${staff.color}`}>
                                                                {staff.initials}
                                                            </span>
                                                            <div>
                                                                <strong>{staff.name}</strong>
                                                                <small>{staff.role} • {staff.department}</small>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {staff.shifts.map((shift, index) => (
                                                        <td key={index}>
                                                            <span className={`shift-badge ${shift.includes('Off') ? 'off' : shift.includes('Night') || shift.includes('On-Call') ? 'night' : shift.includes('Morning') ? 'morning' : 'other'}`}>
                                                                {shift}
                                                            </span>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="roster-footer">
                                    <span>Showing {filteredStaff.length} of 482 active records</span>
                                </div>

                            </div>
                        )}

                        {activeTab === 'directory' && (
                            <div className="staff-directory">
                                <div className="staff-section-heading">
                                    <div>
                                        <h3>Staff Directory</h3>
                                        <p>View hospital employees and their details.</p>
                                    </div>
                                    <span>{filteredStaff.length} Staff Members</span>
                                </div>

                                <div className="staff-directory-table-wrapper">
                                    <table className="staff-directory-table">
                                        <thead>
                                            <tr>
                                                <th>Staff Member</th>
                                                <th>Role</th>
                                                <th>Department</th>
                                                <th>Staff ID</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStaff.length > 0 ? (
                                                filteredStaff.map(staff => (
                                                    <tr key={staff.id}>
                                                        <td>
                                                            <div className="staff-directory-person">
                                                                <span>{staff.initials}</span>
                                                                <strong>{staff.name}</strong>
                                                            </div>
                                                        </td>
                                                        <td>{staff.role}</td>
                                                        <td>{staff.department}</td>
                                                        <td>EMP-{String(staff.id).padStart(4, '0')}</td>
                                                        <td>
                                                            <span className="staff-directory-status">
                                                                Active
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">
                                                        No staff members found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'attendance' && (
                            <div className="staff-placeholder">
                                <span className="material-symbols-outlined">fact_check</span>
                                <h3>Attendance & Timesheets</h3>
                                <p>Staff attendance and working hour records.</p>
                            </div>
                        )}

                        {activeTab === 'leave' && (
                            <div className="staff-placeholder">
                                <span className="material-symbols-outlined">event_busy</span>
                                <h3>Leave & Absence</h3>
                                <p>Manage leave requests and approvals.</p>
                            </div>
                        )}

                    </div>

                </div>

                <div className="staff-sidebar-column">

                    <div className="staff-profile-card">
                        <span className="staff-profile-avatar">MW</span>

                        <h3>Marcus Webb</h3>
                        <span className="staff-active-label">ACTIVE</span>

                        <p>ICU Lead Charge Nurse • #EMP-88214</p>

                        <div className="profile-details">
                            <div><span>License / Registry</span><b>RN-CA-892109</b></div>
                            <div><span>Expires / Re-cert</span><b>Nov 28, 2026</b></div>
                            <div><span>Email</span><b>m.webb@hospital.lk</b></div>
                            <div><span>Pager / Hospital Ext.</span><b>Pager #802</b></div>
                        </div>

                        <div className="profile-tags">
                            <span>ICU Floor 3 West</span>
                            <span>Shift A Lead</span>
                            <span>ACLS & BLS Certified</span>
                        </div>

                        <h4>This Week's Logged Hours</h4>
                        <div className="staff-progress">
                            <span style={{ width: '96%' }}></span>
                        </div>
                        <p>42.5 hrs / 40.0 Regular</p>
                    </div>

                    <div className="staff-requests-card">
                        <h3>Shift Swaps & Leaves</h3>

                        <div className="request-item">
                            <span className="request-status">PENDING</span>
                            <strong>Shift Exchange Request</strong>
                            <p>Elena Rostova ↔ Daniel Kim (ED)</p>
                            <small>Oct 25 Evening → Oct 27 Morning</small>

                            <div className="request-actions">
                                <button>Decline</button>
                                <button>Approve Swap</button>
                            </div>
                        </div>

                        <div className="request-item">
                            <span className="request-status">3 DAYS</span>
                            <strong>CME Conference Leave</strong>
                            <p>Dr. Mateo Ramos (Pediatrics)</p>
                            <small>Nov 02 – Nov 04, 2026</small>

                            <div className="request-actions">
                                <button>Decline</button>
                                <button>Approve Leave</button>
                            </div>
                        </div>
                    </div>

                    <div className="staff-credential-card">
                        <h3>Credential Verification</h3>
                        <p>✓ Medical License – Verified</p>
                        <p>✓ Pediatric PALS – Active</p>
                        <p>✓ TB Screening – Cleared</p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default StaffReports

import React from 'react'
import './Billing.css'

function Billing() {
    const [activeView, setActiveView] = React.useState('matrix')
    const [selectedWard, setSelectedWard] = React.useState('All Wards')
    const [selectedBedStatus, setSelectedBedStatus] = React.useState('All Bed States')
    const [bedSearch, setBedSearch] = React.useState('')

    const [isAdmissionModalOpen, setIsAdmissionModalOpen] = React.useState(false)

    const [admissionForm, setAdmissionForm] = React.useState({
        patientName: '',
        patientMrn: '',
        ward: '',
        bed: '',
        doctor: '',
        admissionDate: '',
        insurance: '',
    })

    const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false)

    const [paymentForm, setPaymentForm] = React.useState({
        amount: '',
        method: 'Cash',
        reference: '',
    })

    const [invoicePayment, setInvoicePayment] = React.useState({
        paidAmount: 0,
        balanceDue: 882,
    })

    const [paymentHistory, setPaymentHistory] = React.useState([])

    const [paymentSuccess, setPaymentSuccess] = React.useState(false)
    const [paymentError, setPaymentError] = React.useState('')

    const [censusPatients, setCensusPatients] = React.useState([
        {
            bed: '302B',
            name: 'Eleanor Vance',
            mrn: 'PT-84201',
            admitted: 'Oct 20, 2026',
            doctor: 'Dr. S. Jenkins',
            insurance: 'BCBS PPO (90%)',
            charges: 'Rs. 13,820.00',
            status: 'Bill Final',
            statusType: 'warning',
        },
        {
            bed: 'ICU-301',
            name: 'Robert Langdon',
            mrn: 'MRN-6520',
            admitted: 'Oct 22, 2026',
            doctor: 'Dr. S. Jenkins',
            insurance: 'Medicare Part A',
            charges: 'Rs. 18,450.00',
            status: 'In Treatment',
            statusType: 'neutral',
        },
        {
            bed: 'ICU-304',
            name: 'Elena Rodriguez',
            mrn: 'MRN-8871',
            admitted: 'Oct 21, 2026',
            doctor: 'Dr. R. Chen',
            insurance: 'Aetna Premier',
            charges: 'Rs. 6,450.00',
            status: 'Auth Pass',
            statusType: 'success',
        },
        {
            bed: '302A',
            name: 'Chloe Bennett',
            mrn: 'MRN-8849',
            admitted: 'Oct 21, 2026',
            doctor: 'Dr. M. Patel',
            insurance: 'UnitedHealthcare',
            charges: 'Rs. 8,240.00',
            status: 'Lab Pending',
            statusType: 'danger',
        },
    ])

    const [admittedBeds, setAdmittedBeds] = React.useState([])

      const wards = [
            { name: 'General Ward A', beds: 20, occupied: 16, cleaning: 2 },
            { name: 'General Ward B', beds: 20, occupied: 14, cleaning: 1 },
            { name: 'Surgical Ward', beds: 16, occupied: 13, cleaning: 1 },
            { name: 'Medical Ward', beds: 24, occupied: 20, cleaning: 2 },
            { name: 'ICU', beds: 12, occupied: 10, cleaning: 1 },
            { name: 'Pediatric Ward', beds: 18, occupied: 12, cleaning: 2 },
        ]

        const filteredWards = wards
            .filter((ward) =>
                selectedWard === 'All Wards' || ward.name === selectedWard
            )
            .map((ward) => {
                const beds = Array.from({ length: ward.beds }, (_, index) => {
                    const isNewlyOccupied = admittedBeds.includes(
                        `${ward.name} - ${index + 1}`
                    )

                    const status = isNewlyOccupied
                        ? 'occupied'
                        : index < ward.occupied
                        ? 'occupied'
                        : index < ward.occupied + ward.cleaning
                        ? 'cleaning'
                        : 'available'
                    return { number: index + 1, status }
                }).filter((bed) => {
                    const matchesStatus =
                        selectedBedStatus === 'All Bed States' ||
                        bed.status === selectedBedStatus.toLowerCase()

                    const matchesSearch =
                        `bed ${bed.number}`.includes(bedSearch.trim().toLowerCase()) ||
                        String(bed.number).includes(bedSearch.trim())

                    return matchesStatus && (!bedSearch.trim() || matchesSearch)
                })

                return { ...ward, filteredBeds: beds }
            })
            .filter((ward) => ward.filteredBeds.length > 0)

        const handleAdmissionSubmit = (e) => {
            e.preventDefault()

            const { patientName, patientMrn, ward, bed, doctor, admissionDate, insurance } = admissionForm

            if (!patientName || !patientMrn || !ward || !bed || !doctor || !admissionDate) {
                alert('Please fill in all required fields.')
                return
            }

            const bedAlreadyOccupied = admittedBeds.includes(`${ward} - ${bed}`)

            if (bedAlreadyOccupied) {
                alert('This bed is already occupied. Please select another bed.')
                return
            }

            const selectedWardData = wards.find((item) => item.name === ward)

            const newPatient = {
                bed: `${ward} - ${bed}`,
                name: patientName,
                mrn: patientMrn,
                admitted: admissionDate,
                doctor,
                insurance: insurance || 'Not Provided',
                charges: 'Rs. 0.00',
                status: 'In Treatment',
                statusType: 'neutral',
            }

            setAdmittedBeds((previous) => [...previous, `${ward} - ${bed}`])
            setCensusPatients((previous) => [newPatient, ...previous])
            setIsAdmissionModalOpen(false)
            setActiveView('census')

            setAdmissionForm({
                patientName: '',
                patientMrn: '',
                ward: '',
                bed: '',
                doctor: '',
                admissionDate: '',
                insurance: '',
            })

            alert('Patient admitted successfully!')
        }

        const [isDischargeModalOpen, setIsDischargeModalOpen] = React.useState(false)
        const [selectedDischargePatient, setSelectedDischargePatient] = React.useState(null)
        const [dischargeSuccess, setDischargeSuccess] = React.useState(false)
        const handleDischarge = (patient) => {
            setSelectedDischargePatient(patient)
            setIsDischargeModalOpen(true)
        }

        const handlePaymentSubmit = (e) => {
            e.preventDefault()

            const amount = Number(paymentForm.amount)
            const balanceDue = invoicePayment.balanceDue

            if (!amount || amount <= 0) {
                setPaymentError('Please enter a valid payment amount.')
                return
            }

            if (amount > balanceDue) {
                setPaymentError('Payment amount cannot exceed the balance due.')
                return
            }

            setInvoicePayment(previous => ({
                paidAmount: previous.paidAmount + amount,
                balanceDue: previous.balanceDue - amount,
            }))

            setPaymentHistory(previous => [
                ...previous,
                {
                    id: Date.now(),
                    amount: amount,
                    method: paymentForm.method,
                    reference: paymentForm.reference || 'N/A',
                    date: new Date().toLocaleDateString('en-GB'),
                },
            ])

            setPaymentError('')
            setPaymentSuccess(true)
            setPaymentForm({
                amount: '',
                method: 'Cash',
                reference: '',
            })
            setIsPaymentModalOpen(false)

            setTimeout(() => setPaymentSuccess(false), 3000)
        }

        const confirmDischarge = () => {
            if (!selectedDischargePatient) return

            const patient = selectedDischargePatient

            setCensusPatients((previous) =>
                previous.filter((item) => item.mrn !== patient.mrn)
            )

            setAdmittedBeds((previous) =>
                previous.filter((bed) => bed !== patient.bed)
            )

            setIsDischargeModalOpen(false)
            setSelectedDischargePatient(null)
            setDischargeSuccess(true)

            setTimeout(() => {
                setDischargeSuccess(false)
            }, 3000)
        }
  const summaryCards = [
    {
      title: 'TOTAL INPATIENT CENSUS',
      value: censusPatients.length.toString(),
      suffix: '/ 194 Beds',
      detail: `${((censusPatients.length / 194) * 100).toFixed(1)}% Capacity`,
      icon: 'bed',
      color: 'teal',
    },
    {
      title: 'ADMISSION & DISCHARGE VELOCITY',
      value: '18',
      suffix: 'Scheduled / 12 New Admits',
      detail: '6 Patients Cleared & Invoiced',
      icon: 'swap_horiz',
      color: 'blue',
    },
    {
      title: 'RECEIVABLES & IN-HOUSE ACCOUNTS',
      value: 'Rs. 248,650.00',
      suffix: '',
      detail: '+4.2% MoM Velocity',
      icon: 'account_balance_wallet',
      color: 'purple',
    },
    {
      title: 'TURNAROUND & SANITIZATION',
      value: '8',
      suffix: 'Active Turnovers',
      detail: 'Turnover TAT: 42 mins (Goal <45m)',
      icon: 'cleaning_services',
      color: 'orange',
    },
  ]

  return (
    <div className="billing-page">
        {isPaymentModalOpen && (
            <div className="billing-modal-overlay">
                <div className="billing-modal">
                    <div className="billing-modal-header">
                        <div>
                            <h2>Receive Patient Payment</h2>
                            <p>Record a payment against the outstanding invoice.</p>
                        </div>

                        <button
                            type="button"
                            className="billing-modal-close"
                            onClick={() => setIsPaymentModalOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="billing-discharge-details">
                        <strong>Eleanor Vance</strong>
                        <p>
                            Invoice Balance: Rs. {invoicePayment.balanceDue.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    <form
                        className="billing-admission-form"
                        onSubmit={handlePaymentSubmit}
                    >
                        <label>
                            Payment Amount (LKR)
                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="Enter payment amount"
                                value={paymentForm.amount}
                                onChange={(e) => setPaymentForm({
                                    ...paymentForm,
                                    amount: e.target.value
                                })}
                                required
                            />
                        </label>

                        <label>
                            Payment Method
                            <select
                                value={paymentForm.method}
                                onChange={(e) => setPaymentForm({
                                    ...paymentForm,
                                    method: e.target.value
                                })}
                            >
                                <option>Cash</option>
                                <option>Card</option>
                                <option>Bank Transfer</option>
                                <option>Insurance</option>
                            </select>
                        </label>

                        <label>
                            Reference Number
                            <input
                                type="text"
                                placeholder="Enter reference number"
                                value={paymentForm.reference}
                                onChange={(e) => setPaymentForm({
                                    ...paymentForm,
                                    reference: e.target.value
                                })}
                            />
                        </label>

                        <div className="billing-modal-actions">
                            <button
                                type="button"
                                onClick={() => setIsPaymentModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="primary">
                                Confirm Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

    {isDischargeModalOpen && selectedDischargePatient && (
        <div className="billing-modal-overlay">
            <div className="billing-modal">
                <div className="billing-modal-header">
                    <div>
                        <h2>Confirm Patient Discharge</h2>
                        <p>Are you sure you want to discharge this patient?</p>
                    </div>

                    <button
                        type="button"
                        className="billing-modal-close"
                        onClick={() => setIsDischargeModalOpen(false)}
                    >
                        ×
                    </button>
                </div>

                <div className="billing-discharge-details">
                    <strong>{selectedDischargePatient.name}</strong>
                    <p>MRN: {selectedDischargePatient.mrn}</p>
                    <p>Bed: {selectedDischargePatient.bed}</p>
                </div>

                <div className="billing-modal-actions">
                    <button
                        type="button"
                        onClick={() => setIsDischargeModalOpen(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="billing-confirm-discharge"
                        onClick={confirmDischarge}
                    >
                        Confirm Discharge
                    </button>
                </div>
            </div>
        </div>
    )}

    {dischargeSuccess && (
        <div className="billing-success-toast">
            <span className="material-symbols-outlined">
                check_circle
            </span>
            <div>
                <strong>Discharge Successful!</strong>
                <p>Patient has been discharged successfully.</p>
            </div>
            <button
                type="button"
                onClick={() => setDischargeSuccess(false)}
            >
                ×
            </button>
        </div>
    )}


    {paymentSuccess && (
        <div className="billing-success-toast">
            <span className="material-symbols-outlined">
                check_circle
            </span>
            <div>
                <strong>Payment Successful!</strong>
                <p>Patient payment has been recorded successfully.</p>
            </div>
            <button
                type="button"
                onClick={() => setPaymentSuccess(false)}
            >
                ×
            </button>
        </div>
    )}

    {paymentError && (
        <div className="billing-error-toast">
            <span className="material-symbols-outlined">
                error
            </span>
            <div>
                <strong>Payment Failed!</strong>
                <p>{paymentError}</p>
            </div>
            <button
                type="button"
                onClick={() => setPaymentError('')}
            >
                ×
            </button>
        </div>
    )}



    {isAdmissionModalOpen && (
        <div className="billing-modal-overlay">
            <div className="billing-modal">
            <div className="billing-modal-header">
                <div>
                <h2>Admit New Patient</h2>
                <p>Register an inpatient and allocate a hospital bed.</p>
                </div>
                <button
                type="button"
                onClick={() => setIsAdmissionModalOpen(false)}
                className="billing-modal-close"
                >
                ×
                </button>
            </div>

            <form
                className="billing-admission-form"
                onSubmit={handleAdmissionSubmit}
            >
                <label>
                Patient Name
                <input
                    type="text"
                    placeholder="Enter patient name"
                    value={admissionForm.patientName}
                    onChange={(e) => setAdmissionForm({...admissionForm, patientName: e.target.value})}
                />
                </label>

                <label>
                Patient MRN
                <input
                    type="text"
                    placeholder="Enter MRN"
                    value={admissionForm.patientMrn}
                    onChange={(e) => setAdmissionForm({...admissionForm, patientMrn: e.target.value})}
                />
                </label>

                <label>
                Ward
                <select
                    value={admissionForm.ward}
                    onChange={(e) => setAdmissionForm({...admissionForm, ward: e.target.value, bed: ''})}
                >
                    <option value="">Select Ward</option>
                    {wards.map((ward) => (
                    <option key={ward.name} value={ward.name}>{ward.name}</option>
                    ))}
                </select>
                </label>

                <label>
                Bed Number
                <select
                    value={admissionForm.bed}
                    onChange={(e) => setAdmissionForm({...admissionForm, bed: e.target.value})}
                >
                    <option value="">Select Bed</option>
                    {wards
                    .filter((ward) => ward.name === admissionForm.ward)
                    .flatMap((ward) => Array.from({length: ward.beds}, (_, index) => {
                        const status = index < ward.occupied ? 'occupied' : index < ward.occupied + ward.cleaning ? 'cleaning' : 'available'
                        return status === 'available' ? (
                        <option key={index} value={index + 1}>Bed {index + 1}</option>
                        ) : null
                    }))}
                </select>
                </label>

                <label>
                Attending Doctor
                <input
                    type="text"
                    placeholder="Enter doctor name"
                    value={admissionForm.doctor}
                    onChange={(e) => setAdmissionForm({...admissionForm, doctor: e.target.value})}
                />
                </label>

                <label>
                Admission Date
                <input
                    type="date"
                    value={admissionForm.admissionDate}
                    onChange={(e) => setAdmissionForm({...admissionForm, admissionDate: e.target.value})}
                />
                </label>

                <label>
                Insurance / TPA
                <input
                    type="text"
                    placeholder="Enter insurance provider"
                    value={admissionForm.insurance}
                    onChange={(e) => setAdmissionForm({...admissionForm, insurance: e.target.value})}
                />
                </label>

                <div className="billing-modal-actions">
                <button type="button" onClick={() => setIsAdmissionModalOpen(false)}>
                    Cancel
                </button>
                <button type="submit" className="primary">
                    Admit Patient
                </button>
                </div>
            </form>
            </div>
        </div>
    )}

      <div className="billing-header">
        <div>
          <p className="billing-breadcrumb">
            Hospital Operations / Billing & Inpatient
          </p>

          <h1>Inpatient Bed Registry & Revenue Management</h1>

          <p className="billing-subtitle">
            Manage patient admissions, ward allocation, billing and payments.
          </p>

          <div className="billing-header-actions">
                <button
                    type="button"
                    className="billing-action-btn"
                    onClick={() => setIsAdmissionModalOpen(true)}
                >
                    <span className="material-symbols-outlined">person_add</span>
                    Admit New Patient
                </button>

                <button type="button" className="billing-action-btn">
                    <span className="material-symbols-outlined">receipt_long</span>
                    Insurance Claim Batch
                    <span className="billing-ready-badge">8 Ready</span>
                </button>

                <button type="button" className="billing-action-btn primary">
                    <span className="material-symbols-outlined">receipt</span>
                    Generate Patient Invoice
                </button>
            </div>
        </div>
      </div>

      <div className="billing-summary-grid">
        {summaryCards.map((card, index) => (
          <div
            className={`billing-summary-card ${card.color}`}
            key={index}
          >
            <div className="billing-card-top">
              <span>{card.title}</span>
              <span className="material-symbols-outlined">
                {card.icon}
              </span>
            </div>

            <div className="billing-card-value">
              <strong>{card.value}</strong>
              {card.suffix && <span>{card.suffix}</span>}
            </div>

            <div className="billing-card-detail">
              {card.detail}
            </div>
          </div>
        ))}
      </div>


        <div className="billing-navigation">
            <button
                type="button"
                className={`billing-tab ${activeView === 'matrix' ? 'active' : ''}`}
                onClick={() => setActiveView('matrix')}
            >
                <span className="material-symbols-outlined">grid_view</span>
                Ward & Bed Visual Matrix
            </button>

            <button
                type="button"
                className={`billing-tab ${activeView === 'census' ? 'active' : ''}`}
                onClick={() => setActiveView('census')}
            >
                <span className="material-symbols-outlined">groups</span>
                Census List
                <span className="billing-tab-count">{censusPatients.length}</span>
            </button>

            <button
                type="button"
                className={`billing-tab ${activeView === 'invoice' ? 'active' : ''}`}
                onClick={() => setActiveView('invoice')}
            >
                <span className="material-symbols-outlined">receipt_long</span>
                Itemized Invoice
            </button>
        </div>


      
        <div className="billing-content">
            {activeView === 'matrix' && (
                <>
                <div className="billing-section-header">
                    <div>
                    <h2>Ward & Bed Visual Matrix</h2>
                    <p>Real-time overview of hospital ward occupancy and bed availability.</p>
                    </div>
                    <span className="billing-live-status">
                    <span className="billing-live-dot"></span>
                    Live Census
                    </span>
                </div>

                <div className="billing-filters">
                    <select
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                    >
                        <option>All Wards</option>
                        <option>General Ward A</option>
                        <option>General Ward B</option>
                        <option>Surgical Ward</option>
                        <option>Medical Ward</option>
                        <option>ICU</option>
                        <option>Pediatric Ward</option>
                    </select>

                    <select
                        value={selectedBedStatus}
                        onChange={(e) => setSelectedBedStatus(e.target.value)}
                    >
                        <option>All Bed States</option>
                        <option>Occupied</option>
                        <option>Available</option>
                        <option>Cleaning</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search bed or patient..."
                        value={bedSearch}
                        onChange={(e) => setBedSearch(e.target.value)}
                    />
                </div>

                <div className="billing-legend">
                    <span><i className="bed-dot available"></i> Available</span>
                    <span><i className="bed-dot occupied"></i> Occupied</span>
                    <span><i className="bed-dot cleaning"></i> Cleaning</span>
                    <span><i className="bed-dot reserved"></i> Reserved</span>
                </div>

                
                <div className="billing-ward-grid">
                    {filteredWards.map((ward) => (
                        <div className="billing-ward-card" key={ward.name}>
                        <div className="billing-ward-heading">
                            <div>
                            <h3>{ward.name}</h3>
                            <p>{ward.beds} Total Beds</p>
                            </div>
                            <span className="material-symbols-outlined">local_hospital</span>
                        </div>

                        <div className="billing-bed-grid">
                            {ward.filteredBeds.map((bed) => (
                            <div
                                key={bed.number}
                                className={`billing-bed ${bed.status}`}
                                title={`Bed ${bed.number} - ${bed.status}`}
                            >
                                {bed.number}
                            </div>
                            ))}
                        </div>

                        <div className="billing-ward-footer">
                            <span>
                            {ward.filteredBeds.filter((bed) => bed.status === 'occupied').length} Occupied
                            </span>
                            <span>
                            {ward.filteredBeds.filter((bed) => bed.status === 'available').length} Available
                            </span>
                        </div>
                        </div>
                    ))}

                    {filteredWards.length === 0 && (
                        <p className="billing-empty-state">
                        No beds found matching your filters.
                        </p>
                    )}
                </div>

                </>
            )}

            
            {activeView === 'census' && (
                <>
                    <div className="billing-section-header">
                    <div>
                        <h2>Active Ward Admissions & Financial Status</h2>
                        <p>Currently admitted patients and their billing information.</p>
                    </div>
                    <span className="billing-live-status">
                        {censusPatients.length} Patients
                    </span>
                    </div>

                    <div className="billing-table-wrapper">
                    <table className="billing-table">
                        <thead>
                        <tr>
                            <th>BED #</th>
                            <th>PATIENT & MRN</th>
                            <th>ADMITTED</th>
                            <th>ATTENDING</th>
                            <th>INSURANCE / TPA</th>
                            <th>CHARGES</th>
                            <th>CLEARANCE</th>
                        </tr>
                        </thead>

                        <tbody>
                        {censusPatients.map((patient) => (
                            <tr key={patient.bed}>
                            <td><strong>{patient.bed}</strong></td>
                            <td>
                                <strong>{patient.name}</strong>
                                <small>{patient.mrn}</small>
                            </td>
                            <td>{patient.admitted}</td>
                            <td>{patient.doctor}</td>
                            <td>{patient.insurance}</td>
                            <td><strong>{patient.charges}</strong></td>
                            <td>
                                <span className={`billing-status ${patient.statusType}`}>
                                {patient.status}
                                </span>

                                <button
                                    type="button"
                                    className="billing-discharge-btn"
                                    onClick={() => handleDischarge(patient)}
                                >
                                    Discharge
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </>
            )}

            
            {activeView === 'invoice' && (
                <>
                    <div className="billing-section-header">
                    <div>
                        <h2>Itemized Patient Invoice</h2>
                        <p>Detailed breakdown of inpatient treatment charges and payments.</p>
                    </div>
                    <span className="billing-live-status">Invoice Preview</span>
                    </div>

                    <div className="billing-invoice">
                    <div className="billing-invoice-patient">
                        <div>
                        <span className="billing-invoice-label">PATIENT NAME</span>
                        <h3>Eleanor Vance</h3>
                        <p>MRN: PT-84201 · Bed 302B</p>
                        </div>
                        <div>
                        <span className="billing-invoice-label">ATTENDING DOCTOR</span>
                        <h3>Dr. S. Jenkins</h3>
                        <p>Admission: 20 Oct 2026</p>
                        </div>
                    </div>

                    <div className="billing-invoice-items">
                        {[
                        { name: 'Room & Nursing Care', description: '4 Days Ward 3B Semi-Private', amount: 5000 },
                        { name: 'Pharmacy & Infusions', description: 'Medicines, IV fluids and prescriptions', amount: 3420 },
                        { name: 'Laboratory & Diagnostics', description: 'CBC, BMP, Chest X-Ray', amount: 2650 },
                        { name: 'Specialist Consultations', description: 'Dr. Sarah Jenkins (4 Rounds)', amount: 1800 },
                        { name: 'Consumables & Sterile Trays', description: 'IV line kits, wound dressings', amount: 950 },
                        ].map((item) => (
                        <div className="billing-invoice-item" key={item.name}>
                            <div>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            </div>
                            <strong>Rs. {item.amount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</strong>
                        </div>
                        ))}
                    </div>

                    <div className="billing-invoice-summary">
                        <div>
                        <span>Gross Claim Total</span>
                        <strong>Rs. 13,820.00</strong>
                        </div>
                        <div className="insurance-deduction">
                        <span>Insurance Coverage (90%)</span>
                        <strong>- Rs. 12,438.00</strong>
                        </div>
                        <div>
                        <span>Deductible & Co-Pay Share</span>
                        <strong>Rs. 1,382.00</strong>
                        </div>
                        <div>
                        <span>Patient Pre-Admission Deposit</span>
                        <strong>- Rs. 500.00</strong>
                        </div>
                        <div className="billing-invoice-balance">
                        <div>
                            <span>NET BALANCE DUE</span>
                            <small>Payable at Discharge Desk</small>
                        </div>
                        <strong>
                            Rs. {invoicePayment.balanceDue.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </strong>
                        </div>

                        <button
                            type="button"
                            className="billing-action-btn primary"
                            onClick={() => setIsPaymentModalOpen(true)}
                        >
                            <span className="material-symbols-outlined">payments</span>
                            Receive Payment
                        </button>
                    </div> 
                    </div>

                    <div className="billing-payment-history">
                        <h3>Payment History</h3>

                        {paymentHistory.length === 0 ? (
                            <p className="billing-empty-history">
                                No payments recorded yet.
                            </p>
                        ) : (
                            <div className="billing-history-table-wrapper">
                                <table className="billing-history-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Reference Number</th>
                                            <th>Payment Method</th>
                                            <th>Amount (LKR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentHistory.map((payment) => (
                                            <tr key={payment.id}>
                                                <td>{payment.date}</td>
                                                <td>{payment.reference}</td>
                                                <td>{payment.method}</td>
                                                <td>
                                                    Rs. {payment.amount.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}

        </div>

    </div>
  )
}

export default Billing

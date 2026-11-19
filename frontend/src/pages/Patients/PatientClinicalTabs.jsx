
import { useState } from 'react'
import { useEffect } from 'react'
import { api } from '../../services/api'


const tabs = [
  'Clinical Notes',
  'Prescriptions',
  'Lab & Radiology',
  'Treatment Timeline',
  'Billing History',
]

const today = () => new Date().toISOString().split('T')[0]

const initialDiagnosisForm = () => ({
  diagnosisName: '',
  symptoms: '',
  doctorNotes: '',
  diagnosisDate: today(),
  doctorName: '',
  medicalHistory: '',
})

const initialPrescriptionForm = () => ({
  medicineName: '',
  dosage: '',
  frequency: '',
  duration: '',
  instructions: '',
  doctorName: '',
  prescriptionDate: today(),
})

const initialLabForm = () => ({
  testName: '',
  testCategory: 'Blood Test',
  doctorName: '',
  requestDate: today(),
  priority: 'Normal',
  status: 'Requested',
  results: '',
})


const initialTimelineForm = () => ({
  visitDate: today(),
  doctorName: '',
  treatmentDescription: '',
  clinicalNotes: '',
  followUpDate: '',
  status: 'Ongoing',
})


const initialBillingForm = () => ({
  invoiceNumber: '',
  invoiceDate: today(),
  totalAmount: '',
  paidAmount: '',
  paymentStatus: 'Pending',
  paymentMethod: 'Cash',
  description: '',
})



function PatientClinicalTabs({ patient }) {
  const [activeTab, setActiveTab] = useState('Clinical Notes')

  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false)
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false)
  const [showLabForm, setShowLabForm] = useState(false)

  const [diagnoses, setDiagnoses] = useState({})
  const [diagnosesLoading, setDiagnosesLoading] = useState(false)
  const [diagnosisError, setDiagnosisError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadDiagnoses() {
      try {
        setDiagnosesLoading(true)
        setDiagnosisError('')

        const data = await api.get(`/patients/${patient.id}/diagnoses`)

        if (isActive) {
          setDiagnoses((current) => ({
            ...current,
            [patient.id]: data,
          }))
        }
      } catch (error) {
        if (isActive) {
          setDiagnosisError(error.message || 'Failed to load diagnoses.')
        }
      } finally {
        if (isActive) {
          setDiagnosesLoading(false)
        }
      }
    }

    if (patient?.id) {
      loadDiagnoses()
    }

    return () => {
      isActive = false
    }
  }, [patient?.id])
  const [prescriptions, setPrescriptions] = useState({})
  const [labRecords, setLabRecords] = useState({})

  const [formData, setFormData] = useState(initialDiagnosisForm)
  const [prescriptionData, setPrescriptionData] = useState(
    initialPrescriptionForm
  )
  const [labData, setLabData] = useState(initialLabForm)


  const [showTimelineForm, setShowTimelineForm] = useState(false)
  const [timelineData, setTimelineData] = useState(initialTimelineForm)
  const [timelineRecords, setTimelineRecords] = useState({})

  const [showBillingForm, setShowBillingForm] = useState(false)
  const [billingRecords, setBillingRecords] = useState({})
  const [billingData, setBillingData] = useState(initialBillingForm)




  const patientDiagnoses = diagnoses[patient.id] || []
  const patientPrescriptions = prescriptions[patient.id] || []
  const patientLabRecords = labRecords[patient.id] || []
  const patientTimelineRecords = timelineRecords[patient.id] || []
  const patientBillingRecords = billingRecords[patient.id] || []


  
  // Save Diagnosis
  async function handleDiagnosisSubmit(event) {
    event.preventDefault()

    try {
      setDiagnosisError('')

      const newDiagnosis = await api.post(
        `/patients/${patient.id}/diagnoses`,
        formData
      )

      setDiagnoses((current) => ({
        ...current,
        [patient.id]: [
          newDiagnosis,
          ...(current[patient.id] || []),
        ],
      }))

      setFormData(initialDiagnosisForm())
      setShowDiagnosisForm(false)
    } catch (error) {
      setDiagnosisError(error.message || 'Failed to save diagnosis.')
    }
  }

  // Delete Diagnosis
  async function handleDeleteDiagnosis(diagnosisId) {
    if (!window.confirm('Are you sure you want to delete this diagnosis?')) {
      return
    }

    try {
      setDiagnosisError('')

      await api.delete(
        `/patients/${patient.id}/diagnoses/${diagnosisId}`
      )

      setDiagnoses((current) => ({
        ...current,
        [patient.id]: (current[patient.id] || []).filter(
          (item) => item.id !== diagnosisId
        ),
      }))
    } catch (error) {
      setDiagnosisError(error.message || 'Failed to delete diagnosis.')
    }
  }

  // Save Prescription
  function handlePrescriptionSubmit(event) {
    event.preventDefault()

    const newPrescription = {
      ...prescriptionData,
      id: Date.now(),
    }

    setPrescriptions((current) => ({
      ...current,
      [patient.id]: [
        newPrescription,
        ...(current[patient.id] || []),
      ],
    }))

    setPrescriptionData(initialPrescriptionForm())
    setShowPrescriptionForm(false)
  }

  // Delete Prescription
  function handleDeletePrescription(prescriptionId) {
    if (!window.confirm('Are you sure you want to delete this prescription?')) {
      return
    }

    setPrescriptions((current) => ({
      ...current,
      [patient.id]: (current[patient.id] || []).filter(
        (item) => item.id !== prescriptionId
      ),
    }))
  }

  // Save Lab Request
  function handleLabSubmit(event) {
    event.preventDefault()

    const newLabRecord = {
      ...labData,
      id: Date.now(),
    }

    setLabRecords((current) => ({
      ...current,
      [patient.id]: [
        newLabRecord,
        ...(current[patient.id] || []),
      ],
    }))

    setLabData(initialLabForm())
    setShowLabForm(false)
  }

  // Delete Lab Request
  function handleDeleteLab(labId) {
    if (!window.confirm('Are you sure you want to delete this lab record?')) {
      return
    }

    setLabRecords((current) => ({
      ...current,
      [patient.id]: (current[patient.id] || []).filter(
        (item) => item.id !== labId
      ),
    }))
  }

  // Save Treatment Timeline Record
  function handleTimelineSubmit(event) {
    event.preventDefault()

    const newRecord = {
      ...timelineData,
      id: Date.now(),
    }

    setTimelineRecords((current) => ({
      ...current,
      [patient.id]: [
        newRecord,
        ...(current[patient.id] || []),
      ],
    }))

    setTimelineData(initialTimelineForm())
    setShowTimelineForm(false)
  }

  // Delete Treatment Timeline Record
  function handleDeleteTimeline(recordId) {
    if (!window.confirm('Are you sure you want to delete this treatment record?')) {
      return
    }

    setTimelineRecords((current) => ({
      ...current,
      [patient.id]: (current[patient.id] || []).filter(
        (item) => item.id !== recordId
      ),
    }))
  }


    // Save Billing Record
    function handleBillingSubmit(event) {
    event.preventDefault()

    const total = Number(billingData.totalAmount)
    const paid = Number(billingData.paidAmount)

    if (paid > total) {
        alert('Paid amount cannot exceed total amount.')
        return
    }

    const balance = total - paid

    const newBillingRecord = {
        ...billingData,
        id: Date.now(),
        totalAmount: total,
        paidAmount: paid,
        balance,
        paymentStatus:
        balance === 0 ? 'Paid' : paid > 0 ? 'Partially Paid' : 'Pending',
    }

    setBillingRecords((current) => ({
        ...current,
        [patient.id]: [
        newBillingRecord,
        ...(current[patient.id] || []),
        ],
    }))

    setBillingData(initialBillingForm())
    setShowBillingForm(false)
    }

    // Delete Billing Record
    function handleDeleteBilling(recordId) {
    if (!window.confirm('Are you sure you want to delete this billing record?')) {
        return
    }

    setBillingRecords((current) => ({
        ...current,
        [patient.id]: (current[patient.id] || []).filter(
        (item) => item.id !== recordId
        ),
    }))
    }



  const tabContent = {
    'Clinical Notes': {
      title: 'Diagnosis & Medical History',
      description: 'Manage patient diagnosis and medical history.',
    },
    Prescriptions: {
      title: 'Prescriptions & Medications',
      description: 'Manage patient prescriptions and medication history.',
    },
    'Lab & Radiology': {
      title: 'Laboratory & Radiology Reports',
      description: 'Manage laboratory requests, radiology tests and results.',
    },
    'Treatment Timeline': {
      title: 'Treatment Timeline',
      description: 'Patient visits, treatments and clinical activities will appear here.',
    },
    'Billing History': {
      title: 'Billing & Payment History',
      description: 'Patient invoices and payment records will appear here.',
    },
  }

  const currentContent = tabContent[activeTab]

  return (
    <section className="patient-clinical-tabs">

      <div className="patient-tabs-header">
        <h3>Clinical Records</h3>
        <p>Medical records for {patient.name}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="patient-tabs-navigation">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={`patient-tab-button ${
              activeTab === tab ? 'active' : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="patient-tab-content">

        <div className="patient-diagnosis-heading">
          <div>
            <h4>{currentContent.title}</h4>
            <p>{currentContent.description}</p>
          </div>

          {activeTab === 'Clinical Notes' && (
            <button
              type="button"
              className="patient-add-diagnosis-button"
              onClick={() => setShowDiagnosisForm((current) => !current)}
            >
              {showDiagnosisForm ? 'Close Form' : '+ Add Diagnosis'}
            </button>
          )}

          {activeTab === 'Prescriptions' && (
            <button
              type="button"
              className="patient-add-diagnosis-button"
              onClick={() => setShowPrescriptionForm((current) => !current)}
            >
              {showPrescriptionForm ? 'Close Form' : '+ Add Prescription'}
            </button>
          )}

          {activeTab === 'Lab & Radiology' && (
            <button
              type="button"
              className="patient-add-diagnosis-button"
              onClick={() => setShowLabForm((current) => !current)}
            >
              {showLabForm ? 'Close Form' : '+ Add Lab Request'}
            </button>
          )}

            {activeTab === 'Treatment Timeline' && (
                <button
                    type="button"
                    className="patient-add-diagnosis-button"
                    onClick={() => setShowTimelineForm((current) => !current)}
                >
                    {showTimelineForm ? 'Close Form' : '+ Add Treatment'}
                </button>
            )}


            {activeTab === 'Billing History' && (
            <button
                type="button"
                className="patient-add-diagnosis-button"
                onClick={() => setShowBillingForm((current) => !current)}
            >
                {showBillingForm ? 'Close Form' : '+ Add Invoice'}
            </button>
            )}


        </div>


        {activeTab === 'Treatment Timeline' && (
        <>
            {showTimelineForm && (
            <form
                className="patient-diagnosis-form"
                onSubmit={handleTimelineSubmit}
            >
                <h4>New Treatment Record</h4>

                <div className="patient-diagnosis-form-grid">
                <label>
                    Visit Date
                    <input
                    type="date"
                    required
                    value={timelineData.visitDate}
                    onChange={(event) =>
                        setTimelineData({
                        ...timelineData,
                        visitDate: event.target.value,
                        })
                    }
                    />
                </label>

                <label>
                    Doctor Name
                    <input
                    type="text"
                    required
                    value={timelineData.doctorName}
                    onChange={(event) =>
                        setTimelineData({
                        ...timelineData,
                        doctorName: event.target.value,
                        })
                    }
                    placeholder="Doctor name"
                    />
                </label>

                <label>
                    Treatment Description
                    <textarea
                    required
                    value={timelineData.treatmentDescription}
                    onChange={(event) =>
                        setTimelineData({
                        ...timelineData,
                        treatmentDescription: event.target.value,
                        })
                    }
                    placeholder="Describe the treatment"
                    rows="3"
                    />
                </label>

                <label>
                    Clinical Notes
                    <textarea
                    value={timelineData.clinicalNotes}
                    onChange={(event) =>
                        setTimelineData({
                        ...timelineData,
                        clinicalNotes: event.target.value,
                        })
                    }
                    placeholder="Additional clinical notes"
                    rows="3"
                    />
                </label>

                <label>
                    Follow-up Date
                    <input
                    type="date"
                    value={timelineData.followUpDate}
                    onChange={(event) =>
                        setTimelineData({
                        ...timelineData,
                        followUpDate: event.target.value,
                        })
                    }
                    />
                </label>

                <label>
                    Treatment Status
                    <select
                    value={timelineData.status}
                    onChange={(event) =>
                        setTimelineData({
                        ...timelineData,
                        status: event.target.value,
                        })
                    }
                    >
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Follow-up Required</option>
                    </select>
                </label>
                </div>

                <button
                type="submit"
                className="patient-add-diagnosis-button"
                >
                Save Treatment
                </button>
            </form>
            )}
        </>
        )}

        {/* BILLING HISTORY FORM */}
        {activeTab === 'Billing History' && (
        <>
            {showBillingForm && (
            <form
                className="patient-diagnosis-form"
                onSubmit={handleBillingSubmit}
            >
                <h4>New Invoice</h4>

                <div className="patient-diagnosis-form-grid">
                <label>
                    Invoice Number
                    <input
                    type="text"
                    required
                    value={billingData.invoiceNumber}
                    onChange={(event) =>
                        setBillingData({
                        ...billingData,
                        invoiceNumber: event.target.value,
                        })
                    }
                    placeholder="e.g. INV-001"
                    />
                </label>

                <label>
                    Invoice Date
                    <input
                    type="date"
                    required
                    value={billingData.invoiceDate}
                    onChange={(event) =>
                        setBillingData({
                        ...billingData,
                        invoiceDate: event.target.value,
                        })
                    }
                    />
                </label>

                <label>
                    Total Amount (LKR)
                    <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={billingData.totalAmount}
                    onChange={(event) =>
                        setBillingData({
                        ...billingData,
                        totalAmount: event.target.value,
                        })
                    }
                    placeholder="Total amount"
                    />
                </label>

                <label>
                    Paid Amount (LKR)
                    <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={billingData.paidAmount}
                    onChange={(event) =>
                        setBillingData({
                        ...billingData,
                        paidAmount: event.target.value,
                        })
                    }
                    placeholder="Paid amount"
                    />
                </label>

                <label>
                    Payment Method
                    <select
                    value={billingData.paymentMethod}
                    onChange={(event) =>
                        setBillingData({
                        ...billingData,
                        paymentMethod: event.target.value,
                        })
                    }
                    >
                    <option>Cash</option>
                    <option>Card</option>
                    <option>Bank Transfer</option>
                    </select>
                </label>

                <label>
                    Description
                    <textarea
                    value={billingData.description}
                    onChange={(event) =>
                        setBillingData({
                        ...billingData,
                        description: event.target.value,
                        })
                    }
                    placeholder="Invoice description"
                    rows="3"
                    />
                </label>
                </div>

                <button
                type="submit"
                className="patient-add-diagnosis-button"
                >
                Save Invoice
                </button>
            </form>
            )}
        </>
        )}


        {/* DIAGNOSIS TAB */}
        {activeTab === 'Clinical Notes' && (
          <>
            {showDiagnosisForm && (
              <form
                className="patient-diagnosis-form"
                onSubmit={handleDiagnosisSubmit}
              >
                <h4>New Diagnosis Record</h4>

                <div className="patient-diagnosis-form-grid">
                  <label>
                    Diagnosis Name
                    <input
                      type="text"
                      required
                      value={formData.diagnosisName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          diagnosisName: event.target.value,
                        })
                      }
                      placeholder="Enter diagnosis"
                    />
                  </label>

                  <label>
                    Diagnosis Date
                    <input
                      type="date"
                      required
                      value={formData.diagnosisDate}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          diagnosisDate: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Doctor Name
                    <input
                      type="text"
                      required
                      value={formData.doctorName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          doctorName: event.target.value,
                        })
                      }
                      placeholder="Doctor name"
                    />
                  </label>

                  <label>
                    Symptoms
                    <textarea
                      required
                      value={formData.symptoms}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          symptoms: event.target.value,
                        })
                      }
                      placeholder="Describe patient symptoms"
                      rows="3"
                    />
                  </label>

                  <label>
                    Doctor's Notes
                    <textarea
                      value={formData.doctorNotes}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          doctorNotes: event.target.value,
                        })
                      }
                      placeholder="Enter clinical notes"
                      rows="3"
                    />
                  </label>

                  <label>
                    Medical History
                    <textarea
                      value={formData.medicalHistory}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          medicalHistory: event.target.value,
                        })
                      }
                      placeholder="Previous medical conditions"
                      rows="3"
                    />
                  </label>
                </div>

                <button type="submit" className="patient-add-diagnosis-button">
                  Save Diagnosis
                </button>
              </form>
            )}

            {diagnosisError && (
              <p role="alert" className="patient-diagnosis-error">
                {diagnosisError}
              </p>
            )}

            <div className="patient-diagnosis-list">
              {diagnosesLoading ? (
                <div className="patient-tab-empty">
                  Loading diagnosis records...
                </div>
              ) : patientDiagnoses.length === 0 ? (
                <div className="patient-tab-empty">
                  No diagnosis records available yet.
                </div>
              ) : (
                patientDiagnoses.map((diagnosis) => (
                  <article className="patient-diagnosis-card" key={diagnosis.id}>
                    <div className="patient-diagnosis-card-header">
                      <div>
                        <h4>{diagnosis.diagnosisName}</h4>
                        <span>{diagnosis.diagnosisDate}</span>
                      </div>

                      <button
                        type="button"
                        className="patient-delete-diagnosis-button"
                        onClick={() => handleDeleteDiagnosis(diagnosis.id)}
                      >
                        Delete
                      </button>
                    </div>

                    <p><strong>Doctor:</strong> {diagnosis.doctorName}</p>
                    <p><strong>Symptoms:</strong> {diagnosis.symptoms}</p>

                    {diagnosis.doctorNotes && (
                      <p><strong>Doctor's Notes:</strong> {diagnosis.doctorNotes}</p>
                    )}

                    {diagnosis.medicalHistory && (
                      <p><strong>Medical History:</strong> {diagnosis.medicalHistory}</p>
                    )}
                  </article>
                ))
              )}
            </div>
          </>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === 'Prescriptions' && (
          <>
            {showPrescriptionForm && (
              <form
                className="patient-diagnosis-form"
                onSubmit={handlePrescriptionSubmit}
              >
                <h4>New Prescription</h4>

                <div className="patient-diagnosis-form-grid">
                  <label>
                    Medicine Name
                    <input
                      type="text"
                      required
                      value={prescriptionData.medicineName}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          medicineName: event.target.value,
                        })
                      }
                      placeholder="Medicine name"
                    />
                  </label>

                  <label>
                    Dosage
                    <input
                      type="text"
                      required
                      value={prescriptionData.dosage}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          dosage: event.target.value,
                        })
                      }
                      placeholder="e.g. 500 mg"
                    />
                  </label>

                  <label>
                    Frequency
                    <input
                      type="text"
                      required
                      value={prescriptionData.frequency}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          frequency: event.target.value,
                        })
                      }
                      placeholder="e.g. As prescribed"
                    />
                  </label>

                  <label>
                    Duration
                    <input
                      type="text"
                      required
                      value={prescriptionData.duration}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          duration: event.target.value,
                        })
                      }
                      placeholder="e.g. 5 days"
                    />
                  </label>

                  <label>
                    Prescribing Doctor
                    <input
                      type="text"
                      required
                      value={prescriptionData.doctorName}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          doctorName: event.target.value,
                        })
                      }
                      placeholder="Doctor name"
                    />
                  </label>

                  <label>
                    Prescription Date
                    <input
                      type="date"
                      required
                      value={prescriptionData.prescriptionDate}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          prescriptionDate: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Instructions
                    <textarea
                      required
                      value={prescriptionData.instructions}
                      onChange={(event) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          instructions: event.target.value,
                        })
                      }
                      placeholder="Enter doctor's instructions"
                      rows="3"
                    />
                  </label>
                </div>

                <button type="submit" className="patient-add-diagnosis-button">
                  Save Prescription
                </button>
              </form>
            )}

            <div className="patient-diagnosis-list">
              {patientPrescriptions.length === 0 ? (
                <div className="patient-tab-empty">
                  No prescription records available yet.
                </div>
              ) : (
                patientPrescriptions.map((prescription) => (
                  <article className="patient-diagnosis-card" key={prescription.id}>
                    <div className="patient-diagnosis-card-header">
                      <div>
                        <h4>{prescription.medicineName}</h4>
                        <span>{prescription.prescriptionDate}</span>
                      </div>

                      <button
                        type="button"
                        className="patient-delete-diagnosis-button"
                        onClick={() => handleDeletePrescription(prescription.id)}
                      >
                        Delete
                      </button>
                    </div>

                    <p><strong>Dosage:</strong> {prescription.dosage}</p>
                    <p><strong>Frequency:</strong> {prescription.frequency}</p>
                    <p><strong>Duration:</strong> {prescription.duration}</p>
                    <p><strong>Doctor:</strong> {prescription.doctorName}</p>
                    <p><strong>Instructions:</strong> {prescription.instructions}</p>
                  </article>
                ))
              )}
            </div>
          </>
        )}

        {/* LAB & RADIOLOGY TAB */}
        {activeTab === 'Lab & Radiology' && (
          <>
            {showLabForm && (
              <form
                className="patient-diagnosis-form"
                onSubmit={handleLabSubmit}
              >
                <h4>New Laboratory / Radiology Request</h4>

                <div className="patient-diagnosis-form-grid">
                  <label>
                    Test Name
                    <input
                      type="text"
                      required
                      value={labData.testName}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          testName: event.target.value,
                        })
                      }
                      placeholder="Enter test name"
                    />
                  </label>

                  <label>
                    Test Category
                    <select
                      value={labData.testCategory}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          testCategory: event.target.value,
                        })
                      }
                    >
                      <option>Blood Test</option>
                      <option>Urine Test</option>
                      <option>Stool Test</option>
                      <option>X-Ray</option>
                      <option>Ultrasound</option>
                      <option>CT Scan</option>
                      <option>MRI Scan</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label>
                    Requesting Doctor
                    <input
                      type="text"
                      required
                      value={labData.doctorName}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          doctorName: event.target.value,
                        })
                      }
                      placeholder="Doctor name"
                    />
                  </label>

                  <label>
                    Request Date
                    <input
                      type="date"
                      required
                      value={labData.requestDate}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          requestDate: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Priority
                    <select
                      value={labData.priority}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          priority: event.target.value,
                        })
                      }
                    >
                      <option>Normal</option>
                      <option>Urgent</option>
                    </select>
                  </label>

                  <label>
                    Test Status
                    <select
                      value={labData.status}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          status: event.target.value,
                        })
                      }
                    >
                      <option>Requested</option>
                      <option>Sample Collected</option>
                      <option>Processing</option>
                      <option>Completed</option>
                    </select>
                  </label>

                  <label>
                    Test Results
                    <textarea
                      value={labData.results}
                      onChange={(event) =>
                        setLabData({
                          ...labData,
                          results: event.target.value,
                        })
                      }
                      placeholder="Enter results when available"
                      rows="3"
                    />
                  </label>
                </div>

                <button type="submit" className="patient-add-diagnosis-button">
                  Save Lab Request
                </button>
              </form>
            )}

            <div className="patient-diagnosis-list">
              {patientLabRecords.length === 0 ? (
                <div className="patient-tab-empty">
                  No laboratory or radiology records available yet.
                </div>
              ) : (
                patientLabRecords.map((record) => (
                  <article className="patient-diagnosis-card" key={record.id}>
                    <div className="patient-diagnosis-card-header">
                      <div>
                        <h4>{record.testName}</h4>
                        <span>{record.requestDate}</span>
                      </div>

                      <button
                        type="button"
                        className="patient-delete-diagnosis-button"
                        onClick={() => handleDeleteLab(record.id)}
                      >
                        Delete
                      </button>
                    </div>

                    <p><strong>Category:</strong> {record.testCategory}</p>
                    <p><strong>Doctor:</strong> {record.doctorName}</p>
                    <p><strong>Priority:</strong> {record.priority}</p>
                    <p><strong>Status:</strong> {record.status}</p>

                    {record.results && (
                      <p><strong>Results:</strong> {record.results}</p>
                    )}
                  </article>
                ))
              )}
            </div>
          </>
        )}



        {/* TREATMENT TIMELINE RECORDS */}
        {activeTab === 'Treatment Timeline' && (
        <div className="patient-diagnosis-list">
            {patientTimelineRecords.length === 0 ? (
            <div className="patient-tab-empty">
                No treatment records available yet.
            </div>
            ) : (
            patientTimelineRecords.map((record) => (
                <article className="patient-diagnosis-card" key={record.id}>
                <div className="patient-diagnosis-card-header">
                    <div>
                    <h4>{record.treatmentDescription}</h4>
                    <span>{record.visitDate}</span>
                    </div>

                    <button
                    type="button"
                    className="patient-delete-diagnosis-button"
                    onClick={() => handleDeleteTimeline(record.id)}
                    >
                    Delete
                    </button>
                </div>

                <p><strong>Doctor:</strong> {record.doctorName}</p>
                <p><strong>Status:</strong> {record.status}</p>

                {record.clinicalNotes && (
                    <p><strong>Clinical Notes:</strong> {record.clinicalNotes}</p>
                )}

                {record.followUpDate && (
                    <p><strong>Follow-up Date:</strong> {record.followUpDate}</p>
                )}
                </article>
            ))
            )}
        </div>
        )}


        {/* BILLING HISTORY RECORDS */}
        {activeTab === 'Billing History' && (
        <div className="patient-diagnosis-list">
            {patientBillingRecords.length === 0 ? (
            <div className="patient-tab-empty">
                No billing records available yet.
            </div>
            ) : (
            patientBillingRecords.map((record) => (
                <article className="patient-diagnosis-card" key={record.id}>
                <div className="patient-diagnosis-card-header">
                    <div>
                    <h4>Invoice: {record.invoiceNumber}</h4>
                    <span>{record.invoiceDate}</span>
                    </div>

                    <button
                    type="button"
                    className="patient-delete-diagnosis-button"
                    onClick={() => handleDeleteBilling(record.id)}
                    >
                    Delete
                    </button>
                </div>

                <p>
                    <strong>Total Amount:</strong> LKR {record.totalAmount.toFixed(2)}
                </p>
                <p>
                    <strong>Paid Amount:</strong> LKR {record.paidAmount.toFixed(2)}
                </p>
                <p>
                    <strong>Balance:</strong> LKR {record.balance.toFixed(2)}
                </p>
                <p>
                    <strong>Payment Status:</strong> {record.paymentStatus}
                </p>
                <p>
                    <strong>Payment Method:</strong> {record.paymentMethod}
                </p>

                {record.description && (
                    <p><strong>Description:</strong> {record.description}</p>
                )}
                </article>
            ))
            )}
        </div>
        )}



        {/* OTHER TABS */}
        {![
          'Clinical Notes',
          'Prescriptions',
          'Lab & Radiology',
          'Treatment Timeline',
          'Billing History',
        ].includes(activeTab) && (
          <div className="patient-tab-empty">
            No records available yet.
          </div>
        )}

      </div>
    </section>
  )
}

export default PatientClinicalTabs

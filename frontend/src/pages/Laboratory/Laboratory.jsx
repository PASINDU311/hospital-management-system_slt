import { useState } from 'react'
import './Laboratory.css'

function Laboratory() {
        const [searchTerm, setSearchTerm] = useState('')
        const [selectedDivision, setSelectedDivision] = useState('All Divisions')
        const [selectedPriority, setSelectedPriority] = useState('All Tiers')
        const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
        const [newOrder, setNewOrder] = useState({
            patient: '',
            mrn: '',
            specimen: '',
            test: '',
            division: '',
            priority: 'Routine',
            doctor: ''
        })

        const [labOrders, setLabOrders] = useState([
            {
            id: 1,
            priority: 'STAT / Critical',
            division: 'Biochemistry',
            specimen: '#SPEC-99412',
            patient: 'Robert Langdon',
            mrn: 'MRN-6520',
            test: 'hs-cTnI (Troponin I)',
            doctor: 'Dr. S. Jenkins',
            status: 'Panic Value Review',
            action: 'Verify',
            },
            {
            id: 2,
            priority: 'STAT',
            division: 'Hematology',
            specimen: '#SPEC-99411',
            patient: 'Elena Vance',
            mrn: 'MRN-7814',
            test: 'Arterial Blood Gas',
            doctor: 'Dr. A. Mercer',
            status: 'Running on Cobas b 221',
            action: 'Details',
            },
            {
            id: 3,
            priority: 'Routine',
            division: 'Hematology',
            specimen: '#SPEC-99408',
            patient: 'Arthur Pendelton',
            mrn: 'MRN-2219',
            test: 'CBC w/ 5-Part Differential',
            doctor: 'Dr. H. Chen',
            status: 'Sysmex Analyzed',
            action: 'Sign-off',
            },
            {
            id: 4,
            division: 'Biochemistry',
            priority: 'Routine',
            specimen: '#SPEC-99405',
            patient: 'Maria Santos',
            mrn: 'MRN-9041',
            test: 'Comprehensive Metabolic Panel',
            doctor: 'Dr. R. Vance',
            status: 'EMR Validated',
            action: 'Archive',
            },
            {
            id: 5,
            priority: 'STAT',
            division: 'Microbiology',
            specimen: '#SPEC-99399',
            patient: 'David Kowalski',
            mrn: 'MRN-3312',
            test: 'Blood Culture x2 Sets',
            doctor: 'Dr. J. Rodriguez',
            status: 'Continuous Incubation',
            action: 'Log',
            },
        ])

        const handleCreateLabOrder = (event) => {
            event.preventDefault()

            const newLabOrder = {
                id: Date.now(),
                patient: newOrder.patient,
                mrn: newOrder.mrn,
                specimen: newOrder.specimen,
                test: newOrder.test,
                division: newOrder.division,
                priority: newOrder.priority,
                doctor: newOrder.doctor,
                status: 'Pending Collection',
                action: 'Collect'
            }

            setLabOrders((previousOrders) => [
                newLabOrder,
                ...previousOrders
            ])

            setNewOrder({
                patient: '',
                mrn: '',
                specimen: '',
                test: '',
                division: '',
                priority: 'Routine',
                doctor: ''
            })

            setIsOrderModalOpen(false)
        }

        const filteredLabOrders = labOrders.filter((order) => {
            const searchValue = searchTerm.toLowerCase().trim()

            const matchesSearch =
                order.patient.toLowerCase().includes(searchValue) ||
                order.mrn.toLowerCase().includes(searchValue) ||
                order.specimen.toLowerCase().includes(searchValue) ||
                order.test.toLowerCase().includes(searchValue)

            const matchesDivision =
                selectedDivision === 'All Divisions' ||
                order.division === selectedDivision

            const matchesPriority =
                selectedPriority === 'All Tiers' ||
                (selectedPriority === 'Critical'
                    ? order.priority === 'STAT / Critical'
                    : order.priority === selectedPriority)

            return matchesSearch && matchesDivision && matchesPriority
        })

  return (
    <main className="laboratory-page">
      <div className="laboratory-header">
        <div className="laboratory-heading">
          <div className="laboratory-breadcrumb">
            <span>Hospital Operations</span>
            <span>›</span>
            <span>Diagnostic Informatics</span>
            <span>›</span>
            <strong>Clinical Laboratory</strong>
          </div>

          <h1>Clinical Laboratory & Specimen Diagnostics</h1>

          <p>
            Specimen accessioning, automated hematology,
            biochemistry and pathology operations.
          </p>
        </div>

        <div className="laboratory-header-actions">
          <div className="lis-status">
            <span className="status-dot"></span>
            LIS Realtime Bridge: Active
          </div>

          <button type="button" className="lab-secondary-button">
            Export QC Log
          </button>

          <button type="button" className="lab-secondary-button">
            Batch Scan Samples
          </button>

          <button
                type="button"
                className="lab-primary-button"
                onClick={() => setIsOrderModalOpen(true)}
                >
                + New Lab Test Order
            </button>
        </div>
      </div>

            <section className="lab-summary-grid">
                <div className="lab-summary-card">
                <span>Total Tests Processed</span>
                <h2>384</h2>
                <small>↑ 12% vs avg</small>
                </div>

                <div className="lab-summary-card">
                <span>Pending Collection</span>
                <h2>28</h2>
                <small>Draw requests</small>
                </div>

                <div className="lab-summary-card">
                <span>In-Analysis Assays</span>
                <h2>46</h2>
                <small>Across 6 Analyzers</small>
                </div>

                <div className="lab-summary-card">
                <span>Median STAT TAT</span>
                <h2>24 <small>min</small></h2>
                <small>Target: under 30 min</small>
                </div>
            </section>

            <section className="lab-orders-section">
                <div className="lab-orders-tabs">
                <button type="button" className="lab-tab active">
                    All Lab Orders <span>384</span>
                </button>

                <button type="button" className="lab-tab critical">
                    ✳ STAT / Critical Queue <span>14</span>
                </button>

                <button type="button" className="lab-tab">
                    Sample Collection <span>28</span>
                </button>

                <button type="button" className="lab-tab">
                    Awaiting Sign-off <span>19</span>
                </button>

                <button type="button" className="lab-tab">
                    Synced to EMR <span>323</span>
                </button>
                </div>

                <div className="lab-filters">
                    <div className="lab-search-box">
                        <span>⌕</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search test name, Specimen ID (#SPEC-), MRN, or Patient name..."
                        />
                    </div>

                    <select
                        aria-label="Filter by division"
                        value={selectedDivision}
                        onChange={(event) => setSelectedDivision(event.target.value)}
                    >
                        <option>All Divisions</option>
                        <option>Biochemistry</option>
                        <option>Hematology</option>
                        <option>Microbiology</option>
                        <option>Pathology</option>
                    </select>

                    <select
                        aria-label="Filter by priority"
                        value={selectedPriority}
                        onChange={(event) => setSelectedPriority(event.target.value)}
                    >
                        <option>All Tiers</option>
                        <option>Routine</option>
                        <option>STAT</option>
                        <option>Urgent</option>
                        <option>Critical</option>
                    </select>
                </div>

                <div className="lab-table-wrapper">
                    <table className="lab-orders-table">
                        <thead>
                            <tr>
                                <th>Priority</th>
                                <th>Specimen ID / Tube</th>
                                <th>Patient & MRN</th>
                                <th>Ordered Assay / Results</th>
                                <th>Physician & Location</th>
                                <th>Diagnostic Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLabOrders.length > 0 ? (
                                filteredLabOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.priority}</td>
                                    <td>{order.specimen}</td>
                                    <td>
                                    <strong>{order.patient}</strong>
                                    <br />
                                    <small>{order.mrn}</small>
                                    </td>
                                    <td>{order.test}</td>
                                    <td>{order.doctor}</td>
                                    <td>{order.status}</td>
                                    <td>
                                    <button type="button">{order.action}</button>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '25px' }}>
                                    No matching laboratory orders found.
                                </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="lab-pagination">
                    <span>Showing 1 - 6 of 384 active clinical specimens</span>

                    <div className="lab-pagination-controls">
                        <button type="button" disabled>‹</button>
                        <button type="button" className="active">1</button>
                        <button type="button">2</button>
                        <button type="button">3</button>
                        <span>...</span>
                        <button type="button">64</button>
                        <button type="button">›</button>
                    </div>
                </div>
            </section>

            <section className="lab-analyzers-section">
                <div className="lab-analyzers-heading">
                <h3>⚙ Connected Automated Analyzers & Calibrations</h3>
                <span>Levey-Jennings QC Pass Rate: 99.4%</span>
                </div>

                <div className="lab-analyzers-grid">
                <div className="lab-analyzer-card">
                    <strong>Sysmex XN-1000</strong>
                    <span>Hematology Track A • Cell Counter</span>
                    <b className="analyzer-ready">READY</b>
                </div>

                <div className="lab-analyzer-card">
                    <strong>Roche Cobas 8000</strong>
                    <span>ISE & Clinical Chemistry</span>
                    <b className="analyzer-calibrating">CALIBRATING</b>
                </div>

                <div className="lab-analyzer-card">
                    <strong>Bio-Rad D-100</strong>
                    <span>HbA1c Hemoglobin Testing</span>
                    <b className="analyzer-ready">READY</b>
                </div>

                <div className="lab-analyzer-card">
                    <strong>Abbott Architect</strong>
                    <span>Chemiluminescent Immunoassay</span>
                    <b className="analyzer-active">ACTIVE</b>
                </div>
                </div>
            </section>

            <section className="lab-critical-panel">
                <div className="lab-critical-header">
                <strong>⚠ CRITICAL PANIC VALUE REQUIRING IMMEDIATE ESCALATION</strong>
                <span>STAT</span>
                </div>

                <div className="lab-critical-content">
                <div className="lab-patient-info">
                    <div>
                    <h3>Robert Langdon</h3>
                    <p>MRN-6520 • ICU Bed 04 • 61y Male</p>
                    <small>Attending: Dr. Sarah Jenkins (Cardiology)</small>
                    </div>

                    <strong>#SPEC-99412</strong>
                </div>

                <div className="lab-barcode-section">
                    <div>
                    <span>Specimen Accession Barcode:</span>
                    <small>Collection: 10:14 AM • Phleb: Nurse M. Gable</small>
                    </div>

                    <div className="lab-barcode">
                    || ||| || |||| ||| || || ||| ||||
                    </div>

                    <small>BARCODE: #99412-TROPONIN-STAT</small>
                </div>

                <div className="lab-analyte-heading">
                    <strong>Analyte Measurement</strong>
                    <span>⊕ +1,800% Sudden Spike</span>
                </div>

                <div className="lab-analyte-result">
                    <div>
                    <strong>Cardiac Troponin I (hs-cTnI)</strong>
                    <span>ALERT HIGH</span>
                    </div>

                    <div className="lab-result-value">
                    <strong>3.42</strong>
                    <span>ng/mL</span>

                    <div>
                        <small>REF. NORMAL RANGE</small>
                        <strong>Under 0.04 ng/mL</strong>
                    </div>
                    </div>

                    <small>Prior Value (07:15 AM): 0.18 ng/mL</small>
                </div>

                <div className="lab-delta-alert">
                    <strong>⚠ Delta-Check Trigger: Acute Myocardial Infarction Marker</strong>
                    <p>
                    Troponin surge exceeded clinical rule-out threshold of 0.05 ng/mL.
                    Protocol requires immediate verbal read-back to ICU team.
                    </p>
                </div>

                <div className="lab-clinical-notes">
                    <label htmlFor="lab-signoff-notes">
                    Pathology / Clinical Sign-off Remarks
                    </label>

                    <textarea
                    id="lab-signoff-notes"
                    rows="3"
                    placeholder="Enter clinical sign-off remarks..."
                    />
                </div>

                <button type="button" className="lab-authorize-button">
                    🛡 Authorize & Push Result to EMR
                </button>

                <div className="lab-critical-actions">
                    <button type="button">↻ Reflex / Repeat</button>
                    <button type="button">▤ Re-print Label</button>
                </div>
                </div>
            </section>

            <section className="lab-cold-chain-section">
                <div className="lab-cold-chain-heading">
                <h3>❄ Cold-Chain Sample Archive</h3>
                <strong>Temp: 3.8°C (Optimal)</strong>
                </div>

                <div className="lab-cold-chain-details">
                <strong>Assigned Rack: Refrigerated B • Shelf 2 • Tray 09</strong>
                <span>Holds 72 hrs post-test</span>
                </div>
            
            </section>

            {isOrderModalOpen && (
                <div className="lab-modal-overlay">
                    <div className="lab-order-modal">
                    <h2>New Lab Test Order</h2>
                    <p>Enter the details to create a new laboratory order.</p>

                    <form
                        className="lab-order-form"
                        onSubmit={handleCreateLabOrder}
                    >
                        <label>
                        Patient Name
                        <input
                            type="text"
                            placeholder="Enter patient name"
                            value={newOrder.patient}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, patient: event.target.value })
                            }
                            required
                        />
                        </label>

                        <label>
                        Patient MRN
                        <input
                            type="text"
                            placeholder="Enter patient MRN"
                            value={newOrder.mrn}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, mrn: event.target.value })
                            }
                            required
                        />
                        </label>

                        <label>
                        Specimen ID
                        <input
                            type="text"
                            placeholder="Enter specimen ID"
                            value={newOrder.specimen}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, specimen: event.target.value })
                            }
                            required
                        />
                        </label>

                        <label>
                        Test Name
                        <input
                            type="text"
                            placeholder="Enter laboratory test name"
                            value={newOrder.test}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, test: event.target.value })
                            }
                            required
                        />
                        </label>

                        <label>
                        Laboratory Division
                        <select
                            value={newOrder.division}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, division: event.target.value })
                            }
                            required
                        >
                            <option value="">Select division</option>
                            <option>Biochemistry</option>
                            <option>Hematology</option>
                            <option>Microbiology</option>
                            <option>Pathology</option>
                        </select>
                        </label>

                        <label>
                        Priority
                        <select
                            value={newOrder.priority}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, priority: event.target.value })
                            }
                            required
                        >
                            <option>Routine</option>
                            <option>STAT</option>
                            <option>Urgent</option>
                            <option>Critical</option>
                        </select>
                        </label>

                        <label>
                        Requesting Doctor
                        <input
                            type="text"
                            placeholder="Enter doctor's name"
                            value={newOrder.doctor}
                            onChange={(event) =>
                                setNewOrder({ ...newOrder, doctor: event.target.value })
                            }
                            required
                        />
                        </label>

                        <div className="lab-modal-actions">
                        <button
                            type="button"
                            onClick={() => setIsOrderModalOpen(false)}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            Create Lab Order
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            )}

    </main>
  )
}

export default Laboratory
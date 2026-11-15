import { useState } from 'react'
import './Pharmacy.css'

function Pharmacy() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All Categories')
    const [selectedStockLevel, setSelectedStockLevel] = useState('All Stock Levels')
    const [activeTab, setActiveTab] = useState('dispensing')
    const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false)
    const [isStockModalOpen, setIsStockModalOpen] = useState(false)
    const [stockForm, setStockForm] = useState({
        supplierName: '',
        medicine: '',
        batchNumber: '',
        quantity: '',
        unitCost: '',
        expiryDate: '',
    })
    const [dispensedPrescriptions, setDispensedPrescriptions] = useState([])

    const [dispenseForm, setDispenseForm] = useState({
        patientName: '',
        prescriptionId: '',
        medicine: '',
        dosage: '',
        quantity: '',
        instructions: '',
    })

    const [medicines, setMedicines] = useState([
        {
            id: 1,
            name: 'Ceftriaxone 1g IV Vial',
            brand: 'Rocephin · Powder for Solution',
            category: 'Anti-infective',
            stock: '12 Vials',
            unitCost: 'Rs. 14.80',
            lot: 'B-99214A',
            expiry: 'Nov 2025',
            status: 'Critical Low',
            stockLevel: 'Critical Stock',
            stockClass: 'stock-critical',
            badgeClass: 'critical',
        },
        {
            id: 2,
            name: 'Metformin HCl 500mg',
            brand: 'Glucophage · Oral Tablet',
            category: 'Endocrine',
            stock: '1,420 Tabs',
            unitCost: 'Rs. 0.18',
            lot: 'LOT-48821',
            expiry: 'Jun 2026',
            status: 'Healthy Stock',
            stockLevel: 'Healthy Stock',
            stockClass: 'stock-healthy',
            badgeClass: 'healthy',
        },
        {
            id: 3,
            name: 'Fentanyl Citrate 50mcg/mL',
            brand: 'Sublimaze · 2ml Ampoule',
            category: 'Schedule II Narcotic',
            stock: '45 Amps',
            unitCost: 'Rs. 4.25',
            lot: 'SCH2-7819',
            expiry: 'Dec 2025',
            status: 'Secured Normal',
            stockLevel: 'Healthy Stock',
            stockClass: '',
            badgeClass: 'secured',
        },
        {
            id: 4,
            name: 'Atorvastatin Calcium 20mg',
            brand: 'Lipitor · Film-coated Tablet',
            category: 'Cardiovascular',
            stock: '820 Tabs',
            unitCost: 'Rs. 0.42',
            lot: 'B-10382',
            expiry: 'Aug 2026',
            status: 'Healthy Stock',
            stockLevel: 'Healthy Stock',
            stockClass: 'stock-healthy',
            badgeClass: 'healthy',
        },
        {
            id: 5,
            name: 'Norepinephrine 4mg/4mL',
            brand: 'Levophed · Emergency Vasopressor',
            category: 'Emergency / ICU',
            stock: '2 Amps',
            unitCost: 'Rs. 32.50',
            lot: 'NE-8902',
            expiry: 'Expires in 18d',
            status: 'Critical Shortage',
            stockLevel: 'Critical Stock',
            stockClass: 'stock-critical',
            badgeClass: 'critical',
        },
        {
            id: 6,
            name: 'Amox/Clav 875/125mg',
            brand: 'Augmentin · Oral Tablet',
            category: 'Antibacterial',
            stock: '35 Bottles',
            unitCost: 'Rs. 18.90',
            lot: 'LOT-77319',
            expiry: 'Feb 2026',
            status: 'Low Stock',
            stockLevel: 'Low Stock',
            stockClass: 'stock-low',
            badgeClass: 'low',
        },
    ])

    const filteredMedicines = medicines.filter((medicine) => {
        const matchesSearch =
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.brand.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
            selectedCategory === 'All Categories' ||
            medicine.category === selectedCategory

        const matchesStockLevel =
            selectedStockLevel === 'All Stock Levels' ||
            medicine.stockLevel === selectedStockLevel

        return matchesSearch && matchesCategory && matchesStockLevel
    })

    const handleDispensePrescription = (event) => {
        event.preventDefault()

        const { patientName, prescriptionId, medicine, dosage, quantity, instructions } = dispenseForm

        if (!patientName || !prescriptionId || !medicine || !dosage || !quantity) {
            alert('Please complete all required fields.')
            return
        }

        const selectedMedicine = medicines.find(
            (item) => item.name === medicine
        )

        if (!selectedMedicine) {
            alert('Medicine not found.')
            return
        }

        const stockMatch = selectedMedicine.stock.match(/[\d,]+/)
        const availableStock = Number(stockMatch[0].replace(/,/g, ''))
        const requestedQuantity = Number(quantity)

        if (requestedQuantity <= 0 || !Number.isInteger(requestedQuantity)) {
            alert('Please enter a valid quantity.')
            return
        }

        if (requestedQuantity > availableStock) {
            alert(`Only ${availableStock} units are available.`)
            return
        }

        const remainingStock = availableStock - requestedQuantity
        const stockUnit = selectedMedicine.stock.replace(stockMatch[0], '').trim()

        setMedicines((previousMedicines) =>
            previousMedicines.map((item) =>
            item.id === selectedMedicine.id
                ? {
                    ...item,
                    stock: `${remainingStock.toLocaleString()} ${stockUnit}`,
                }
                : item
            )
        )

        setDispensedPrescriptions((previous) => [
            ...previous,
            {
            id: Date.now(),
            patientName,
            prescriptionId,
            medicine,
            dosage,
            quantity: requestedQuantity,
            instructions,
            date: new Date().toLocaleDateString(),
            },
        ])

        setDispenseForm({
            patientName: '',
            prescriptionId: '',
            medicine: '',
            dosage: '',
            quantity: '',
            instructions: '',
        })

        setIsDispenseModalOpen(false)

        alert('Prescription dispensed successfully!')
    }

    const handleReceiveStock = (event) => {
        event.preventDefault()

        const {
            supplierName,
            medicine,
            batchNumber,
            quantity,
            unitCost,
            expiryDate,
        } = stockForm

        if (
            !supplierName.trim() ||
            !medicine ||
            !batchNumber.trim() ||
            !quantity ||
            !unitCost ||
            !expiryDate
        ) {
            alert('Please complete all required fields.')
            return
        }

        const selectedMedicine = medicines.find(
            (item) => item.name === medicine
        )

        if (!selectedMedicine) {
            alert('Medicine not found.')
            return
        }

        const receivedQuantity = Number(quantity)
        const receivedCost = Number(unitCost)

        if (
            !Number.isInteger(receivedQuantity) ||
            receivedQuantity <= 0 ||
            !Number.isFinite(receivedCost) ||
            receivedCost < 0
        ) {
            alert('Please enter valid quantity and unit cost.')
            return
        }

        const stockMatch = selectedMedicine.stock.match(/[\d,]+/)
        const availableStock = Number(stockMatch[0].replace(/,/g, ''))
        const stockUnit = selectedMedicine.stock
            .replace(stockMatch[0], '')
            .trim()

        setMedicines((previousMedicines) =>
            previousMedicines.map((item) =>
            item.id === selectedMedicine.id
                ? {
                    ...item,
                    stock: `${(availableStock + receivedQuantity).toLocaleString()} ${stockUnit}`,
                    lot: batchNumber,
                    expiry: new Date(`${expiryDate}T00:00:00`).toLocaleDateString(),
                    unitCost: `Rs. ${receivedCost.toFixed(2)}`,
                }
                : item
            )
        )

        setStockForm({
            supplierName: '',
            medicine: '',
            batchNumber: '',
            quantity: '',
            unitCost: '',
            expiryDate: '',
        })

        setIsStockModalOpen(false)

        alert('Stock shipment received successfully!')
    }

  return (
    <main className="pharmacy-page">

        {isStockModalOpen && (
            <div className="pharmacy-modal-overlay">
                <div className="pharmacy-modal">
                <div className="pharmacy-modal-header">
                    <div>
                    <h2>Receive Stock Shipment</h2>
                    <p>Enter incoming medicine stock details</p>
                    </div>

                    <button
                    type="button"
                    onClick={() => setIsStockModalOpen(false)}
                    >
                    ✕
                    </button>
                </div>

                <form
                    className="pharmacy-modal-form"
                    onSubmit={handleReceiveStock}
                >
                    <label>
                    Supplier Name
                    <input
                        type="text"
                        placeholder="Enter supplier name"
                        value={stockForm.supplierName}
                        onChange={(event) =>
                            setStockForm({
                            ...stockForm,
                            supplierName: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Medicine
                    <select
                        value={stockForm.medicine}
                        onChange={(event) =>
                            setStockForm({
                            ...stockForm,
                            medicine: event.target.value,
                            })
                        }
                    >
                        <option value="" disabled>Select medicine</option>

                        {medicines.map((medicine) => (
                            <option key={medicine.id} value={medicine.name}>
                            {medicine.name}
                            </option>
                        ))}
                    </select>
                    </label>

                    <label>
                    Batch Number
                    <input
                        type="text"
                        placeholder="Enter batch number"
                        value={stockForm.batchNumber}
                        onChange={(event) =>
                            setStockForm({
                            ...stockForm,
                            batchNumber: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Received Quantity
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter quantity"
                        value={stockForm.quantity}
                        onChange={(event) =>
                            setStockForm({
                            ...stockForm,
                            quantity: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Unit Cost (LKR)
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter unit cost"
                        value={stockForm.unitCost}
                        onChange={(event) =>
                            setStockForm({
                            ...stockForm,
                            unitCost: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Expiry Date
                    <input
                        type="date"
                        value={stockForm.expiryDate}
                        onChange={(event) =>
                            setStockForm({
                            ...stockForm,
                            expiryDate: event.target.value,
                            })
                        }
                    />
                    </label>

                    <div className="pharmacy-modal-actions">
                    <button
                        type="button"
                        onClick={() => setIsStockModalOpen(false)}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="primary">
                        Confirm Stock Receipt
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )}

        {isDispenseModalOpen && (
            <div className="pharmacy-modal-overlay">
                <div className="pharmacy-modal">
                <div className="pharmacy-modal-header">
                    <div>
                    <h2>Dispense Prescription</h2>
                    <p>Enter prescription and medicine details</p>
                    </div>

                    <button
                    type="button"
                    onClick={() => setIsDispenseModalOpen(false)}
                    >
                    ✕
                    </button>
                </div>

                <form
                    className="pharmacy-modal-form"
                    onSubmit={handleDispensePrescription}
                >
                    <label>
                    Patient Name
                    <input
                        type="text"
                        placeholder="Enter patient name"
                        value={dispenseForm.patientName}
                        onChange={(event) =>
                            setDispenseForm({
                            ...dispenseForm,
                            patientName: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Prescription ID
                    <input
                        type="text"
                        placeholder="Enter prescription ID"
                        value={dispenseForm.prescriptionId}
                        onChange={(event) =>
                            setDispenseForm({
                            ...dispenseForm,
                            prescriptionId: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Medicine
                    <select
                        value={dispenseForm.medicine}
                        onChange={(event) =>
                            setDispenseForm({
                            ...dispenseForm,
                            medicine: event.target.value,
                            })
                        }
                    >
                        <option value="" disabled>Select medicine</option>

                        {medicines.map((medicine) => (
                            <option key={medicine.id} value={medicine.name}>
                            {medicine.name}
                            </option>
                        ))}
                    </select>
                    </label>

                    <label>
                    Dosage
                    <input
                        type="text"
                        placeholder="e.g. 500mg"
                        value={dispenseForm.dosage}
                        onChange={(event) =>
                            setDispenseForm({
                            ...dispenseForm,
                            dosage: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Quantity
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter quantity"
                        value={dispenseForm.quantity}
                        onChange={(event) =>
                            setDispenseForm({
                            ...dispenseForm,
                            quantity: event.target.value,
                            })
                        }
                    />
                    </label>

                    <label>
                    Instructions
                    <textarea
                        placeholder="Enter dispensing instructions"
                        value={dispenseForm.instructions}
                        onChange={(event) =>
                            setDispenseForm({
                            ...dispenseForm,
                            instructions: event.target.value,
                            })
                        }
                    />
                    </label>

                    <div className="pharmacy-modal-actions">
                    <button
                        type="button"
                        onClick={() => setIsDispenseModalOpen(false)}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="primary">
                        Confirm Dispensing
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )}


        <div className="pharmacy-header">
            <div>
                <p className="pharmacy-breadcrumb">
                    Hospital Operations &gt; Pharmacy Inventory
                </p>

                <h1>Pharmacy Formulary & Prescription Dispensing</h1>

                <p>
                    Unit-dose automation, prescription management and stock control.
                </p>
            </div>

            <div className="pharmacy-header-actions">
                <button type="button">Controlled Substance Audit</button>
                <button
                    type="button"
                    onClick={() => setIsStockModalOpen(true)}
                    >
                    Receive Stock Shipment
                </button>
                <button
                    type="button"
                    className="primary"
                    onClick={() => setIsDispenseModalOpen(true)}
                >
                    Dispense Prescription
                </button>
            </div>
        </div>

        <div className="pharmacy-summary-grid">

            <div className="pharmacy-summary-card">
                <span>Prescription Queue</span>
                <h2>84 <small>Orders Pending</small></h2>
                <p>42 STAT · 32 Outpatient · 10 Discharge</p>
            </div>

            <div className="pharmacy-summary-card">
                <span>Formulary Valuation</span>
                <h2>Rs. 482,900</h2>
                <p>3,420 Active NDC SKUs</p>
            </div>

            <div className="pharmacy-summary-card alert-card">
                <span>Stock Alert Triggers</span>
                <h2>17 <small>SKUs Depleted/Low</small></h2>
                <p>3 Critical Zero Stock Items</p>
            </div>

            <div className="pharmacy-summary-card expiry-card">
                <span>Batch Expiry Watch</span>
                <h2>8 <small>Batches under 30 days</small></h2>
                <p>Estimated Value at Risk: Rs. 6,420</p>
            </div>

        </div>

        <div className="pharmacy-tabs-section">
            <div className="pharmacy-tabs">
                <button
                    type="button"
                    className={activeTab === 'dispensing' ? 'active' : ''}
                    onClick={() => setActiveTab('dispensing')}
                >
                    Dispensing Queue <span>84</span>
                </button>

                <button
                    type="button"
                    className={activeTab === 'formulary' ? 'active' : ''}
                    onClick={() => setActiveTab('formulary')}
                >
                    Formulary & Stock <span>3,420</span>
                </button>

                <button
                    type="button"
                    className={activeTab === 'expiring' ? 'active' : ''}
                    onClick={() => setActiveTab('expiring')}
                >
                    Expiring & Recalls <span>18</span>
                </button>

                <button
                    type="button"
                    className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => setActiveTab('orders')}
                >
                    Automated POs <span>6</span>
                </button>

                <button
                    type="button"
                    className={activeTab === 'history' ? 'active' : ''}
                    onClick={() => setActiveTab('history')}
                    >
                    Dispensed History <span>{dispensedPrescriptions.length}</span>
                </button>
            </div>

            <div className="pharmacy-filters">
                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                >
                    <option>All Categories</option>
                    <option>Anti-infective</option>
                    <option>Endocrine</option>
                    <option>Cardiovascular</option>
                    <option>Emergency / ICU</option>
                    <option>Antibacterial</option>
                </select>

                <select
                    value={selectedStockLevel}
                    onChange={(event) => setSelectedStockLevel(event.target.value)}
                >
                    <option>All Stock Levels</option>
                    <option>Healthy Stock</option>
                    <option>Low Stock</option>
                    <option>Critical Stock</option>
                </select>
            </div>


            {activeTab === 'dispensing' && (
                <div className="pharmacy-stock-section">
                    <div className="pharmacy-stock-heading">
                    <h2>Prescription Dispensing Queue</h2>
                    <span>84 Pending Prescriptions</span>
                    </div>

                    <div className="pharmacy-table-wrapper">
                    <table className="pharmacy-stock-table">
                        <thead>
                        <tr>
                            <th>Prescription ID</th>
                            <th>Patient Name</th>
                            <th>Medicine</th>
                            <th>Prescribed By</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>RX-1001</td>
                            <td>Nimal Perera</td>
                            <td>Amoxicillin 500mg</td>
                            <td>Dr. Silva</td>
                            <td>Normal</td>
                            <td><span className="stock-badge healthy">Ready to Dispense</span></td>
                        </tr>

                        <tr>
                            <td>RX-1002</td>
                            <td>Kamal Fernando</td>
                            <td>Metformin 500mg</td>
                            <td>Dr. Perera</td>
                            <td>STAT</td>
                            <td><span className="stock-badge critical">Urgent</span></td>
                        </tr>

                        <tr>
                            <td>RX-1003</td>
                            <td>Amaya Silva</td>
                            <td>Atorvastatin 20mg</td>
                            <td>Dr. Fernando</td>
                            <td>Normal</td>
                            <td><span className="stock-badge low">Pending Review</span></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {activeTab === 'expiring' && (
                <div className="pharmacy-stock-section">
                    <div className="pharmacy-stock-heading">
                    <h2>Expiring Batches & Product Recalls</h2>
                    <span>18 Batches Under Review</span>
                    </div>

                    <div className="pharmacy-table-wrapper">
                    <table className="pharmacy-stock-table">
                        <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Batch Number</th>
                            <th>Expiry Date</th>
                            <th>Available Stock</th>
                            <th>Risk Level</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Norepinephrine 4mg/4mL</td>
                            <td>NE-8902</td>
                            <td>Expires in 18 days</td>
                            <td>2 Amps</td>
                            <td>
                            <span className="stock-badge critical">High Risk</span>
                            </td>
                            <td>Review Batch</td>
                        </tr>

                        <tr>
                            <td>Ceftriaxone 1g IV Vial</td>
                            <td>B-99214A</td>
                            <td>Nov 2025</td>
                            <td>12 Vials</td>
                            <td>
                            <span className="stock-badge low">Expiry Review</span>
                            </td>
                            <td>Review Batch</td>
                        </tr>

                        <tr>
                            <td>Fentanyl Citrate 50mcg/mL</td>
                            <td>SCH2-7819</td>
                            <td>Dec 2025</td>
                            <td>45 Amps</td>
                            <td>
                            <span className="stock-badge healthy">Monitor</span>
                            </td>
                            <td>View Details</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="pharmacy-stock-section">
                    <div className="pharmacy-stock-heading">
                    <h2>Automated Purchase Orders</h2>
                    <span>6 Purchase Orders Pending</span>
                    </div>

                    <div className="pharmacy-table-wrapper">
                    <table className="pharmacy-stock-table">
                        <thead>
                        <tr>
                            <th>PO Number</th>
                            <th>Supplier</th>
                            <th>Medicine</th>
                            <th>Order Quantity</th>
                            <th>Order Date</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>PO-2026-001</td>
                            <td>State Pharmaceuticals</td>
                            <td>Ceftriaxone 1g</td>
                            <td>500 Vials</td>
                            <td>16 Nov 2026</td>
                            <td>
                            <span className="stock-badge low">Pending Approval</span>
                            </td>
                        </tr>

                        <tr>
                            <td>PO-2026-002</td>
                            <td>Healthguard Suppliers</td>
                            <td>Metformin 500mg</td>
                            <td>1,000 Tabs</td>
                            <td>15 Nov 2026</td>
                            <td>
                            <span className="stock-badge healthy">Approved</span>
                            </td>
                        </tr>

                        <tr>
                            <td>PO-2026-003</td>
                            <td>Medical Supplies Lanka</td>
                            <td>Norepinephrine 4mg/4mL</td>
                            <td>100 Amps</td>
                            <td>14 Nov 2026</td>
                            <td>
                            <span className="stock-badge critical">Urgent Order</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="pharmacy-stock-section">
                    <div className="pharmacy-stock-heading">
                    <h2>Dispensed Prescriptions History</h2>
                    <span>{dispensedPrescriptions.length} Records</span>
                    </div>

                    <div className="pharmacy-table-wrapper">
                    <table className="pharmacy-stock-table">
                        <thead>
                        <tr>
                            <th>Prescription ID</th>
                            <th>Patient Name</th>
                            <th>Medicine</th>
                            <th>Dosage</th>
                            <th>Quantity</th>
                            <th>Dispensed Date</th>
                        </tr>
                        </thead>

                        <tbody>
                        {dispensedPrescriptions.length > 0 ? (
                            dispensedPrescriptions.map((prescription) => (
                            <tr key={prescription.id}>
                                <td>{prescription.prescriptionId}</td>
                                <td>{prescription.patientName}</td>
                                <td>{prescription.medicine}</td>
                                <td>{prescription.dosage}</td>
                                <td>{prescription.quantity}</td>
                                <td>{prescription.date}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="6" className="pharmacy-empty-state">
                                No dispensed prescriptions found.
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {activeTab === 'formulary' && (
                <div className="pharmacy-stock-section">
                <div className="pharmacy-stock-heading">
                    <h2>Active Formulary Registry & Stock Levels</h2>
                    <span>Displaying 6 of 3,420 pharmaceutical items</span>
                </div>

                <div className="pharmacy-table-wrapper">
                    <table className="pharmacy-stock-table">
                        <thead>
                            <tr>
                                <th>Medicine & Strength</th>
                                <th>Category / Schedule</th>
                                <th>Available Stock</th>
                                <th>Unit Cost</th>
                                <th>Lot # & Exp</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td>
                                    <strong>{medicine.name}</strong>
                                    <small>{medicine.brand}</small>
                                    </td>

                                    <td>{medicine.category}</td>

                                    <td className={medicine.stockClass}>
                                    {medicine.stock}
                                    </td>

                                    <td>{medicine.unitCost}</td>

                                    <td>
                                    {medicine.lot}
                                    <br />
                                    {medicine.expiry}
                                    </td>

                                    <td>
                                    <span className={`stock-badge ${medicine.badgeClass}`}>
                                        {medicine.status}
                                    </span>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="6" className="pharmacy-empty-state">
                                    No medicines found matching your filters.
                                </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            )}

        </div>
    </main>
  )
}

export default Pharmacy
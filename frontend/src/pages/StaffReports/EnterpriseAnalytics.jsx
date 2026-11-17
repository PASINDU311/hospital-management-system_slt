
import React, { useState } from 'react'
import './EnterpriseAnalytics.css'

const revenueData = [
    { month: 'Jan', billed: 2.9, collections: 2.5, cost: 1.9 },
    { month: 'Feb', billed: 3.1, collections: 2.7, cost: 2.0 },
    { month: 'Mar', billed: 3.3, collections: 2.9, cost: 2.1 },
    { month: 'Apr', billed: 3.4, collections: 3.0, cost: 2.0 },
    { month: 'May', billed: 3.6, collections: 3.2, cost: 2.1 },
    { month: 'Jun', billed: 3.8, collections: 3.4, cost: 2.2 },
    { month: 'Jul', billed: 3.9, collections: 3.5, cost: 2.2 },
    { month: 'Aug', billed: 4.0, collections: 3.6, cost: 2.1 },
    { month: 'Sep', billed: 4.1, collections: 3.8, cost: 2.2 },
    { month: 'Oct', billed: 4.2, collections: 3.9, cost: 2.2 }
]

const departments = [
    { name: 'Surgery & Operating Suites', performance: '94%', rating: 'A+', color: 'excellent' },
    { name: 'Clinical Pathology & Lab', performance: '91%', rating: 'A+', color: 'excellent' },
    { name: 'Central Pharmacy & Sterile Comp', performance: '91%', rating: 'A', color: 'good' },
    { name: 'Cardiovascular Institute', performance: '96%', rating: 'A+', color: 'excellent' },
    { name: 'Emergency Medicine (ED)', performance: '82%', rating: 'B+', color: 'average' }
]

const floors = [
    { floor: 'Floor 1: Emergency, Trauma & Triage', beds: 72, occupied: 68, pending: 12 },
    { floor: 'Floor 2: Cardiology, Cath Lab & Telemetry', beds: 58, occupied: 51, pending: 8 },
    { floor: 'Floor 3: Intensive Care Unit (ICU) & Stepdown', beds: 48, occupied: 44, pending: 0 },
    { floor: 'Floor 4: Maternity, Neonatal (NICU) & Pediatrics', beds: 64, occupied: 49, pending: 14 },
    { floor: 'Floor 5: General Medical & Post-Surgical Rehab', beds: 80, occupied: 54, pending: 0 }
]

const reports = [
    { name: 'Hospital Inpatient Billing Summary', date: 'Today, 06:00 AM', format: 'PDF (4.2 MB)', status: 'Approved' },
    { name: 'ICU & ED Sepsis Protocol Clinical Quality Audit', date: 'Yesterday, 18:45', format: 'PDF / XLS (12.8 MB)', status: 'Verified' },
    { name: 'NMRA Controlled Medicines Register', date: 'Oct 22, 2026', format: 'PDF (1.9 MB)', status: 'Audited' },
    { name: 'Physician & Nursing Rostering FTE Variance Report', date: 'Oct 20, 2026', format: 'XLS (840 KB)', status: 'Finalized' },
    { name: 'Nosocomial & Hospital-Acquired Infection (HAI) Telemetry', date: 'Oct 18, 2026', format: 'PDF (3.4 MB)', status: 'Compliant' }
]

function EnterpriseAnalytics() {
    const [timeRange, setTimeRange] = useState('30D')
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments')


    
    const rangeMetrics = {
        Today: {
            encounters: '842',
            billed: 'Rs. 128,500',
            collections: 'Rs. 118,000',
            cost: 'Rs. 72,000',
            margin: '39.0%',
            occupancy: '82.1%',
            compliance: '97.8%'
        },
        '7D': {
            encounters: '5,920',
            billed: 'Rs. 895,000',
            collections: 'Rs. 825,000',
            cost: 'Rs. 510,000',
            margin: '35.8%',
            occupancy: '83.4%',
            compliance: '98.0%'
        },
        '30D': {
            encounters: '24,892',
            billed: 'Rs. 3,842,500',
            collections: 'Rs. 3,550,470',
            cost: 'Rs. 2,120,000',
            margin: '37.2%',
            occupancy: '84.5%',
            compliance: '98.2%'
        },
        'Q3 2026': {
            encounters: '72,450',
            billed: 'Rs. 11,250,000',
            collections: 'Rs. 10,575,000',
            cost: 'Rs. 6,750,000',
            margin: '36.2%',
            occupancy: '85.2%',
            compliance: '98.4%'
        },
        YTD: {
            encounters: '248,920',
            billed: 'Rs. 38,425,000',
            collections: 'Rs. 35,504,700',
            cost: 'Rs. 21,200,000',
            margin: '37.2%',
            occupancy: '84.8%',
            compliance: '98.3%'
        }
    }


    const currentMetrics = rangeMetrics[timeRange]

    const departmentFactors = {
        'All Departments': 1,
        Surgery: 0.28,
        Cardiology: 0.18,
        Laboratory: 0.16,
        Pharmacy: 0.14,
        Emergency: 0.20
    }

    const departmentFactor = departmentFactors[selectedDepartment] ?? 1

    
    const displayMetrics = {
        ...currentMetrics,

        encounters: selectedDepartment === 'All Departments'
            ? currentMetrics.encounters
            : Math.round(
                Number(currentMetrics.encounters.replace(/,/g, '')) * departmentFactor
            ).toLocaleString('en-US'),

        billed: selectedDepartment === 'All Departments'
            ? currentMetrics.billed
            : `Rs. ${Math.round(
                Number(currentMetrics.billed.replace(/[^0-9]/g, '')) * departmentFactor
            ).toLocaleString('en-US')}`,

        collections: selectedDepartment === 'All Departments'
            ? currentMetrics.collections
            : `Rs. ${Math.round(
                Number(currentMetrics.collections.replace(/[^0-9]/g, '')) * departmentFactor
            ).toLocaleString('en-US')}`,

        cost: selectedDepartment === 'All Departments'
            ? currentMetrics.cost
            : `Rs. ${Math.round(
                Number(currentMetrics.cost.replace(/[^0-9]/g, '')) * departmentFactor
            ).toLocaleString('en-US')}`
    }



    
const handleExportReport = (reportName) => {
    const rows = [
        ['HOSPITAL MANAGEMENT SYSTEM - EXECUTIVE DOSSIER'],
        ['Report Name', reportName],
        ['Generated Date', new Date().toLocaleDateString('en-GB')],
        [],
        ['FINANCIAL SUMMARY'],
        ['Metric', 'Value'],
        ['Total Billed', 'Rs. 3,842,500'],
        ['Net Collections', 'Rs. 3,550,470'],
        ['Operational Cost', 'Rs. 2,120,000'],
        ['Operating Margin', '37.2%'],
        [],
        ['MONTHLY REVENUE (Rs. Million)'],
        ['Month', 'Total Billed', 'Collections', 'Direct Cost'],
        ...revenueData.map(item => [
            item.month,
            item.billed,
            item.collections,
            item.cost
        ]),
        [],
        ['DEPARTMENT PERFORMANCE'],
        ['Department', 'Performance', 'Grade'],
        ...departments.map(item => [
            item.name,
            item.performance,
            item.rating
        ]),
        [],
        ['HOSPITAL BED OCCUPANCY'],
        ['Floor', 'Occupied Beds', 'Total Beds', 'Pending Discharges', 'Occupancy'],
        ...floors.map(item => [
            item.floor,
            item.occupied,
            item.beds,
            item.pending,
            `${Math.round(item.occupied / item.beds * 100)}%`
        ]),
        [],
        ['REGULATORY & AUTOMATED REPORTS'],
        ['Report Name', 'Generation Date', 'Format', 'Status'],
        ...reports.map(item => [
            item.name,
            item.date,
            item.format,
            item.status
        ])
    ]

    const csv = rows.map(row =>
        row.map(value => {
            const safeValue = String(value ?? '').replace(/"/g, '""')
            return `"${safeValue}"`
        }).join(',')
    ).join('\n')

    const blob = new Blob(['\uFEFF' + csv], {
        type: 'text/csv;charset=utf-8;'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'hospital-executive-dossier.csv'
    link.click()
    URL.revokeObjectURL(url)
}


    return (
        <div className="enterprise-analytics">

            <div className="enterprise-page-heading">
                <div>
                    <div className="enterprise-breadcrumb">
                        Hospital Operations › Executive Reporting › Clinical & Financial Analytics
                    </div>
                    <h1>Enterprise Hospital Analytics & Regulatory Reporting</h1>
                    <p>
                        Hospital-wide clinical outcomes, bed utilization,
                        revenue cycle metrics, pharmacy performance,
                        and departmental SLA performance.
                    </p>
                </div>

                <div className="enterprise-header-actions">
                    <button type="button">
                        <span className="material-symbols-outlined">schedule</span>
                        Schedule Automated Dispatch
                    </button>
                    <button type="button">
                        <span className="material-symbols-outlined">database</span>
                        Custom SQL Query
                    </button>
                    <button type="button" onClick={() => handleExportReport('Executive Hospital Dossier')}>
                        <span className="material-symbols-outlined">download</span>
                        Export Executive Dossier
                    </button>
                </div>
            </div>

            <div className="enterprise-filters">
                <div className="enterprise-time-filter">
                    <span>TIME HORIZON:</span>
                    {['Today', '7D', '30D', 'Q3 2026', 'YTD'].map(range => (
                        <button
                            key={range}
                            className={timeRange === range ? 'active' : ''}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                <label>
                    DEPARTMENT:
                    <select
                        value={selectedDepartment}
                        onChange={e => setSelectedDepartment(e.target.value)}
                    >
                        <option>All Departments</option>
                        <option>Surgery</option>
                        <option>Cardiology</option>
                        <option>Laboratory</option>
                        <option>Pharmacy</option>
                        <option>Emergency</option>
                    </select>
                </label>
            </div>

            <div className="enterprise-kpi-grid">
                <div className="enterprise-kpi-card">
                    <span className="enterprise-kpi-icon">groups</span>
                    <p>Clinical Encounters</p>
                    <h2>{displayMetrics.encounters}</h2>
                    <span className="enterprise-positive">+8.4% MoM</span>
                    <small>Outpatient: 18,420</small>
                    <small>Inpatient Admits: 6,472</small>
                </div>

                <div className="enterprise-kpi-card">
                    <span className="enterprise-kpi-icon">payments</span>
                    <p>Gross Billed & Collections</p>
                    <h2>{displayMetrics.billed}</h2>
                    <span className="enterprise-positive">+11.8% vs Q2</span>
                    <small>Collection Velocity: 92.4%</small>
                    <small>Clean Claims Pass: 96.8%</small>
                </div>

                <div className="enterprise-kpi-card">
                    <span className="enterprise-kpi-icon">bed</span>
                    <p>Avg Bed Occupancy</p>
                    <h2>{displayMetrics.occupancy}</h2>
                    <span className="enterprise-warning">High Density</span>
                    <small>ICU Unit Saturation: 91.2%</small>
                    <small>Surgical Occupancy: 78.4%</small>
                </div>

                <div className="enterprise-kpi-card">
                    <span className="enterprise-kpi-icon">verified</span>
                    <p>Clinical SLA Compliance</p>
                    <h2>{displayMetrics.compliance}</h2>
                    <span className="enterprise-positive">Compliant</span>
                    <small>ED Door-to-Doctor: 18 min</small>
                    <small>Pharmacy Dispense: 14 min</small>
                </div>
            </div>

            <div className="enterprise-main-grid">

                <div className="enterprise-primary-column">

                    <section className="enterprise-panel">
                        <div className="enterprise-section-heading">
                            <div>
                                <h3>Departmental Revenue vs Operational Expenditure</h3>
                                <p>Monthly fiscal velocity, cash collections, and direct operational margin.</p>
                            </div>
                            <span>Net Collections: {displayMetrics.collections}</span>
                        </div>

                        <div className="enterprise-financial-summary">
                            <div><small>Total Billed</small><strong>{displayMetrics.billed}</strong></div>
                            <div><small>Net Collections</small><strong>{displayMetrics.collections}</strong></div>
                            <div><small>Operational Cost</small><strong>{displayMetrics.cost}</strong></div>
                            <div><small>Operating Margin</small><strong>{currentMetrics.margin}</strong></div>
                        </div>

                        <div className="enterprise-chart">
                            <div className="enterprise-chart-legend">
                                <span className="billed-dot">Total Billed</span>
                                <span className="collection-dot">Collections</span>
                                <span className="cost-dot">Direct Cost</span>
                            </div>

                            <div className="enterprise-chart-bars">
                                {revenueData.map((item, index) => {
                                    const rangeMultiplier = {
                                        Today: 0.15,
                                        '7D': 0.55,
                                        '30D': 1,
                                        'Q3 2026': 0.34,
                                        YTD: 0.10
                                    }

                                    const multiplier = rangeMultiplier[timeRange] * departmentFactor

                                    return (
                                    <div className="enterprise-chart-group" key={item.month}>
                                        <div className="enterprise-bar-set">
                                            <span className="billed-bar" style={{ height: `${item.billed * multiplier * 19}%` }}></span>
                                            <span className="collection-bar" style={{ height: `${item.collections * multiplier * 19}%` }}></span>
                                            <span className="cost-bar" style={{ height: `${item.cost * multiplier * 19}%` }}></span>
                                        </div>
                                        <small>{item.month}</small>
                                    </div>
                                )
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="enterprise-panel">
                        <div className="enterprise-section-heading">
                            <div>
                                <h3>Hospital Census, Bed Turnover & Floor Heatmap</h3>
                                <p>Real-time floor saturation, admissions and forecasted discharge velocity.</p>
                            </div>
                            <span className="enterprise-live">● Live Sensor Grid Active</span>
                        </div>

                        <div className="enterprise-floor-list">
                            {floors.map((floor, index) => (
                                <div className="enterprise-floor" key={floor.floor}>
                                    <div className="enterprise-floor-heading">
                                        <strong>{floor.floor}</strong>
                                        <span>{floor.occupied} Occupied / {floor.beds} Beds</span>
                                    </div>
                                    <div className="enterprise-floor-track">
                                        <span
                                            className={floor.occupied / floor.beds > 0.85 ? 'high' : 'normal'}
                                            style={{ width: `${floor.occupied / floor.beds * 100}%` }}
                                        ></span>
                                    </div>
                                    <small>{Math.round(floor.occupied / floor.beds * 100)}% Occupancy · {floor.pending} Discharges Pending</small>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="enterprise-panel">
                        <div className="enterprise-section-heading">
                            <div>
                                <h3>Recent Automated & Regulatory Reports Log</h3>
                                <p>Downloadable compliance manifests, Ministry of Health reporting documents, and clinical telemetry.</p>
                            </div>
                            <button type="button" className="enterprise-text-btn">
                                View Full Archive →
                            </button>
                        </div>

                        <div className="enterprise-report-table-wrapper">
                            <table className="enterprise-report-table">
                                <thead>
                                    <tr>
                                        <th>Report Document Name</th>
                                        <th>Generation Cycle</th>
                                        <th>Format & Size</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map(report => (
                                        <tr key={report.name}>
                                            <td>{report.name}</td>
                                            <td>{report.date}</td>
                                            <td>{report.format}</td>
                                            <td>
                                                <span className="enterprise-report-status">
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="enterprise-download-btn"
                                                    onClick={() => handleExportReport(report.name)}
                                                    title="Download report"
                                                >
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>

                <aside className="enterprise-secondary-column">

                    <section className="enterprise-panel">
                        <h3>Department Performance</h3>
                        <p>Clinical output vs SLA grade</p>

                        {departments
                            .filter(department =>
                                selectedDepartment === 'All Departments' ||
                                department.name.toLowerCase().includes(selectedDepartment.toLowerCase())
                            )
                            .map(department => (
                                <div className="enterprise-department-item" key={department.name}>
                                    <div>
                                        <strong>{department.name}</strong>
                                        <span>{department.performance} Performance</span>
                                    </div>
                                    <b className={department.color}>{department.rating}</b>
                                </div>
                            ))}
                    </section>

                    <section className="enterprise-panel">
                        <h3>Inpatient DRG Case-Mix</h3>
                        <p>Clinical diagnostic acuity weight</p>
                        <div className="enterprise-drg">
                            <div className="enterprise-drg-circle">
                                <strong>6,472</strong>
                                <small>Admissions</small>
                            </div>
                            <div>
                                <p>Cardiovascular 28%</p>
                                <p>Pulmonary / Respiratory 22%</p>
                                <p>Endocrine / Diabetes 18%</p>
                                <p>Orthopedic Surgery 16%</p>
                                <p>Trauma & General 16%</p>
                            </div>
                        </div>
                    </section>

                    <section className="enterprise-panel">
                        <h3>Scheduled Regulatory Delivery</h3>
                        <p>Continuous statutory data feeds</p>
                        <div className="enterprise-delivery-item">
                            <strong>Ministry of Health – Health Information Reporting</strong>
                            <span>Syncing</span>
                        </div>
                        <div className="enterprise-delivery-item">
                            <strong>Hospital Clinical Quality & Safety Reporting</strong>
                            <span>Scheduled</span>
                        </div>
                        <div className="enterprise-delivery-item">
                            <strong>Executive Financial Digest</strong>
                            <span>Monday 07:00</span>
                        </div>
                        <button type="button" className="enterprise-configure-btn">
                            Configure Dispatch & Webhooks
                        </button>
                    </section>

                </aside>
            </div>
        </div>
    )
}

export default EnterpriseAnalytics

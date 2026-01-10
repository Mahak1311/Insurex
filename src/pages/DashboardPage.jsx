import { useState } from 'react'
import { 
  PieChart, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  FileText,
  Filter,
  Info
} from 'lucide-react'
import './DashboardPage.css'

function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const billData = {
    totalBill: 65000,
    covered: 45000,
    partialCover: 12000,
    notCovered: 8000,
    outOfPocket: 20000
  }

  const billItems = [
    { id: 1, item: 'Room Charges (Deluxe)', cost: 25000, status: 'partial', coverage: 60, reason: 'Sub-limit of ₹1,500/day. Deluxe room exceeds limit.' },
    { id: 2, item: 'Surgery Charges', cost: 20000, status: 'covered', coverage: 100, reason: 'Fully covered under policy' },
    { id: 3, item: 'ICU Charges', cost: 8000, status: 'covered', coverage: 100, reason: 'Covered as medically necessary' },
    { id: 4, item: 'Diagnostic Tests', cost: 5000, status: 'covered', coverage: 100, reason: 'Pre-surgery tests covered' },
    { id: 5, item: 'Physiotherapy', cost: 4000, status: 'excluded', coverage: 0, reason: 'Not covered in base policy' },
    { id: 6, item: 'Medicines', cost: 3000, status: 'covered', coverage: 100, reason: 'Covered under hospitalization' }
  ]

  const filteredItems = billItems.filter(item => 
    activeFilter === 'all' || 
    (activeFilter === 'covered' && item.status === 'covered') ||
    (activeFilter === 'partial' && item.status === 'partial') ||
    (activeFilter === 'excluded' && item.status === 'excluded')
  )

  const getStatusBadge = (status) => {
    const badges = {
      covered: { label: 'Covered', class: 'badge-success', icon: CheckCircle },
      partial: { label: 'Partial', class: 'badge-warning', icon: AlertTriangle },
      excluded: { label: 'Excluded', class: 'badge-danger', icon: XCircle }
    }
    const badge = badges[status]
    const Icon = badge.icon
    return (
      <span className={`badge ${badge.class}`}>
        <Icon size={12} />
        {badge.label}
      </span>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Coverage Breakdown</h1>
            <p className="page-subtitle">Hospital Bill Analysis - AIIMS Delhi</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <Share2 size={18} />
              Share
            </button>
            <button className="btn btn-primary">
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card total">
            <div className="summary-icon">
              <FileText size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Total Bill Amount</div>
              <div className="summary-value">₹{billData.totalBill.toLocaleString()}</div>
            </div>
          </div>

          <div className="summary-card covered">
            <div className="summary-icon">
              <CheckCircle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Covered Amount</div>
              <div className="summary-value">₹{billData.covered.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.covered / billData.totalBill) * 100)}% covered</div>
            </div>
          </div>

          <div className="summary-card partial">
            <div className="summary-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Partially Covered</div>
              <div className="summary-value">₹{billData.partialCover.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.partialCover / billData.totalBill) * 100)}% partial</div>
            </div>
          </div>

          <div className="summary-card excluded">
            <div className="summary-icon">
              <XCircle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Not Covered</div>
              <div className="summary-value">₹{billData.notCovered.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.notCovered / billData.totalBill) * 100)}% excluded</div>
            </div>
          </div>

          <div className="summary-card oop">
            <div className="summary-icon">
              <AlertCircle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Your Out-of-Pocket</div>
              <div className="summary-value highlight">₹{billData.outOfPocket.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.outOfPocket / billData.totalBill) * 100)}% of total</div>
            </div>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="chart-section card">
          <h2 className="section-title">Coverage Distribution</h2>
          <div className="chart-container">
            <div className="pie-chart">
              <PieChart size={200} />
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot covered"></div>
                <div>
                  <div className="legend-label">Covered</div>
                  <div className="legend-value">₹{billData.covered.toLocaleString()}</div>
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot partial"></div>
                <div>
                  <div className="legend-label">Partial Coverage</div>
                  <div className="legend-value">₹{billData.partialCover.toLocaleString()}</div>
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot excluded"></div>
                <div>
                  <div className="legend-label">Not Covered</div>
                  <div className="legend-value">₹{billData.notCovered.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="breakdown-section card">
          <div className="breakdown-header">
            <h2 className="section-title">Detailed Bill Items</h2>
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Items
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'covered' ? 'active' : ''}`}
                onClick={() => setActiveFilter('covered')}
              >
                <Filter size={14} />
                Covered
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'partial' ? 'active' : ''}`}
                onClick={() => setActiveFilter('partial')}
              >
                <Filter size={14} />
                Partial
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'excluded' ? 'active' : ''}`}
                onClick={() => setActiveFilter('excluded')}
              >
                <Filter size={14} />
                Excluded
              </button>
            </div>
          </div>

          <div className="bill-items-table">
            <div className="table-header">
              <div>Bill Item</div>
              <div>Cost</div>
              <div>Coverage</div>
              <div>Status</div>
              <div>Explanation</div>
            </div>
            {filteredItems.map(item => (
              <div key={item.id} className="table-row">
                <div className="item-name">{item.item}</div>
                <div className="item-cost">₹{item.cost.toLocaleString()}</div>
                <div className="item-coverage">
                  <div className="coverage-bar">
                    <div 
                      className={`coverage-fill ${item.status}`} 
                      style={{ width: `${item.coverage}%` }}
                    ></div>
                  </div>
                  <span className="coverage-text">{item.coverage}%</span>
                </div>
                <div className="item-status">
                  {getStatusBadge(item.status)}
                </div>
                <div className="item-explanation">
                  <Info size={14} />
                  <span>{item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Alert */}
        <div className="alert-card card">
          <AlertCircle size={32} className="alert-icon" />
          <div className="alert-content">
            <h3>Potential Billing Issue Detected</h3>
            <p>
              Room charges may be disputable. Your policy allows semi-private rooms, 
              but you were charged for a deluxe room. Consider requesting a room category 
              review with your insurer.
            </p>
            <button className="btn btn-primary">
              Generate Dispute Script
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

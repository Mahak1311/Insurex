import { useState } from 'react'
import { Search, MapPin, Filter, CheckCircle, Building2, Phone, Navigation } from 'lucide-react'
import './HospitalSearchPage.css'

function HospitalSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    city: '',
    cashless: false,
    specialty: ''
  })

  const hospitals = [
    {
      id: 1,
      name: 'AIIMS Delhi',
      type: 'Government',
      city: 'Delhi',
      cashless: true,
      specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
      distance: '2.5 km',
      phone: '+91-11-26588500',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Max Super Speciality Hospital',
      type: 'Private',
      city: 'Delhi',
      cashless: true,
      specialties: ['Cardiology', 'Oncology', 'Gastroenterology'],
      distance: '5.2 km',
      phone: '+91-11-26515050',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Apollo Hospital',
      type: 'Private',
      city: 'Delhi',
      cashless: true,
      specialties: ['Multi-specialty'],
      distance: '8.1 km',
      phone: '+91-11-26825858',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Fortis Hospital',
      type: 'Private',
      city: 'Delhi',
      cashless: false,
      specialties: ['Cardiology', 'Neurosurgery'],
      distance: '10.3 km',
      phone: '+91-11-40404040',
      rating: 4.5
    }
  ]

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = !filters.city || hospital.city === filters.city
    const matchesCashless = !filters.cashless || hospital.cashless
    return matchesSearch && matchesCity && matchesCashless
  })

  return (
    <div className="hospital-search-page">
      <div className="container">
        <div className="search-header">
          <h1 className="page-title">Find Network Hospitals</h1>
          <p className="page-subtitle">
            Search for cashless and network hospitals in your policy
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-section">
          <div className="search-input-wrapper">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search hospitals by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="search-filters">
            <div className="filter-group">
              <MapPin size={18} />
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="filter-select"
              >
                <option value="">All Cities</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <button
              className={`filter-btn ${filters.cashless ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, cashless: !filters.cashless })}
            >
              <Filter size={18} />
              Cashless Only
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="search-results">
          <div className="results-header">
            <h2 className="results-count">
              {filteredHospitals.length} hospitals found
            </h2>
            <button className="btn btn-secondary">
              <Navigation size={18} />
              Near Me
            </button>
          </div>

          <div className="hospital-grid">
            {filteredHospitals.map(hospital => (
              <div key={hospital.id} className="hospital-card card">
                <div className="hospital-header">
                  <div className="hospital-info">
                    <h3 className="hospital-name">{hospital.name}</h3>
                    <div className="hospital-meta">
                      <span className={`hospital-type ${hospital.type.toLowerCase()}`}>
                        {hospital.type}
                      </span>
                      <span className="hospital-rating">
                        ★ {hospital.rating}
                      </span>
                    </div>
                  </div>
                  {hospital.cashless && (
                    <div className="cashless-badge">
                      <CheckCircle size={18} />
                      Cashless
                    </div>
                  )}
                </div>

                <div className="hospital-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{hospital.city} • {hospital.distance} away</span>
                  </div>
                  <div className="detail-item">
                    <Building2 size={16} />
                    <span>{hospital.specialties.join(', ')}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{hospital.phone}</span>
                  </div>
                </div>

                <div className="hospital-actions">
                  <button className="btn btn-primary">
                    View Details
                  </button>
                  <button className="btn btn-secondary">
                    Get Directions
                  </button>
                </div>

                {hospital.cashless && (
                  <div className="compliance-note">
                    <CheckCircle size={14} />
                    <span>Pre-authorization available for cashless treatment</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="info-card card">
          <h3>About Cashless Treatment</h3>
          <p>
            For cashless treatment, you must inform your insurance company 48 hours before 
            planned hospitalization. In case of emergency, inform within 24 hours of admission. 
            The hospital will coordinate directly with your insurer for claim settlement.
          </p>
          <p>
            <strong>Note:</strong> Even in network hospitals, some expenses may not be covered 
            under cashless and you may need to pay out-of-pocket. Always verify with your insurer.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HospitalSearchPage

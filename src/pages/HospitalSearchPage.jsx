import { useState, useEffect } from 'react'
import { Search, MapPin, Filter, CheckCircle, Building2, Phone, Navigation, Loader2 } from 'lucide-react'
import './HospitalSearchPage.css'

const fallbackHospitalsByPincode = {
  '110001': [
    {
      name: 'Delhi Heart & Lung Institute',
      address: '3, MM Rd, Ranjit Nagar, Delhi 110001',
      location: { lat: 28.6406, lng: 77.1926 },
      city: 'New Delhi',
      distanceKm: 2.4,
      rating: 4.3,
      phone: '+91-11-42888888',
      specialties: ['Cardiology', 'Pulmonology'],
      cashlessLikely: true,
      type: 'Specialty'
    },
    {
      name: 'BLK-Max Super Specialty Hospital',
      address: 'Pusa Road, Karol Bagh, Delhi 110001',
      location: { lat: 28.6431, lng: 77.189 },
      city: 'New Delhi',
      distanceKm: 3.1,
      rating: 4.5,
      phone: '+91-11-30403040',
      specialties: ['Oncology', 'Orthopedics', 'Neurosciences'],
      cashlessLikely: true,
      type: 'Super Specialty'
    },
    {
      name: 'Sir Ganga Ram Hospital',
      address: 'Rajinder Nagar, New Delhi 110001',
      location: { lat: 28.6409, lng: 77.1895 },
      city: 'New Delhi',
      distanceKm: 3.6,
      rating: 4.4,
      phone: '+91-11-25750000',
      specialties: ['Multi-specialty'],
      cashlessLikely: true,
      type: 'Multi Specialty'
    },
    {
      name: 'Dr. Ram Manohar Lohia Hospital',
      address: 'Baba Kharak Singh Marg, Connaught Place, Delhi 110001',
      location: { lat: 28.626, lng: 77.2069 },
      city: 'New Delhi',
      distanceKm: 1.8,
      rating: 4.2,
      phone: '+91-11-23404262',
      specialties: ['General Medicine', 'Emergency'],
      cashlessLikely: true,
      type: 'Government'
    }
  ]
}

const buildDirectionsUrl = (hospital) => {
  const lat = hospital?.location?.lat ?? hospital?.location?.latitude
  const lng = hospital?.location?.lng ?? hospital?.location?.longitude
  const destination = lat && lng
    ? `${lat},${lng}`
    : encodeURIComponent(hospital?.address || hospital?.name || 'hospital')
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}

const buildDetailsUrl = (hospital) => {
  if (hospital?.placeId) {
    return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${hospital.placeId}`
  }
  const query = encodeURIComponent(`${hospital?.name || 'Hospital'} ${hospital?.address || ''}`.trim())
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

function HospitalSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    pincode: '',
    cashless: false,
    specialty: ''
  })
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(false)
  const [pincodeError, setPincodeError] = useState('')
  const [apiKey, setApiKey] = useState('')

  const mapHospitals = (list = []) => list.map((hospital, idx) => {
    const location = hospital.location || {
      lat: hospital.lat,
      lng: hospital.lng
    }

    const distanceValue = hospital.distanceKm ?? hospital.distance
    const distanceText = typeof distanceValue === 'number'
      ? `${distanceValue.toFixed(1)} km`
      : distanceValue || 'Nearby'

    const specialties = Array.isArray(hospital.specialties) && hospital.specialties.length
      ? hospital.specialties
      : ['General Medicine']

    return {
      id: hospital.placeId || hospital.id || `${hospital.name || 'hospital'}-${idx}`,
      name: hospital.name || 'Network Hospital',
      type: hospital.type || 'Multi Specialty',
      city: hospital.city || hospital.address?.split(',').slice(-2, -1)[0]?.trim() || 'Nearby',
      distance: distanceText,
      rating: hospital.rating || 4.3,
      phone: hospital.phone || 'Not available',
      specialties,
      cashless: hospital.cashless ?? hospital.cashlessLikely ?? true,
      address: hospital.address || hospital.vicinity || '',
      location,
      placeId: hospital.placeId,
      directionsUrl: buildDirectionsUrl({ ...hospital, location }),
      detailsUrl: buildDetailsUrl({ ...hospital, location })
    }
  })

  const useFallbackHospitals = (pincode) => {
    const fallback = mapHospitals(fallbackHospitalsByPincode[pincode] || [])
    setHospitals(fallback)
    if (fallback.length) {
      setPincodeError('Showing sample hospitals while live lookup is unavailable.')
    }
  }

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    setApiKey(key)
  }, [])

  // Fetch hospitals when pincode changes
  useEffect(() => {
    if (filters.pincode && /^\d{6}$/.test(filters.pincode)) {
      fetchHospitals(filters.pincode)
    } else if (filters.pincode && !/^\d{6}$/.test(filters.pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode')
      setHospitals([])
    } else {
      setPincodeError('')
      setHospitals([])
    }
  }, [filters.pincode])

  const fetchHospitals = async (pincode) => {
    setLoading(true)
    setPincodeError('')
    try {
      const response = await fetch(`http://localhost:5000/api/hospitals?pincode=${pincode}`)
      const data = await response.json()
      const mapped = mapHospitals(data?.hospitals || [])
      if (mapped.length) {
        setHospitals(mapped)
      } else {
        useFallbackHospitals(pincode)
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error)
      useFallbackHospitals(pincode)
      if (!fallbackHospitalsByPincode[pincode]?.length) {
        setPincodeError('Failed to fetch hospitals. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Filter hospitals by search term and cashless status
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (hospital.specialties && hospital.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesCashless = !filters.cashless || hospital.cashless
    return matchesSearch && matchesCashless
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
              <input
                type="text"
                placeholder="Insert pincode..."
                value={filters.pincode}
                onChange={(e) => setFilters({ ...filters, pincode: e.target.value })}
                className="filter-input"
              />
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
          {pincodeError && (
            <div className="error-message">
              ⚠ {pincodeError}
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <Loader2 size={24} className="spinner" />
              <p>Finding hospitals near you...</p>
            </div>
          )}

          {!loading && filters.pincode && !pincodeError && (
            <>
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
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map(hospital => (
                    <div key={hospital.id} className="hospital-card card">
                      <div className="hospital-header">
                        <div className="hospital-info">
                          <h3 className="hospital-name">{hospital.name}</h3>
                          <div className="hospital-meta">
                            <span className={`hospital-type ${hospital.type.toLowerCase()}`}>
                              {hospital.type}
                            </span>
                            <span className="hospital-rating">
                              ★ {hospital.rating || 4.5}
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
                          <span>{hospital.specialties ? hospital.specialties.join(', ') : 'Multi-specialty'}</span>
                        </div>
                        <div className="detail-item">
                          <Phone size={16} />
                          <span>{hospital.phone}</span>
                        </div>
                      </div>

                      <div className="hospital-actions">
                        <a
                          className="btn btn-primary"
                          href={hospital.detailsUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Details
                        </a>
                        <a
                          className="btn btn-secondary"
                          href={hospital.directionsUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Get Directions
                        </a>
                      </div>

                      {hospital.cashless && (
                        <div className="compliance-note">
                          <CheckCircle size={14} />
                          <span>Pre-authorization available for cashless treatment</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No hospitals found matching your search. Try a different pincode or search term.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {!filters.pincode && !loading && (
            <div className="empty-state">
              <MapPin size={48} />
              <p>Enter a pincode to find nearby network hospitals</p>
            </div>
          )}
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

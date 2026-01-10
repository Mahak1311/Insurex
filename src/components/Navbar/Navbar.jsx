import { Link, useLocation } from 'react-router-dom'
import { 
  Upload, 
  LayoutDashboard, 
  Calculator, 
  Building2, 
  Users, 
  User,
  Shield,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/simulator', label: 'Simulator', icon: Calculator },
    { path: '/hospitals', label: 'Hospitals', icon: Building2 },
    { path: '/family', label: 'Family', icon: Users },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Shield className="brand-icon" />
          <span className="brand-text">ClearCare</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>

        <Link to="/profile" className="navbar-profile">
          <User size={20} />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

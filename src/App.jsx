import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UploadPage from './pages/UploadPage'
import DashboardPage from './pages/DashboardPage'
import SimulatorPage from './pages/SimulatorPage'
import HospitalSearchPage from './pages/HospitalSearchPage'
import FamilyPolicyPage from './pages/FamilyPolicyPage'
import ProfilePage from './pages/ProfilePage'
import PreHospitalizationPage from './pages/PreHospitalizationPage'
import HealthInsurance101Page from './pages/HealthInsurance101Page'
import TermInsurance101Page from './pages/TermInsurance101Page'
import BestHealthPlans2026Page from './pages/BestHealthPlans2026Page'
import ComparePoliciesPage from './pages/ComparePoliciesPage'
import ClaimProcessGuidePage from './pages/ClaimProcessGuidePage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import AboutInsurexPage from './pages/AboutInsurexPage'
import ContactUsPage from './pages/ContactUsPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No Layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Info Pages - No Layout */}
        <Route path="/health-insurance-101" element={<HealthInsurance101Page />} />
        <Route path="/term-insurance-101" element={<TermInsurance101Page />} />
        <Route path="/best-health-plans-2026" element={<BestHealthPlans2026Page />} />
        <Route path="/compare-policies" element={<ComparePoliciesPage />} />
        <Route path="/claim-process-guide" element={<ClaimProcessGuidePage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<AboutInsurexPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        
        {/* Protected Routes - With Layout */}
        <Route element={<Layout />}>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/hospitals" element={<HospitalSearchPage />} />
          <Route path="/family" element={<FamilyPolicyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pre-hospitalization" element={<PreHospitalizationPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

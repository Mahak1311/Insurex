# Insurex - Healthcare Insurance Transparency Platform

![Insurex Logo](https://img.shields.io/badge/Insurex-Healthcare-blue)
![React](https://img.shields.io/badge/React-18+-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff)
![License](https://img.shields.io/badge/license-MIT-green)

> Making healthcare insurance transparent for every Indian family

A modern, AI-powered healthcare insurance platform that helps Indians understand their health insurance coverage before it's too late. Using machine learning and rule-based logic, Insurex translates complex insurance policies into clear, actionable insights.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## ✨ Features

### 1. **Bill Upload & Analysis** 📤
- Drag-and-drop file upload
- Upload hospital bills (PDF/Image/Excel)
- AI extracts line items automatically
- Real-time coverage analysis
- Security reassurance messaging
- Breakdown by covered/partially covered/excluded items

### 2. **Coverage Dashboard** 📊
- Visual cost breakdown with pie charts
- Summary cards (total bill, covered, partial, excluded, out-of-pocket)
- Detailed bill items table with coverage status
- Filtering options (covered/partial/excluded)
- Export to PDF functionality
- Dispute detection alerts

### 3. **Pre-Hospitalization Cost Estimator** 🧮
- Estimate costs before treatment
- Factor in location, hospital type, room category
- Real-time out-of-pocket calculation
- **Out-of-Pocket Ripple Graph** - Animated visualization showing how each decision impacts costs
- Risk warnings for coverage issues
- Cost breakdown by item

### 4. **AI Dispute Forecaster** ⚖️
- Analyzes bill items for dispute potential
- Assigns risk levels (High/Medium/Low)
- Generates email and call scripts with IRDAI references
- Shows success rate predictions
- Action points for each dispute

### 5. **Coverage Simulator** 🎯
- Test different treatment scenarios
- Compare policies side-by-side
- What-if analysis for various procedures
- Cost projections with different room types

### 6. **Network Hospital Search** 🏥
- Search by location and specialty
- Filter by city and cashless availability
- Distance and ratings
- Hospital cards with type, specialties, contact info
- Cashless badge indicators
- Real-time availability (mock)

### 7. **Family Policy Manager** 👨‍👩‍👧‍👦
- Track coverage for multiple family members
- Identify gaps and overlaps
- Dependent management
- Individual policy details

### 8. **Profile & Settings** ⚙️
- Edit profile information with modal forms
- Change password with visibility toggles
- Notification preferences (Email, SMS, Claims, Updates)
- Multi-language support (English, Hindi, Gujarati)
- Voice explanations with Text-to-Speech
- Two-factor authentication
- Sign out functionality

### 9. **Educational Resources** 📚
- Health Insurance 101 guide
- Term Insurance complete guide
- Best Health Plans 2026 comparison
- Policy comparison tools
- Claim process step-by-step
- Terms & Conditions
- Privacy Policy (DPDP Act 2023 compliant)
- About Insurex & Contact Us pages
---

## 🛠 Tech Stack

### Frontend
- **React 18+** - UI library with hooks
- **React Router v6** - Client-side routing
- **Vite 5.4.21** - Build tool & dev server
- **Recharts** - Data visualization (Ripple Graph)
- **Lucide React** - Icon library

### Styling
- **Custom CSS** - CSS Variables for theming
- **CSS Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first approach
- **Fonts:** Inter (Google Fonts)

### State Management
- **React Hooks** - useState, useEffect, useCallback, useMemo
- **Local State** - No external state management needed

### Logic Engines
- `coverageEngine.js` - Policy coverage analysis
- `preHospitalizationEngine.js` - Cost estimation logic (mock)
- `disputeForecaster.js` - Dispute prediction algorithms (mock)

### APIs
- All data currently uses mock/demo data
- Ready for backend integration

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "final pro"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3004
```

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
final pro/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── OutOfPocketRippleGraph.jsx
│   │   └── OutOfPocketRippleGraph.css
│   │
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── AuthPages.css
│   │   ├── UploadPage.jsx
│   │   ├── UploadPage.css
│   │   ├── DashboardPage.jsx
│   │   ├── DashboardPage.css
│   │   ├── PreHospitalizationPage.jsx (with Ripple Graph)
│   │   ├── PreHospitalizationPage.css
│   │   ├── SimulatorPage.jsx
│   │   ├── SimulatorPage.css
│   │   ├── HospitalSearchPage.jsx
│   │   ├── HospitalSearchPage.css
│   │   ├── FamilyPolicyPage.jsx
│   │   ├── FamilyPolicyPage.css
│   │   ├── ProfilePage.jsx
│   │   ├── ProfilePage.css
│   │   ├── HealthInsurance101Page.jsx
│   │   ├── TermInsurance101Page.jsx
│   │   ├── BestHealthPlans2026Page.jsx
│   │   ├── ComparePoliciesPage.jsx
│   │   ├── ClaimProcessGuidePage.jsx
│   │   ├── TermsConditionsPage.jsx
│   │   ├── PrivacyPolicyPage.jsx
│   │   ├── AboutInsurexPage.jsx
│   │   ├── ContactUsPage.jsx
│   │   └── InfoPage.css         # Shared styles for info pages
│   │
│   ├── lib/                 # Business logic engines
│   │   └── coverageEngine.js
│   │
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── server/
│   └── index.js             # Express server (optional)
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── GITHUB_SETUP.md          # GitHub setup instructions
└── README.md                # This file
```

---

## 🔑 Key Components

### 1. **OutOfPocketRippleGraph Component**

The Ripple Graph is the most advanced visualization in Insurex, showing how each decision impacts your out-of-pocket costs.

**Usage:**
```jsx
import OutOfPocketRippleGraph from '../components/OutOfPocketRippleGraph'

<OutOfPocketRippleGraph 
  formData={formData}
  estimatedCost={totalCost}
  coveredAmount={insuranceCoverage}
/>
```

**Props:**
- `formData`: User selections (procedure, location, hospital, room)
- `estimatedCost`: Total estimated cost
- `coveredAmount`: Insurance coverage amount

**Features:**
- Real-time animation (800ms smooth transitions)
- 5-step cost calculation (Procedure → Location → Hospital Type → Room Type → Final Cost)
- Color-coded risk levels:
  - Green: < ₹50,000 out-of-pocket
  - Yellow: ₹50,000 - ₹100,000
  - Orange: ₹100,000 - ₹200,000
  - Red: > ₹200,000
- Interactive tooltips with explanations
- Spike detection for cost jumps (e.g., room rent cap exceeded)
- Smart insights (danger/warning/success alerts)

**Technical Details:**
- Built with Recharts library
- Uses `useMemo` for performance optimization
- Dynamic multipliers:
  - Location: Metro (1.3x), Tier 2 (1.1x), Tier 3 (0.9x)
  - Hospital: Private (1.5x), Trust (1.2x), Govt (0.8x)
  - Room: Deluxe (1.6x), Single (1.2x), Semi-private (1.0x), General (0.7x)

### 2. **Layout Component**
- Wraps all authenticated pages
- Includes persistent navbar
- Handles navigation state
- Responsive mobile menu

### 3. **Coverage Engine**

**Location:** `src/lib/coverageEngine.js`

```javascript
import { analyzeCoverage } from '../lib/coverageEngine'

const analysis = analyzeCoverage(policyDetails, billItems)
```

**Input:**
```javascript
policyDetails = {
  sumInsured: 500000,
  roomRentCap: 5000,
  coPayment: 20,
  subLimits: ['implants', 'consumables']
}

billItems = [
  { name: 'Room Charges', amount: 8000, category: 'room' },
  { name: 'Surgery', amount: 150000, category: 'procedure' }
]
```

**Output:**
```javascript
{
  breakdown: [
    {
      itemName: 'Room Charges',
      originalCost: 8000,
      coveredCost: 5000,
      uncoveredCost: 3000,
      status: 'partially_covered',
      reason: 'Room rent exceeds policy cap'
    }
  ],
  summary: {
    totalBill: 158000,
    totalCovered: 126000,
    totalUncovered: 32000,
    coveragePercentage: 79.7
  }
}
```

---

## 📖 Usage Guide

### For Patients

1. **Sign Up / Login**
   - Demo credentials available on login page
   - Google OAuth integration (mock)

2. **Upload Hospital Bill**
   - Go to Upload page
   - Drag & drop or click to upload PDF/Image
   - Review extracted items (mock extraction)

3. **View Coverage Analysis**
   - Navigate to Dashboard
   - See visual breakdown with pie charts
   - Check covered vs excluded items
   - View dispute forecasts with risk levels

4. **Estimate Pre-Treatment Costs**
   - Go to Pre-Hospitalization page
   - Select procedure from dropdown
   - Fill in location, hospital type, room type
   - Click "Generate Guidance"
   - **View animated Ripple Graph** showing cost impact
   - Get personalized recommendations

5. **Search Network Hospitals**
   - Navigate to Hospitals page
   - Filter by city, specialty, distance
   - View cashless facilities
   - Check ratings and contact info

6. **Manage Family Policies**
   - Go to Family Policy page
   - Track coverage for all members
   - Identify gaps and overlaps

7. **Update Profile & Settings**
   - Click profile icon in navbar
   - Edit personal information
   - Change notification preferences
   - Enable voice explanations (Text-to-Speech)
   - Switch language (English/Hindi/Gujarati)
   - Change password with visibility toggle
   - Enable two-factor authentication

### For Developers

#### Adding a New Page

1. Create component in `src/pages/`
```jsx
function NewPage() {
  return (
    <div className="new-page">
      <h1>New Page Content</h1>
    </div>
  )
}

export default NewPage
```

2. Add route in `src/App.jsx`
```jsx
import NewPage from './pages/NewPage'

// Inside Routes
<Route path="/new-page" element={<NewPage />} />
```

3. Add navigation link in Navbar or Layout

#### Customizing the Ripple Graph

Edit `src/components/OutOfPocketRippleGraph.jsx`:

**Change calculation steps:**
```javascript
const rippleData = useMemo(() => {
  // Add or modify steps
  steps.push({
    name: 'New Step',
    amount: previousAmount * 1.2, // Your multiplier
    description: 'Explanation'
  })
}, [formData, estimatedCost, coveredAmount])
```

**Adjust color thresholds:**
```javascript
const getColor = (amount) => {
  if (amount < 30000) return '#10b981'  // Green
  if (amount < 75000) return '#f59e0b'  // Yellow
  if (amount < 150000) return '#fb923c' // Orange
  return '#ef4444'                       // Red
}
```

**Add new insights:**
```javascript
const rippleInsights = useMemo(() => {
  const insights = []
  
  if (outOfPocket > 300000) {
    insights.push({
      type: 'danger',
      title: 'Your Custom Alert',
      message: 'Your custom message'
    })
  }
  
  return insights
}, [rippleData])
```

---

## 🎨 Design System

### CSS Variables

Defined in `src/index.css`:
```css
--color-primary: #6366f1;      /* Indigo */
--color-secondary: #8b5cf6;    /* Purple */
--color-success: #10b981;      /* Green */
--color-warning: #f59e0b;      /* Amber */
--color-danger: #ef4444;       /* Red */
--color-text: #1f2937;         /* Dark gray */
--color-text-secondary: #6b7280; /* Medium gray */
--color-border: #e5e7eb;       /* Light gray */
--color-background: #f8fafc;   /* Light blue-gray */
```

### Responsive Breakpoints

- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** < 768px

### Animation Classes

- `.fade-in` - Opacity fade
- `.slide-up` - Slide from bottom
- `.pulse` - Pulsing effect
- `.shimmer` - Shimmer loading effect
- `.spike-pulse` - Spike detection animation

---

## 🚧 Roadmap

### Phase 1 (Current - MVP) ✅
- Frontend implementation
- Mock data and logic engines
- Responsive design
- Core features (Upload, Dashboard, Pre-Hosp, Simulator, Hospitals, Family, Profile)
- Out-of-Pocket Ripple Graph visualization
- Dispute forecasting
- Educational content pages
- Profile management with voice & language features

### Phase 2 (Next - Backend & Integration)
- [ ] Backend API development (Node.js + Express)
- [ ] Database setup (PostgreSQL/MongoDB)
- [ ] User authentication (JWT)
- [ ] Real OCR integration for bill extraction
- [ ] Real-time notifications (email/SMS)
- [ ] Integration with insurance company APIs

### Phase 3 (Future - Advanced Features)
- [ ] Machine learning model training for dispute prediction
- [ ] Mobile app (React Native)
- [ ] Integration with IRDAI database
- [ ] Real hospital network API integration
- [ ] Payment gateway for premium services
- [ ] Multi-policy comparison engine
- [ ] AI chatbot for policy queries
- [ ] Telemedicine integration

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow existing naming conventions (camelCase for functions/variables)
- Add JSDoc comments for complex logic
- Keep components under 500 lines (split if larger)
- Use separate CSS files for each component
- Prefer CSS custom properties over hardcoded colors
- Write semantic HTML
- Ensure mobile responsiveness

### Testing Checklist

Before submitting a PR:
- [ ] Test on desktop and mobile viewports
- [ ] Check all interactive elements work
- [ ] Verify no console errors
- [ ] Test navigation flows
- [ ] Check accessibility (keyboard navigation)
- [ ] Verify graph animations are smooth

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support & Contact

For questions, feedback, or support:

### General Inquiries
- **Email:** help@insurex.in
- **Phone:** 080-45680003 (Mon-Sat, 10 AM - 6 PM IST)

### Claims Emergency
- **Hotline:** 080-48816818 (24/7)
- **Email:** claims@insurex.in

### Technical Support
- **Email:** tech@insurex.in
- **GitHub Issues:** [Report a bug](https://github.com/your-repo/issues)

### Business & Partnerships
- **Email:** business@insurex.in
- **LinkedIn:** [Insurex India](https://linkedin.com/company/insurex)

### Social Media
- **Twitter:** [@InsurexIndia](https://twitter.com/insurex)
- **Instagram:** [@insurex.in](https://instagram.com/insurex.in)
- **Facebook:** [Insurex India](https://facebook.com/insurex)
- **YouTube:** [Insurex Channel](https://youtube.com/@insurex)

---

## 🙏 Acknowledgments

- **IRDAI** (Insurance Regulatory and Development Authority of India) for insurance regulations
- **Indian healthcare system** insights and data
- **Open-source community** for amazing tools (React, Vite, Recharts)
- **All contributors** and early testers
- **Ditto Insurance** for design inspiration

---

## 🔒 Privacy & Security

- All data processing follows DPDP Act 2023 compliance
- End-to-end encryption for sensitive data (upcoming)
- No sharing of personal information with third parties
- Regular security audits
- HTTPS enforced in production
- See [Privacy Policy](http://localhost:3004/privacy-policy) for details

---

## 📊 Current Status

**Version:** 1.0.0 (MVP)  
**Status:** Active Development  
**Last Updated:** January 2026  
**Build Status:** ✅ Passing  
**Dev Server:** http://localhost:3004

---

---

**Built with ❤️ for every Indian family**

*Making healthcare insurance transparent, one bill at a time.*

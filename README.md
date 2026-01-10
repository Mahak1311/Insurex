# ClearCare - Healthcare Insurance Clarity Platform

A modern, India-focused healthcare fintech web application that helps users understand their health insurance coverage for hospital bills. Built for a hackathon MVP.

## Features

### 🏠 Landing Page
- Hero section with clear value proposition
- Trust badges (security, privacy, India-ready)
- How it works section
- Feature highlights
- Call-to-action sections

### 🔐 Authentication
- Email + OTP based login/signup
- Demo user option
- Clean onboarding flow

### 📤 Document Upload
- Drag-and-drop file upload
- Hospital bill & insurance policy upload
- Camera scan option
- Real-time processing status
- Security reassurance messaging

### 📊 Coverage Dashboard
- Visual cost breakdown with pie charts
- Summary cards (total bill, covered, partial, excluded, out-of-pocket)
- Detailed bill items table with coverage status
- Filtering options (covered/partial/excluded)
- Export to PDF functionality
- Dispute detection alerts

### 🧮 Treatment Coverage Simulator
- Estimate treatment costs before hospitalization
- Input: procedure, city, hospital type
- Output: estimated costs, coverage, out-of-pocket
- Risk warnings for coverage issues
- Cost breakdown by item

### 🏥 Hospital Network Search
- Search hospitals by name or specialty
- Filter by city and cashless availability
- Hospital cards with details:
  - Type, rating, distance
  - Specialties, contact info
  - Cashless badge
- Compliance information

### 👨‍👩‍👧‍👦 Family Policy Manager
- Track multiple family members
- Individual coverage tracking
- Coverage utilization visualization
- Coverage gaps detection
- Policy overlap alerts
- Savings tracker

### ⚙️ Profile & Settings
- User profile management
- Notification preferences
- Language selection (English/Hindi/Gujarati)
- Privacy & security settings
- Insurance policy management

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Styling:** Custom CSS with CSS variables
- **Fonts:** Inter (Google Fonts)

## Design System

### Colors
- Primary: Blue (#2563eb)
- Secondary: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)
- Background: Light gray (#f8fafc)

### Typography
- Font Family: Inter
- Headings: 700 weight
- Body: 400-500 weight

### Components
- Rounded cards with subtle shadows
- Clean navigation with icons
- Responsive grid layouts
- Smooth transitions and hover effects
- Mobile-first design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at http://localhost:3000

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
clearcare-healthcare-fintech/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   └── Navbar/
│   │       ├── Navbar.jsx
│   │       └── Navbar.css
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── AuthPages.css
│   │   ├── UploadPage.jsx
│   │   ├── UploadPage.css
│   │   ├── DashboardPage.jsx
│   │   ├── DashboardPage.css
│   │   ├── SimulatorPage.jsx
│   │   ├── SimulatorPage.css
│   │   ├── HospitalSearchPage.jsx
│   │   ├── HospitalSearchPage.css
│   │   ├── FamilyPolicyPage.jsx
│   │   ├── FamilyPolicyPage.css
│   │   ├── ProfilePage.jsx
│   │   └── ProfilePage.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Routes

- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/upload` - Document upload
- `/dashboard` - Coverage breakdown dashboard
- `/simulator` - Treatment cost simulator
- `/hospitals` - Hospital network search
- `/family` - Family policy manager
- `/profile` - User profile & settings

## Key Features for Hackathon

1. **Trust-Focused Design** - Clean UI with security badges and privacy messaging
2. **Visual Clarity** - Charts, cards, and color-coded status indicators
3. **India-Specific** - Multilingual support, INR currency, IRDAI compliance mentions
4. **Mobile-First** - Responsive design works on all devices
5. **User-Friendly** - Simple flows, clear CTAs, minimal complexity
6. **Unique Features** - Treatment simulator, dispute detection, family tracking

## Future Enhancements

- Real OCR integration
- AI-powered policy analysis
- Voice explanations in multiple languages
- AR bill overlay feature
- Integration with actual insurance APIs
- Claim submission workflow
- Chatbot assistance
- Real-time hospital availability

## License

MIT License - Built for hackathon demonstration

## Contact

For questions or demo requests, contact the ClearCare team.

---

**Note:** This is an MVP built for hackathon demonstration. All data is simulated and for demo purposes only.

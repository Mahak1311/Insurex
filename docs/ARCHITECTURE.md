# Insurex Architecture Documentation

## 🏗️ System Architecture Overview

Insurex is a single-page application (SPA) built with React, designed with a modular, scalable architecture that separates concerns and enables easy feature additions.

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│                    (React Components)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Hooks   │  │  Router  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                     Business Logic Layer                     │
│                    (Logic Engines)                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Coverage   │  │ Pre-Hospital │  │   Dispute    │     │
│  │    Engine    │  │    Engine    │  │  Forecaster  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                        Data Layer                            │
│                   (Mock Data / State)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Local State │  │    Mocks     │  │   Future:    │     │
│  │  (useState)  │  │              │  │   Backend    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Component Architecture

### 1. **Page Components** (`src/pages/`)

Full-screen views that represent different routes in the application.

**Structure:**
```
Page Component
├── State Management (useState, useEffect)
├── Business Logic (event handlers)
├── UI Rendering (JSX)
└── Style Import (CSS)
```

**Key Pages:**
- `LandingPage` - Marketing homepage with hero, features, footer
- `DashboardPage` - Coverage analysis with pie charts and tables
- `PreHospitalizationPage` - Cost estimator with Ripple Graph
- `ProfilePage` - User settings and preferences
- `HospitalSearchPage` - Network hospital finder
- `FamilyPolicyPage` - Multi-member coverage tracking

**Example:**
```jsx
function DashboardPage() {
  // State
  const [billData, setBillData] = useState(null)
  const [filter, setFilter] = useState('all')
  
  // Logic
  const analysis = analyzeCoverage(policy, billData)
  
  // Render
  return (
    <Layout>
      <Charts data={analysis} />
      <Table items={analysis.breakdown} />
    </Layout>
  )
}
```

### 2. **Reusable Components** (`src/components/`)

Modular UI elements used across multiple pages.

**Key Components:**

#### **Layout Component**
```
Layout
├── Navbar (sticky header)
├── Main Content (children)
└── Footer (optional)
```

**Responsibilities:**
- Consistent page structure
- Navigation persistence
- Responsive behavior

#### **OutOfPocketRippleGraph**
```
RippleGraph
├── Data Processing (useMemo)
├── Recharts Configuration
├── Custom Tooltip
├── Custom Dot (spikes)
└── Insights Generation
```

**Data Flow:**
```
FormData → Calculate Steps → Generate Colors → Render Graph → Show Insights
```

**Responsibilities:**
- Cost visualization
- Decision impact analysis
- Risk communication

#### **Navbar Component**
```
Navbar
├── Logo/Brand
├── Navigation Links
├── User Profile Menu
└── Mobile Toggle
```

**Responsibilities:**
- Application navigation
- User context display
- Responsive menu

---

## 🔄 Data Flow Architecture

### Pattern: Unidirectional Data Flow

```
User Action
    ↓
Event Handler
    ↓
State Update (setState)
    ↓
Re-render Components
    ↓
Updated UI
```

### Example: Pre-Hospitalization Flow

```
1. User fills form
   └─ onChange → setFormData()

2. User clicks "Generate Guidance"
   └─ onClick → generateGuidance()

3. Generate Guidance processes data
   ├─ Validate inputs
   ├─ Call preHospitalizationEngine()
   └─ Update state with results

4. State update triggers re-render
   ├─ Show cost estimates
   ├─ Render Ripple Graph
   └─ Display insights

5. Ripple Graph receives props
   ├─ Calculate ripple data
   ├─ Generate colors
   └─ Animate transitions
```

---

## 🧠 Business Logic Layer

### 1. **Coverage Engine** (`src/lib/coverageEngine.js`)

Analyzes hospital bills against insurance policy terms.

**Algorithm:**
```javascript
For each bill item:
  1. Check category (room, procedure, diagnostic, etc.)
  2. Apply room rent cap if applicable
  3. Apply co-payment percentage
  4. Check sub-limits
  5. Validate against waiting periods
  6. Calculate covered vs uncovered amounts
  7. Assign status (covered/partial/excluded)
  8. Add dispute potential assessment
```

**Input/Output:**
```
Input:
- Policy details (sum insured, caps, co-payment)
- Bill items (name, amount, category)

Output:
- Breakdown (item-by-item analysis)
- Summary (totals, percentages)
- Dispute flags
```

### 2. **Pre-Hospitalization Engine** (Mock)

Estimates costs before treatment based on multiple factors.

**Calculation Logic:**
```javascript
Base Cost (from procedure)
  ×
Location Multiplier (Metro: 1.3x, Tier 2: 1.1x, Tier 3: 0.9x)
  ×
Hospital Type Multiplier (Private: 1.5x, Trust: 1.2x, Govt: 0.8x)
  ×
Room Type Multiplier (Deluxe: 1.6x, Single: 1.2x, Semi: 1.0x, General: 0.7x)
  =
Final Estimated Cost
```

**Then:**
```javascript
Insurance Coverage = min(Policy Sum Insured, Estimated Cost × Coverage %)
Out-of-Pocket = Estimated Cost - Insurance Coverage
```

### 3. **Dispute Forecaster** (Mock)

Predicts which bill items are disputable and generates action scripts.

**Risk Assessment:**
```javascript
High Risk (>70% success):
- Room rent exceeding cap by <50%
- Pre-approved procedures
- Network hospital charges

Medium Risk (40-70% success):
- Consumables within reasonable limits
- Diagnostic tests prescribed by treating doctor

Low Risk (<40% success):
- Non-medical expenses
- Services outside policy coverage
- Items in exclusion list
```

---

## 🎨 UI/UX Architecture

### Design System

**Color Palette:**
```css
Primary:     #6366f1 (Indigo) - CTAs, links
Secondary:   #8b5cf6 (Purple) - Highlights
Success:     #10b981 (Green) - Covered items
Warning:     #f59e0b (Amber) - Partial coverage
Danger:      #ef4444 (Red) - Excluded items
```

**Typography Scale:**
```
h1: 2.5rem (40px) - Page titles
h2: 2rem (32px) - Section headers
h3: 1.5rem (24px) - Card titles
body: 1rem (16px) - Body text
small: 0.875rem (14px) - Captions
```

**Spacing System:**
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Responsive Breakpoints

```css
/* Mobile First */
Default: < 768px

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large Desktop */
}
```

---

## 🔐 State Management

### Current: Local State (React Hooks)

**Philosophy:** Keep it simple. Use local state until global state is necessary.

**Pattern:**
```jsx
function MyPage() {
  // Page-level state
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Derived state
  const filteredData = useMemo(() => {
    return data?.filter(item => item.active)
  }, [data])
  
  // Effects
  useEffect(() => {
    fetchData()
  }, [])
  
  return <div>{/* UI */}</div>
}
```

**State Location Strategy:**
- **Local state** - UI state (modals, forms, toggles)
- **Lifted state** - Shared between siblings (pass via props)
- **Context** (future) - Truly global state (user auth, theme)

---

## 🚦 Routing Architecture

### React Router v6 Configuration

```jsx
<BrowserRouter>
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    
    {/* Authenticated Routes (with Layout) */}
    <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
    <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
    
    {/* Info Pages (no Layout) */}
    <Route path="/health-insurance-101" element={<HealthInsurance101Page />} />
  </Routes>
</BrowserRouter>
```

**Navigation Pattern:**
```jsx
import { useNavigate, Link } from 'react-router-dom'

// Programmatic navigation
const navigate = useNavigate()
navigate('/dashboard')

// Declarative navigation
<Link to="/profile">Profile</Link>
```

---

## 🎭 Animation Architecture

### Animation Strategy

**Principle:** Animations should enhance UX, not distract.

**Types:**

1. **Micro-interactions**
```css
.button {
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}
```

2. **Page transitions** (future)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

3. **Data visualizations**
```jsx
// Recharts animations
<Area
  animationDuration={800}
  animationEasing="ease-in-out"
/>
```

**Performance:**
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Keep duration < 400ms for UI feedback
- Use `will-change` sparingly

---

## 📦 Module Organization

### Import Order Convention

```jsx
// 1. External libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Internal components
import Layout from '../components/Layout/Layout'
import MyComponent from '../components/MyComponent/MyComponent'

// 3. Logic/utils
import { analyzeCoverage } from '../lib/coverageEngine'

// 4. Assets
import './MyPage.css'
```

### File Naming Conventions

```
Pages:     PascalCase.jsx     (DashboardPage.jsx)
Components: PascalCase.jsx    (OutOfPocketRippleGraph.jsx)
Utils:     camelCase.js       (formatCurrency.js)
Styles:    PascalCase.css     (DashboardPage.css)
```

---

## 🔮 Future Architecture Considerations

### Phase 2: Backend Integration

```
Frontend (React)
    ↓ REST/GraphQL
Backend API (Node.js/Express)
    ↓
Business Logic
    ↓
Database (PostgreSQL)
```

**API Structure:**
```
/api/v1/
  /auth       - Authentication
  /bills      - Bill upload & analysis
  /policies   - Policy management
  /hospitals  - Hospital search
  /users      - User profiles
```

### Phase 3: Advanced Features

1. **Real-time Updates**
```
WebSocket Connection
    ↓
Live claim status updates
Live dispute resolution tracking
```

2. **Machine Learning Integration**
```
Frontend
    ↓
ML Service (Python/FastAPI)
    ↓
Trained Models (TensorFlow/PyTorch)
```

3. **Mobile App**
```
Shared Logic Layer
    ├─ Web (React)
    └─ Mobile (React Native)
```

---

## 🧪 Testing Architecture (Future)

### Testing Pyramid

```
         ┌─────────┐
        ╱  E2E (5%) ╲
       ├─────────────┤
      ╱ Integration   ╲
     ╱   Tests (15%)   ╲
    ├───────────────────┤
   ╱  Unit Tests (80%)   ╲
  └─────────────────────────┘
```

**Unit Tests:** Individual functions, components
**Integration Tests:** Component interactions, logic engines
**E2E Tests:** Full user workflows

---

## 📊 Performance Architecture

### Optimization Strategies

1. **Code Splitting**
```jsx
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
```

2. **Memoization**
```jsx
const expensiveValue = useMemo(() => compute(), [deps])
const memoizedCallback = useCallback(() => handle(), [deps])
```

3. **Virtualization** (future for long lists)
```jsx
<VirtualList items={thousands} />
```

4. **Image Optimization**
- WebP format
- Lazy loading
- Responsive images

---

## 🔒 Security Architecture

### Current Measures

1. **Input Validation**
- Form validation before submission
- Sanitize user inputs

2. **Secure Routing**
- Protected routes (authentication check)
- Authorization checks

3. **Data Privacy**
- No sensitive data in localStorage
- HTTPS in production
- DPDP Act 2023 compliance

### Future Enhancements

- JWT authentication
- CSRF protection
- Rate limiting
- Input sanitization library
- Security headers
- Regular dependency audits

---

## 📈 Scalability Considerations

### Current Limits
- Single-page app (client-side only)
- Mock data (no persistence)
- No user sessions

### Scaling Plan

**Horizontal:**
- CDN for static assets
- Load balancer for API
- Database replication

**Vertical:**
- Code splitting for faster loads
- Server-side rendering for SEO
- Caching strategies

---

## 🛠️ Development Tools

### Build System
- **Vite** - Fast dev server, optimized builds
- **ES Modules** - Modern JavaScript
- **HMR** - Hot Module Replacement

### Code Quality
- **ESLint** (future) - Code linting
- **Prettier** (future) - Code formatting
- **Husky** (future) - Git hooks

---

## 📝 Architecture Decision Records

### ADR-001: Why React?
- **Decision:** Use React for frontend
- **Rationale:** 
  - Large ecosystem
  - Component reusability
  - Virtual DOM performance
  - Team familiarity
- **Alternatives:** Vue, Angular
- **Status:** Accepted

### ADR-002: Why Vite over Create React App?
- **Decision:** Use Vite as build tool
- **Rationale:**
  - Faster dev server (esbuild)
  - Faster HMR
  - Smaller bundle sizes
  - Modern tooling
- **Alternatives:** CRA, Next.js
- **Status:** Accepted

### ADR-003: Why Local State over Redux?
- **Decision:** Use React hooks for state management
- **Rationale:**
  - Simpler for MVP
  - Less boilerplate
  - Adequate for current scale
  - Can migrate later if needed
- **Alternatives:** Redux, MobX, Zustand
- **Status:** Accepted (may revisit in Phase 2)

### ADR-004: Why Recharts for graphs?
- **Decision:** Use Recharts for data visualization
- **Rationale:**
  - React-first library
  - Composable components
  - Good animation support
  - TypeScript support
- **Alternatives:** Chart.js, D3, Victory
- **Status:** Accepted

---

## 🎯 Architecture Goals

1. **Maintainability** - Easy to understand and modify
2. **Scalability** - Can handle growth
3. **Performance** - Fast load and interaction times
4. **Modularity** - Components are independent
5. **Testability** - Easy to write tests (future)
6. **Accessibility** - Usable by everyone

---

## 📚 Further Reading

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router Docs](https://reactrouter.com)
- [Recharts Documentation](https://recharts.org)
- [Web.dev Performance](https://web.dev/performance/)

---

Last Updated: January 2026  
Maintainers: Insurex Development Team

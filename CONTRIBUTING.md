# Contributing to Insurex

Thank you for considering contributing to Insurex! We're building a platform that makes healthcare insurance transparent for every Indian family, and we'd love your help.

## 🎯 How Can You Contribute?

### 1. **Report Bugs**
Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information

### 2. **Suggest Features**
Have an idea? Open an issue with:
- Clear feature description
- Use case/problem it solves
- Proposed implementation (optional)

### 3. **Submit Code**
Want to fix a bug or add a feature? Follow the process below.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git
- Code editor (VS Code recommended)

### Fork & Clone

1. Fork the repository on GitHub
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/insurex.git
cd insurex
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/insurex.git
```

### Setup Development Environment

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Open browser at `http://localhost:3004`

---

## 📝 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - Code style changes

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Keep commits focused and atomic

### 3. Commit Changes

Write clear commit messages:

```bash
git add .
git commit -m "feat: add ripple graph animation"
```

**Commit message format:**
```
<type>: <subject>

<body> (optional)

<footer> (optional)
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```
feat: add out-of-pocket ripple graph visualization
fix: resolve room rent cap calculation error
docs: update README with API documentation
refactor: extract coverage logic into separate module
```

### 4. Push Changes

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template with:
   - Description of changes
   - Related issue number (if any)
   - Screenshots (for UI changes)
   - Testing done
   - Checklist completion

---

## ✅ Code Style Guidelines

### JavaScript/React

1. **Use Functional Components**
```jsx
// ✅ Good
function MyComponent() {
  return <div>Hello</div>
}

// ❌ Avoid
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>
  }
}
```

2. **Use Hooks**
```jsx
// State management
const [count, setCount] = useState(0)

// Side effects
useEffect(() => {
  // Effect logic
}, [dependencies])

// Memoization
const memoizedValue = useMemo(() => computeValue(), [deps])
```

3. **Destructure Props**
```jsx
// ✅ Good
function MyComponent({ name, age }) {
  return <div>{name} - {age}</div>
}

// ❌ Avoid
function MyComponent(props) {
  return <div>{props.name} - {props.age}</div>
}
```

4. **Use PropTypes or JSDoc**
```jsx
/**
 * @param {Object} props
 * @param {string} props.name - User name
 * @param {number} props.age - User age
 */
function MyComponent({ name, age }) {
  // ...
}
```

5. **Component File Structure**
```jsx
// 1. Imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyComponent.css'

// 2. Constants
const MAX_ITEMS = 10

// 3. Helper functions
function formatDate(date) {
  // ...
}

// 4. Main component
function MyComponent() {
  // State
  const [data, setData] = useState([])
  
  // Hooks
  const navigate = useNavigate()
  
  // Effects
  useEffect(() => {
    // ...
  }, [])
  
  // Event handlers
  const handleClick = () => {
    // ...
  }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 5. Export
export default MyComponent
```

### CSS

1. **Use BEM naming convention**
```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }

/* Modifier */
.card--highlighted { }
.card__header--large { }
```

2. **Use CSS Variables**
```css
/* Define in :root */
:root {
  --color-primary: #6366f1;
  --spacing-md: 1rem;
}

/* Use in components */
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}
```

3. **Mobile-First Approach**
```css
/* Base styles for mobile */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### File Naming

- Components: `PascalCase.jsx` (e.g., `MyComponent.jsx`)
- Styles: `PascalCase.css` (e.g., `MyComponent.css`)
- Utils/Helpers: `camelCase.js` (e.g., `formatDate.js`)
- Constants: `UPPER_SNAKE_CASE.js` (e.g., `API_ENDPOINTS.js`)

---

## 🧪 Testing Checklist

Before submitting a PR, ensure:

### Functionality
- [ ] Feature works as expected
- [ ] No console errors or warnings
- [ ] No broken functionality in other parts of the app
- [ ] Edge cases handled (empty states, errors, etc.)

### Responsiveness
- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Landscape orientation

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG standards
- [ ] Alt text for images
- [ ] Semantic HTML used

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Smooth animations (60fps)
- [ ] Fast load times

---

## 📁 Project Structure

When adding new files, follow this structure:

```
src/
├── components/          # Reusable UI components
│   ├── ComponentName/
│   │   ├── ComponentName.jsx
│   │   └── ComponentName.css
│
├── pages/              # Page components
│   ├── PageName.jsx
│   └── PageName.css
│
├── lib/                # Business logic, utilities
│   ├── engineName.js
│   └── helperName.js
│
├── hooks/              # Custom hooks (if needed)
│   └── useCustomHook.js
│
├── constants/          # Constants, configs
│   └── config.js
│
└── assets/             # Static assets
    ├── images/
    └── icons/
```

---

## 🐛 Common Issues & Solutions

### Issue: Dev server not starting
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Changes not reflecting
**Solution:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear Vite cache: Delete `.vite` folder

### Issue: Import errors
**Solution:**
- Check file path is correct
- Verify file exists
- Use absolute paths from `src/`

---

## 💬 Communication

### Asking Questions
- Open a GitHub Discussion
- Comment on related issues
- Tag maintainers if urgent

### Reporting Security Issues
- **DO NOT** open public issues
- Email: security@insurex.in
- We'll respond within 48 hours

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project documentation

---

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
**Positive behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior:**
- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Enforcement
Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to: conduct@insurex.in

---

## 📋 Pull Request Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots
(If applicable)

## Testing Done
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested on different browsers
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Responsive on all devices
```

---

## 🎓 Learning Resources

### React
- [React Official Docs](https://react.dev)
- [React Router](https://reactrouter.com)

### CSS
- [CSS Tricks](https://css-tricks.com)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Git
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

---

## 🙏 Thank You!

Your contributions make Insurex better for everyone. Whether you're fixing a typo, adding a feature, or improving documentation, every contribution matters.

Happy coding! 🚀

---

**Questions?** Open a discussion or email: contribute@insurex.in

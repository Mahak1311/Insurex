# 🎯 Pre-Hospitalization Feature - Quick Demo Guide

## How to Access

### Option 1: From Navbar
1. Look for the **"Pre-Hosp"** link in the navigation bar (Heart icon)
2. Click to access the feature directly

### Option 2: From Dashboard
1. Navigate to the Dashboard page
2. You'll see a prominent gradient banner at the top:
   - **"Planning a procedure?"**
   - **"Get cost estimates and coverage clarity BEFORE treatment begins"**
3. Click **"Check Coverage Now"** button

## Demo Walkthrough

### Step 1: Enter Treatment Details

Fill in the form fields:

**Basic Information:**
- **Medical Procedure**: Select from dropdown (e.g., "Knee Replacement")
- **Hospital Pincode**: Enter 6-digit pincode (e.g., "110001" for Delhi)
- **Hospital Type**: Choose Network/Non-Network/Government

**Room Preferences:**
- **Preferred Room Type**: Select room category
- **Room Rent Cap**: Enter daily cap from your policy (or 0 if no cap)

**Policy Details:**
- **Sum Insured**: Your total policy coverage (default: ₹5,00,000)
- **Co-Payment**: Enter % if applicable (or 0)
- **Sub-Limits**: Enter comma-separated items (e.g., "stents, implants")

### Step 2: View Real-Time Insights

As you fill the form, insights appear automatically (800ms after you stop typing):

#### Cost Estimate Cards (3 Main Cards)
1. **Total Estimated Cost** (Purple gradient)
   - Shows full treatment cost
   - Expected duration in days

2. **Insurance Coverage** (Green gradient)
   - Amount your insurance will cover
   - Coverage percentage

3. **Your Out-of-Pocket** (Pink/Orange gradient)
   - Your expected expense
   - Percentage of total cost
   - Color changes based on risk level

#### Cost Breakdown
Detailed breakdown of:
- Room charges
- Procedure cost
- Consumables
- Diagnostics
- Other charges

### Step 3: Review Warnings & Recommendations

#### ⚠️ Important Warnings (Red/Orange Cards)
Examples of warnings you might see:
- **Room Rent Cap Alert**: When room choice exceeds policy cap
- **Sub-Limit Detected**: When procedure has coverage restrictions
- **Co-Payment Required**: Your co-pay amount
- **Non-Network Hospital**: Risks of choosing non-network
- **Sum Insured Alert**: When costs approach policy limit

#### 💡 Coverage Insights (Blue Cards)
General information about:
- Risk assessment (Low/Medium/High)
- Location impact on costs
- Understanding sub-limits
- High consumables procedures

#### ✅ Recommendations (Green Cards)
Actionable suggestions:
- Room type recommendations to save money
- Network hospital suggestions
- Pre-authorization tips
- Next steps guidance

### Step 4: Take Action

At the bottom, you'll find action buttons:
- **Print Estimate**: Generate a printable report
- **Start New Estimate**: Clear form for new calculation

## Sample Test Cases

### Test Case 1: Low Risk
- Procedure: Appendectomy
- Pincode: 226001 (Tier-2 city)
- Hospital: Network
- Room: Semi-Private
- Sum Insured: ₹5,00,000
- Room Cap: 0 (No cap)
- Co-Pay: 0%

**Expected**: Low out-of-pocket, mostly green insights

### Test Case 2: High Risk
- Procedure: Knee Replacement
- Pincode: 110001 (Metro - Delhi)
- Hospital: Non-Network
- Room: Private
- Sum Insured: ₹3,00,000
- Room Cap: ₹3,000/day
- Co-Pay: 20%
- Sub-Limits: "joint replacement, implants"

**Expected**: High warnings, significant out-of-pocket estimate, multiple recommendations

### Test Case 3: Balanced
- Procedure: Cataract Surgery
- Pincode: 560001 (Bangalore)
- Hospital: Network
- Room: Semi-Private
- Sum Insured: ₹5,00,000
- Room Cap: ₹5,000/day
- Co-Pay: 10%

**Expected**: Moderate warnings, reasonable costs, some recommendations

## Key Features to Highlight

### 1. Real-Time Updates
- No "Calculate" button needed
- Results update as you type (with debounce)
- Instant feedback on decision impact

### 2. Color-Coded Risk Levels
- **Green**: Low risk, good coverage
- **Orange**: Medium risk, review carefully
- **Red**: High risk, consider alternatives

### 3. Supportive Tone
- Never alarming or fear-inducing
- Empowering language
- Actionable recommendations
- Patient-first approach

### 4. Proactive Guidance
- Prevents billing surprises
- Enables informed decisions
- Encourages pre-authorization
- Highlights cost-saving opportunities

### 5. Mobile Responsive
- Works on all screen sizes
- Touch-friendly interface
- Readable on mobile devices

## Tips for Best Results

1. **Be Accurate**: Enter exact policy details for best estimates
2. **Check Sub-Limits**: Review your policy document for specific sub-limits
3. **Compare Scenarios**: Try different room types to see cost impact
4. **Share with Provider**: Print and share estimate with insurance company
5. **Get Pre-Auth**: Always get pre-authorization before admission

## Important Notes

- Estimates are indicative, based on typical costs
- Actual costs may vary by hospital
- Always verify coverage with your insurer
- This tool uses mock data for demonstration
- In production, would connect to real pricing APIs

## Troubleshooting

**Q: I don't see results after entering details**
A: Ensure you've filled in at least: Procedure, Pincode, and Hospital Type

**Q: The estimates seem high/low**
A: Costs vary significantly by location and hospital. Use as a starting point.

**Q: Can I save my estimates?**
A: Currently, use the Print button. Future versions will include save functionality.

**Q: How accurate are the sub-limit warnings?**
A: Based on common sub-limits. Always check your specific policy document.

---

**Ready to try it?** Navigate to `/pre-hospitalization` or use the dashboard banner!

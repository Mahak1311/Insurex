import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './OutOfPocketRippleGraph.css'

const OutOfPocketRippleGraph = ({ formData, estimatedCost, coveredAmount }) => {
  // Calculate out-of-pocket at each decision point
  const rippleData = useMemo(() => {
    if (!estimatedCost || !formData.procedure) return []

    const baseCost = estimatedCost
    const data = []

    // Step 1: Base procedure cost
    const procedureCost = baseCost * 0.3 // Assume 30% base out-of-pocket
    data.push({
      step: 'Procedure',
      label: formData.procedure || 'Selected',
      amount: Math.round(procedureCost),
      explanation: `Base out-of-pocket for ${formData.procedure}`,
      phase: 1
    })

    // Step 2: Location impact
    let locationMultiplier = 1
    if (formData.location === 'Metro (Tier 1)') locationMultiplier = 1.3
    else if (formData.location === 'Tier 2 City') locationMultiplier = 1.1
    else if (formData.location === 'Tier 3 City') locationMultiplier = 0.9

    const locationCost = procedureCost * locationMultiplier
    data.push({
      step: 'Location',
      label: formData.location || 'City',
      amount: Math.round(locationCost),
      explanation: formData.location === 'Metro (Tier 1)' 
        ? '⬆ Metro pricing increases costs'
        : formData.location === 'Tier 3 City'
        ? '⬇ Tier 3 reduces costs'
        : '→ Standard tier 2 pricing',
      phase: 2
    })

    // Step 3: Hospital type impact
    let hospitalMultiplier = locationMultiplier
    if (formData.hospitalType === 'Private') {
      hospitalMultiplier *= 1.5
    } else if (formData.hospitalType === 'Government') {
      hospitalMultiplier *= 0.6
    } else {
      hospitalMultiplier *= 1.2
    }

    const hospitalCost = procedureCost * hospitalMultiplier
    data.push({
      step: 'Hospital Type',
      label: formData.hospitalType || 'Type',
      amount: Math.round(hospitalCost),
      explanation: formData.hospitalType === 'Private'
        ? '⬆ Private hospital premium'
        : formData.hospitalType === 'Government'
        ? '⬇ Government subsidy'
        : '→ Trust pricing',
      phase: 3
    })

    // Step 4: Room type impact (major factor)
    let roomMultiplier = hospitalMultiplier
    const roomExceedsCap = formData.roomType && 
      (formData.roomType === 'Deluxe Room' || formData.roomType === 'Private Suite')

    if (roomExceedsCap) {
      roomMultiplier *= 1.8 // Significant jump if exceeds policy cap
    } else if (formData.roomType === 'Single AC Room') {
      roomMultiplier *= 1.2
    } else if (formData.roomType === 'General Ward') {
      roomMultiplier *= 0.8
    }

    const roomCost = procedureCost * roomMultiplier
    data.push({
      step: 'Room Type',
      label: formData.roomType || 'Room',
      amount: Math.round(roomCost),
      explanation: roomExceedsCap
        ? '🚨 Room rent exceeds policy cap! Proportionate deduction applied'
        : formData.roomType === 'General Ward'
        ? '⬇ Economical room choice'
        : '→ Standard room rate',
      phase: 4,
      spike: roomExceedsCap
    })

    // Step 5: Final out-of-pocket (with insurance coverage)
    const finalOutOfPocket = estimatedCost - coveredAmount
    data.push({
      step: 'Final Cost',
      label: 'Your Share',
      amount: Math.round(finalOutOfPocket),
      explanation: `After insurance coverage of ₹${coveredAmount.toLocaleString()}`,
      phase: 5,
      isFinal: true
    })

    return data
  }, [formData, estimatedCost, coveredAmount])

  // Determine color based on amount
  const getColor = (amount) => {
    if (!amount) return '#10b981' // green
    if (amount < 20000) return '#10b981' // green
    if (amount < 50000) return '#f59e0b' // yellow
    if (amount < 100000) return '#f97316' // orange
    return '#ef4444' // red
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="ripple-tooltip">
          <div className="tooltip-header">
            <strong>{data.step}</strong>
            {data.spike && <span className="spike-badge">⚠️ SPIKE</span>}
          </div>
          <div className="tooltip-amount">₹{data.amount.toLocaleString()}</div>
          <div className="tooltip-explanation">{data.explanation}</div>
          {data.isFinal && (
            <div className="tooltip-final">This is your estimated out-of-pocket cost</div>
          )}
        </div>
      )
    }
    return null
  }

  // Custom dot
  const CustomDot = (props) => {
    const { cx, cy, payload } = props
    if (payload.spike) {
      return (
        <g>
          <circle 
            cx={cx} 
            cy={cy} 
            r={8} 
            fill="#ef4444" 
            stroke="#fff" 
            strokeWidth={2}
            className="spike-dot"
          />
          <circle 
            cx={cx} 
            cy={cy} 
            r={12} 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth={2}
            opacity={0.4}
            className="spike-pulse"
          />
        </g>
      )
    }
    if (payload.isFinal) {
      return (
        <circle 
          cx={cx} 
          cy={cy} 
          r={6} 
          fill="#3b82f6" 
          stroke="#fff" 
          strokeWidth={2}
        />
      )
    }
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill={getColor(payload.amount)} 
        stroke="#fff" 
        strokeWidth={1}
      />
    )
  }

  if (rippleData.length === 0) {
    return (
      <div className="ripple-graph-empty">
        <p>👆 Select a procedure to see the cost ripple effect</p>
      </div>
    )
  }

  const maxAmount = Math.max(...rippleData.map(d => d.amount))
  const currentColor = getColor(rippleData[rippleData.length - 1]?.amount)

  return (
    <div className="ripple-graph-container">
      <div className="ripple-header">
        <h3>💸 Out-of-Pocket Ripple Effect</h3>
        <div className="ripple-legend">
          <div className="legend-item">
            <div className="legend-dot green"></div>
            <span>&lt; ₹20k</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot yellow"></div>
            <span>₹20k-50k</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot orange"></div>
            <span>₹50k-1L</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot red"></div>
            <span>&gt; ₹1L</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart 
          data={rippleData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={currentColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={currentColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="step" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            domain={[0, maxAmount * 1.1]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={currentColor}
            strokeWidth={3}
            fill="url(#colorAmount)"
            fillOpacity={1}
            animationDuration={800}
            animationEasing="ease-in-out"
            dot={<CustomDot />}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="ripple-insights">
        {rippleData.some(d => d.spike) && (
          <div className="insight-alert danger">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Cost Spike Detected!</strong>
              <p>Room rent exceeds your policy cap. Consider a lower room category to reduce costs.</p>
            </div>
          </div>
        )}
        {rippleData[rippleData.length - 1]?.amount > 100000 && (
          <div className="insight-alert warning">
            <span className="alert-icon">💡</span>
            <div>
              <strong>High Out-of-Pocket Cost</strong>
              <p>Consider government/trust hospitals or lower room categories to reduce your burden.</p>
            </div>
          </div>
        )}
        {rippleData[rippleData.length - 1]?.amount < 20000 && (
          <div className="insight-alert success">
            <span className="alert-icon">✅</span>
            <div>
              <strong>Excellent Choice!</strong>
              <p>Your selections minimize out-of-pocket expenses while maintaining quality care.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutOfPocketRippleGraph

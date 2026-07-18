import React from 'react'
import '../styles/ActivityCard.css'

export default function ActivityCard({ icon, title, value, unit, color }) {
  return (
    <div className="activity-card" style={{ borderTopColor: color || '#16a888' }}>
      <div className="activity-icon" style={{ background: color || '#16a888' }}>
        {icon}
      </div>
      <div className="activity-info">
        <span className="activity-value">
          {value} <small>{unit}</small>
        </span>
        <span className="activity-title">{title}</span>
      </div>
    </div>
  )
}

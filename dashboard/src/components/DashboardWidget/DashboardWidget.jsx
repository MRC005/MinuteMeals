import React from 'react'
import './DashboardWidget.css'

export default function DashboardWidget({ icon, label, value, color, bg }) {
  return (
    <div className="dashboard-widget" style={{ background: bg, boxShadow: `0 4px 24px ${color}22` }}>
      <div className="widget-icon" style={{ color, background: `${color}18` }}>
        {icon}
      </div>
      <div className="widget-info">
        <div className="widget-label">{label}</div>
        <div className="widget-value">{value}</div>
      </div>
    </div>
  )
}

import React from 'react'

export default function DashboardWidget({ icon, label, value, color, bg }) {
  return (
    <div style={{
      minWidth: 180,
      minHeight: 100,
      background: bg,
      borderRadius: 14,
      boxShadow: '0 4px 16px rgba(127,63,247,0.07)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '18px 24px'
    }}>
      <div style={{ fontSize: 32, color }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: 16, color: '#444' }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 22, color }}>{value}</div>
    </div>
  )
}

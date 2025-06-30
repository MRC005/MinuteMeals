import React, { useEffect, useState } from 'react'
import DashboardWidget from '../../components/DashboardWidget/DashboardWidget'
import RecentOrders from '../../components/RecentOrders/RecentOrders'
import { FaShoppingCart, FaUser, FaStore, FaRupeeSign } from 'react-icons/fa'
import axios from 'axios'

export default function DashboardHome() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({
    ordersToday: 0,
    activeUsers: 0,
    restaurants: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          axios.get('https://your-backend-url/api/dashboard-stats'),
          axios.get('https://your-backend-url/api/orders/recent'),
        ])
        setStats(statsRes.data)
        setOrders(ordersRes.data)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        margin: '32px 0',
        justifyContent: 'flex-start'
      }}>
        <DashboardWidget
          icon={<FaShoppingCart />}
          label="Orders Today"
          value={loading ? '...' : stats.ordersToday}
          color="#7F3FF7"
          bg="linear-gradient(120deg, #f7f3ff 60%, #fff 100%)"
        />
        <DashboardWidget
          icon={<FaUser />}
          label="Active Users"
          value={loading ? '...' : stats.activeUsers}
          color="#00b894"
          bg="linear-gradient(120deg, #e0ffe8 60%, #fff 100%)"
        />
        <DashboardWidget
          icon={<FaStore />}
          label="Restaurants"
          value={loading ? '...' : stats.restaurants}
          color="#fd7e14"
          bg="linear-gradient(120deg, #fff6e0 60%, #fff 100%)"
        />
        <DashboardWidget
          icon={<FaRupeeSign />}
          label="Revenue"
          value={loading ? '...' : `₹${stats.revenue}`}
          color="#e17055"
          bg="linear-gradient(120deg, #ffe7e0 60%, #fff 100%)"
        />
      </div>
      <RecentOrders orders={loading ? [] : orders} />
      {loading && <div style={{ color: '#888', marginTop: 24 }}>Loading dashboard data...</div>}
    </div>
  )
}

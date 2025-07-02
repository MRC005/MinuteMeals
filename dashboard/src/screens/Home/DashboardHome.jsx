import React, { useEffect, useState } from 'react'
import DashboardWidget from '../../components/DashboardWidget/DashboardWidget'
import RecentOrders from '../../components/RecentOrders/RecentOrders'
import { FaShoppingCart, FaUser, FaStore, FaRupeeSign } from 'react-icons/fa'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function DashboardHome() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({
    ordersToday: 0,
    activeUsers: 0,
    restaurants: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setStats({ ordersToday: 0, activeUsers: 0, restaurants: 0, revenue: 0 });
          setOrders([]);
          setLoading(false);
          return;
        }
        const [statsRes, ordersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/dashboard/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/order/list`)
        ]);
        if (statsRes.data.success) setStats(statsRes.data.data);
        if (ordersRes.data.success) setOrders(ordersRes.data.data);
      } catch (err) {
        setStats({ ordersToday: 0, activeUsers: 0, restaurants: 0, revenue: 0 });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
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

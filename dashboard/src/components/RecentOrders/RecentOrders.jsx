import React from 'react'
import './RecentOrders.css'

export default function RecentOrders({ orders }) {
  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>User</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </td>
              <td>₹{order.total}</td>
              <td>
                {order.status !== 'Delivered' && (
                  <button className="mark-btn">Mark Delivered</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

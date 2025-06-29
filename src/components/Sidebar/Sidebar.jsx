import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to="/add" className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}>
          <img src={assets.add_icon} alt="Add" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}>
          <img src={assets.list_icon} alt="List" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => "sidebar-option" + (isActive ? " active" : "")}>
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

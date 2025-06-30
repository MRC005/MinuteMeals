import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import DashboardHome from './screens/Home/DashboardHome'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const url = 'https://foodprep.onrender.com'

const App = () => (
  <div className='app'>
    <ToastContainer />
    <Navbar />
    <hr />
    <div className="app-content">
      <Sidebar />
      <Routes>
        <Route path='/' element={<DashboardHome />} />         
        <Route path='/add' element={<Add url={url} />} />      
        <Route path='/list' element={<List url={url} />} />
        <Route path='/orders' element={<Orders url={url} />} />
      </Routes>
    </div>
  </div>
)

export default App

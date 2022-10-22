import React from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import AddSiswa from './pages/AddSiswa'
import ListSiswa from './pages/ListSiswa'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Login</h1>} />

      <Route path='/dashboard' element={<Dashboard />} >
        <Route index element={<ListSiswa />} />
        <Route path='/dashboard/add' element={<AddSiswa />} />
      </Route>
      
      <Route path='*' element={<h1>404 Page Not Found</h1>} />
    </Routes>
  )
}

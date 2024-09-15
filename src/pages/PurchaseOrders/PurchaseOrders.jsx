import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Import Components
import OrdersList from '../../components/OrdersList/OrdersList'

const PurchaseOrders = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<OrdersList />} />
      </Routes>
    </>
  )
}

export default PurchaseOrders
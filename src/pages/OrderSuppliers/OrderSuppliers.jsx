import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Import Components
import OrdersList from '../../components/OrdersList/OrdersList'
import CreateOrder from '../../components/CreateOrder/CreateOrder'

const OrderSuppliers = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<OrdersList />} />
        <Route path='/create' element={<CreateOrder />} />
      </Routes>
    </>
  )
}

export default OrderSuppliers
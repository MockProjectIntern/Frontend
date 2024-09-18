import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupplierList from '../../components/SupplierList/SupplierList'

const Suppliers = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SupplierList />} />
      </Routes>
    </>
  )
}

export default Suppliers
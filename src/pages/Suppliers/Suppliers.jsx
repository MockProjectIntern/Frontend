import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupplierList from '../../components/SupplierList/SupplierList'
import CreateSupplier from '../../components/CreateSupplier/CreateSupplier'

const Suppliers = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SupplierList />} />
        <Route path='/create' element={<CreateSupplier />} />
      </Routes>
    </>
  )
}

export default Suppliers
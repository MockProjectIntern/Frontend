import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentVouchersList from '../../components/PaymentVouchersList/PaymentVouchersList'

const PaymentVouchers = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<PaymentVouchersList />} />
      </Routes>
    </>
  )
}

export default PaymentVouchers
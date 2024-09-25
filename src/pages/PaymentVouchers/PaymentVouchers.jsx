import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentVouchersList from '../../components/PaymentVouchersList/PaymentVouchersList'
import CreatePaymentVoucher from '../../components/CreatePaymentVoucher/CreatePaymentVoucher'

const PaymentVouchers = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<PaymentVouchersList />} />
        <Route path='/create' element={<CreatePaymentVoucher />} />
      </Routes>
    </>
  )
}

export default PaymentVouchers
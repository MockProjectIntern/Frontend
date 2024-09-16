import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReceiptVouchersList from '../../components/ReceiptVouchersList/ReceiptVouchersList'

const ReceiptVouchers = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<ReceiptVouchersList />} />
        </Routes>
    </>
  )
}

export default ReceiptVouchers
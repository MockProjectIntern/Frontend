import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReceiptVouchersList from '../../components/ReceiptVouchersList/ReceiptVouchersList'
import CreateReceiptVoucher from '../../components/CreateReceiptVoucher/CreateReceiptVoucher'

const ReceiptVouchers = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<ReceiptVouchersList />} />
            <Route path='/create' element={<CreateReceiptVoucher />} />
        </Routes>
    </>
  )
}

export default ReceiptVouchers
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GRNList from '../../components/GRNList/GRNList'
import CreateGRN from '../../components/CreateGRN/CreateGRN'
import GRNDetails from '../../components/GRNDetails/GRNDetails'


const GRNPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GRNList />} />
        <Route path='/create' element={<CreateGRN />} />
        <Route path='/GRN/:grnId' element={<GRNDetails />} />
      </Routes>
    </>
  )
}

export default GRNPage
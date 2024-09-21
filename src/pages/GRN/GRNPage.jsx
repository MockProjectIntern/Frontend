import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GRNList from '../../components/GRNList/GRNList'
import CreateGRN from '../../components/CreateGRN/CreateGRN'


const GRNPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GRNList />} />
        <Route path='/create' element={<CreateGRN />} />
      </Routes>
    </>
  )
}

export default GRNPage
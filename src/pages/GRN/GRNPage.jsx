import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GRNList from '../../components/GRNList/GRNList'


const GRNPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GRNList />} />
      </Routes>
    </>
  )
}

export default GRNPage
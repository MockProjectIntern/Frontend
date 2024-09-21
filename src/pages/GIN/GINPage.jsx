import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GINList from '../../components/GINList/GINList'


const GINPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GINList />} />
      </Routes>
    </>
  )
}

export default GINPage
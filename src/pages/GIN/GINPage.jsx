import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GINList from '../../components/GINList/GINList'
import CreateGIN from '../../components/CreateGIN/CreateGIN'


const GINPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GINList />} />
        <Route path='/create' element={<CreateGIN/>}/>
      </Routes>
    </>
  )
}

export default GINPage
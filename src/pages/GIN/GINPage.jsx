import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GINList from '../../components/GINList/GINList'
import CreateGIN from '../../components/CreateGIN/CreateGIN'
import GINDetail from '../../components/GINDetail/GINDetail'


const GINPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GINList />} />
        <Route path='/create' element={<CreateGIN/>}/>
        <Route path = '/GIN/:ginId' element={<GINDetail/>}/>
      </Routes>
    </>
  )
}

export default GINPage
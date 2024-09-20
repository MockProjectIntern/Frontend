import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VariantList from '../../components/Variant/VariantList'
const Variants = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<VariantList />}/>
      </Routes>
    </>
  )
}

export default Variants
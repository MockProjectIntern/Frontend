import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductsList from '../../components/ProductsList/ProducstList'

const Products = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<ProductsList />}/>
      </Routes>
    </>
  )
}

export default Products
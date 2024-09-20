import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../../components/Product/ProductList'

const Products = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<ProductList />}/>
      </Routes>
    </>
  )
}

export default Products
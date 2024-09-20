import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../../components/Product/ProductList'
import CreateProduct from '../../components/Product/CreateProduct'

const Products = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<ProductList />}/>
        <Route path='/create' element = {<CreateProduct />}/>
      </Routes>
    </>
  )
}

export default Products
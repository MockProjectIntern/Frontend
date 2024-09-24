import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductsList from '../../components/ProductsList/ProducstList'
import CreateProduct from '../../components/CreateProduct/CreateProduct'

const Products = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<ProductsList />}/>
        <Route path='/create' element={<CreateProduct />} />
      </Routes>
    </>
  )
}

export default Products
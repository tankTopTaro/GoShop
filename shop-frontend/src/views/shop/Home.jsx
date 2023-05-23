import React from 'react'
import { Carousel } from './home/Carousel'
import { Featured } from './home/Featured'
import { Offer } from './home/Offer'
import { FeaturedProducts } from './home/FeaturedProducts'
import FetchProduct from "../../data/FetchProduct"

export const Home = () => {
  const { products, loading, error } = FetchProduct('/products')

  { loading && <div>Loading...</div> }
  { error && <div>Error: {error}</div> }

  return (
    <div className='animate fadeIn'>
      <Carousel />
      <Featured />
      <FeaturedProducts data={products}/>
      <Offer />
    </div>
  )
}

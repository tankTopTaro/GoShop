import React from 'react'
import Product from '../products/Product'

export const FeaturedProducts = ({ data }) => {
  return (
    <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <div className="row px-xl-5">
            <Product data={data} maxLength={6} />
        </div>
    </div>
  )
}

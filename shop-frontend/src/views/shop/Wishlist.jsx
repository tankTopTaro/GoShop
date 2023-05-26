import React, { useContext } from "react";
import FetchProduct from "../../data/FetchProduct";
import { ShopContext } from "../../contexts/ShopContext";
import WishlistItem from "./cart/WishlistItem";

export default function Wishlist() {
    const { products, loading, error } = FetchProduct('/products')
    const { likeItems } = useContext(ShopContext)

    return (
        <div className="container-fluid">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">My Wishlist</span>
            </h2>
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-light table-borderless table-hover text-center mb-0">
                        <thead className="thead-dark">
                            <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {products.map((product) => {
                                if (likeItems[product.id] !== false) {
                                    return <WishlistItem key={product.id} data={product} />
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
    )
}

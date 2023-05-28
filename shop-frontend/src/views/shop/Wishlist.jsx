import React, { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import WishlistItem from "./cart/WishlistItem";

export default function Wishlist() {
    const { wishlistedItem, wishlistItems, cartItem } = useContext(ShopContext)

    console.log(cartItem)

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
                                <th className="text-center">Products</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                        {cartItem.map((item) => {
                                if(item.is_wishlisted !== 0) {
                                    return <WishlistItem key={item.product_id} data={item} />
                                }
                                return null
                            })}
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
    )
}

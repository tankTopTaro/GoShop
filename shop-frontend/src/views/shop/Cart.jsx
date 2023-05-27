import React, { useContext } from "react";
import FetchProduct from "../../data/FetchProduct";
import { ShopContext } from "../../contexts/ShopContext";
import CartItem from "./cart/CartItem";
import FetchCart from "../../data/FetchCart";

export default function Cart() {
    const { products, loading, error } = FetchProduct('/products')
    const { cartItems, getTotalCartAmount } = useContext(ShopContext)
    
    { loading && <div>Loading...</div> }
    { error && <div>Error: {error}</div> }

    const { cart } = FetchCart()

    const totalAmount = getTotalCartAmount(cart)

    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-light table-borderless table-hover text-center mb-0">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center">Products</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {cart.map((item) => {
                                if(cartItems[item.id] !== 0) {
                                    return <CartItem key={item.id} data={item} />
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-4">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pr-3">Cart Summary</span>
                    </h5>
                    <div className="bg-light p-30 mb-5">
                        { totalAmount > 0 ? 
                            <div className="border-bottom pt-2">
                                <div className="d-flex justify-content-between mt-3">
                                    <h5>Subtotal</h5>
                                    <h5>$ {Number(totalAmount).toFixed(2)}</h5>
                                </div>
                                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed to Checkout</button>
                            </div> : <h1>Your Cart is Empty</h1> }
                    </div>
                </div>
            </div>
        </div>
    )
}

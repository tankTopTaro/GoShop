import React from "react";

export default function Cart() {
    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-light table-borderless table-hover text-center mb-0">
                        <thead className="thead-dark">
                            <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            Cart item
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-4">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pr-3">Cart Summary</span>
                    </h5>
                    <div className="bg-light p-30 mb-5">
                        <div className="border-bottom pt-2">
                            <div className="d-flex justify-content-between mt-3">
                                <h5>Subtotal</h5>
                                <h5>$ 0.00</h5>
                            </div>
                            <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed to Checkout</button>
                        </div>
                        <h1>Your Cart is Empty</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

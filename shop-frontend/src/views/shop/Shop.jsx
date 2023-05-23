import React from 'react'
import Sidebar from './products/Sidebar'
import Product from './products/Product'
import FetchProduct from '../../data/FetchProduct'

export default function Shop() {
    const { products, loading, error } = FetchProduct('/products')

    { loading && <div>Loading...</div> }
    { error && <div>Error: {error}</div> }

    return (
        <div className="container-fluid animate fadeInDown">
            <div className="row px-xl-5">
                <Sidebar />
                <div className="col-lg-9 col-md-8">
                    <div className="row pb-3">
                        {/* ---------- Sorting ---------- */}
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <button className="btn btn-sm btn-light">
                                        <i className="fa fa-th-large" />
                                    </button>
                                    <button className="btn btn-sm btn-light ml-2">
                                        <i className="fa fa-bars" />
                                    </button>
                                </div>
                                <div className="ml-2">
                                    <div className="btn-group">
                                        <button className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Latest</a>
                                            <a href="#" className="dropdown-item">Popularity</a>
                                            <a href="#" className="dropdown-item">Best Rating</a>
                                        </div>
                                    </div>
                                    <div className="btn-group ml-2">
                                        <button className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">10</a>
                                            <a href="#" className="dropdown-item">20</a>
                                            <a href="#" className="dropdown-item">30</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ---------- End of Sorting ---------- */}
                        <Product data={products} maxLength={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

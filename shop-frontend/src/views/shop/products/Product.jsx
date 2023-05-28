import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TrucateText } from '../../../components/TrucateText'
import { ShopContext } from '../../../contexts/ShopContext' 

export default function Product({ data, maxLength }) {
    const { addToCart, wishlistedItem, wishlistItem } = useContext(ShopContext)

    const isWishlisted = (productId) => {
        const item = wishlistedItem.find((item) => item.product_id === productId);
        return item && item.is_wishlisted;
    };

    return (
        <>
            {data.map(product => (
            <div className="col-lg-4 col-lg-3 col-md-4 col-sm-6 pb-1"  key={product.id}>
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={product.image} alt="" />
                            <div className="product-action">
                                <Link className={'btn btn-outline-dark btn-square'} onClick={() => addToCart(product.id, product.price)}>
                                    <i className="fas fa-shopping-cart" />
                                </Link>
                                <Link className="btn btn-outline-dark btn-square" onClick={() => wishlistItem(product.id)} style={{ color: isWishlisted(product.id) ? 'red' : '' }}>  
                                    <i className="fas fa-heart" />
                                </Link>
                            </div>
                    </div>
                    <div className="text-center py-4">
                        <Link 
                            className="h6 text-decoration-none text-truncate" 
                            to={`/products/${product.id}`}
                            style={{fontSize: '16px'}}>
                            <TrucateText text={product.title} />
                        </Link>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$ {product.price}</h5>
                            <h6 className="text-muted ml-2">
                            <del>$ {product.price}</del>
                            </h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1" />
                            <small className="fa fa-star text-primary mr-1" />
                            <small className="fa fa-star text-primary mr-1" />
                            <small className="fa fa-star text-primary mr-1" />
                            <small className="fa fa-star text-primary mr-1" />
                            <small>(99)</small>
                        </div>
                    </div>
                </div>
            </div>
            )).slice(0, maxLength)}
        </>
    )
}

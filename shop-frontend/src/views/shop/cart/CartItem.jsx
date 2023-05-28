import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../contexts/ShopContext'
import { BsCartPlusFill, BsCartDashFill } from 'react-icons/bs'

const CartItem = (props) => {
    const { addToCart, removeFromCart, updateCartItemCount, deleteFromCart } = useContext(ShopContext)

    const updateItem = (e, productId) => {
        e.preventDefault()

        const quantity = parseInt(e.target.value)

        updateCartItemCount(productId, quantity)
    }

    return (
        <>
        <tr key={ props.data.product_id }>
            <td className="align-middle">
                <img src={ props.data.image } alt='#' style={{width: '50px'}} />
            </td>
            <td className="align-middle">$ { parseFloat(props.data.subtotal).toFixed(2) }</td>
            <td className="align-middle">
                    <div className="input-group quantity mx-auto" style={{width: '130px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={() => removeFromCart(props.data.product_id)} >
                                <BsCartDashFill />
                            </button>
                        </div>
                            <input type="text" className="form-control bg-secondary border-0 text-center h-auto" value={props.data.quantity} onChange={(e) => updateItem(e, props.data.product_id)} />
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={() => addToCart(props.data.product_id, props.data.normalPrice)}>
                                <BsCartPlusFill />
                            </button>
                        </div>
                    </div>
            </td>
            <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                    <button className="btn btn-sm btn-danger " style={{width: '35px'}} onClick={() => deleteFromCart(props.data.product_id)}>
                        <i className="fa fa-times" />
                    </button>
                </div>
            </td>
        </tr>
        </>
    )
}

export default CartItem


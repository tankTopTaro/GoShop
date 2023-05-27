import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../contexts/ShopContext'
import { BsCartPlusFill, BsCartDashFill } from 'react-icons/bs'

const CartItem = (props) => {
    const { cartItems, addToCart, removeFromCart, deleteFromCart, updateCartItemCount } = useContext(ShopContext)

    return (
        <>
        <tr key={ props.id }>
            <td className="align-middle">
                <img src={ props.data.image } alt='#' style={{width: '50px'}} />
            </td>
            <td className="align-middle">$ { props.data.price }</td>
            <td className="align-middle">
                    <div className="input-group quantity mx-auto" style={{width: '130px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={() => removeFromCart(props.data.id)}>
                                <BsCartDashFill />
                            </button>
                        </div>
                            <input type="number" className="form-control bg-secondary border-0 text-center h-auto" value={props.data.quantity} onChange={(e) => updateCartItemCount(Number(e.target.value), props.data.id)}/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={() => addToCart(props.data.id)}>
                                <BsCartPlusFill />
                            </button>
                        </div>
                    </div>
            </td>
            <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                    <button className="btn btn-sm btn-danger " style={{width: '35px'}} onClick={() => deleteFromCart(props.data.id)}>
                        <i className="fa fa-times" />
                    </button>
                </div>
            </td>
        </tr>
        </>
    )
}

export default CartItem


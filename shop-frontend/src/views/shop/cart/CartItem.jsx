import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../contexts/ShopContext'
import { BsCartPlusFill, BsCartDashFill } from 'react-icons/bs'

const CartItem = (props) => {
    const { cartItems, addToCart, removeFromCart, deleteFromCart, updateCartItemCount } = useContext(ShopContext)
    const [quantity, setQuantity] = useState(props.data.quantity)
    const [itemPrice, setItemPrice] = useState(parseFloat(props.data.price))

    const cartHandler = () => {
        addToCart(props.data.product_id)
        setQuantity((prev) => prev + 1)
        setItemPrice((prev)=> prev / quantity + itemPrice)
    }

    return (
        <>
        <tr key={ props.data.product_id }>
            <td className="align-middle">
                <img src={ props.data.image } alt='#' style={{width: '50px'}} />
            </td>
            <td className="align-middle">$ { itemPrice }</td>
            <td className="align-middle">
                    <div className="input-group quantity mx-auto" style={{width: '130px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={() => removeFromCart(props.data.product_id)}>
                                <BsCartDashFill />
                            </button>
                        </div>
                            <input type="number" className="form-control bg-secondary border-0 text-center h-auto" value={quantity} onChange={(e) => updateCartItemCount(Number(e.target.value), props.data.product_id)}/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={cartHandler}>
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


import React, { useContext } from 'react'
import { ShopContext } from '../../../contexts/ShopContext'

const CartItem = (props) => {
    const { cartItems, addToCart, removeFromCart, deleteFromCart, updateCartItemCount } = useContext(ShopContext)

    console.log(props.data.price)

    return (
        <>
        <tr key={ props.data.id }>
            <td className="align-middle">
                <img src={ props.data.image } alt='#' style={{width: '50px'}} />
            </td>
            <td className="align-middle">$ { props.data.price }</td>
            <td className="align-middle \">
                <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                    <div className="input-group-btn d-flex flex-row align-items-center justify-content-center">
                        <button className="btn btn-sm btn-primary btn-minus" onClick={() => removeFromCart(props.data.id)}>
                            <i className="fa fa-minus" />
                        </button>
                        <div className="input-group-prepend">
                            <input type="number" className="form-control-sm bg-secondary border-0 text-center" value={ cartItems[props.data.id] } onChange={(e) => updateCartItemCount(Number(e.target.value), props.data.id)}/>
                        </div>
                        <button className="btn btn-sm btn-primary btn-plus" onClick={() => addToCart(props.data.id)}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                </div>
            </td>
            <td className="align-middle">
                <button className="btn btn-sm btn-danger" onClick={() => deleteFromCart(props.data.id)}>
                    <i className="fa fa-times" />
                </button>
            </td>
        </tr>
        </>
    )
}

export default CartItem

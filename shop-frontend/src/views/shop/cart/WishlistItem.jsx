import React, { useContext } from 'react'
import { ShopContext } from '../../../contexts/ShopContext'

const WishlistItem = (props) => {
    const { addToLikes } = useContext(ShopContext)

    return (
        <>
        <tr key={props.data.id}>
            <td className="align-middle">
                <img src={props.data.image} alt="#" style={{ width: '50px' }} />
            </td>
            <td className="align-middle">$ {props.data.price}</td>
            <td className="align-middle">
                <button className="btn btn-sm btm-danger" onClick={() => addToLikes(props.data.id)}>
                    <i className="fa fa-times" />
                </button>
            </td>
        </tr>
        </>
    )
}

export default WishlistItem

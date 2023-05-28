import React, { useContext } from 'react'
import { ShopContext } from '../../../contexts/ShopContext'

const WishlistItem = (props) => {
    const { wishlistItem } = useContext(ShopContext)

    return (
        <>
        <tr key={props.data.product_id}>
            <td className="align-middle">
                <img src={props.data.image} alt="#" style={{ width: '50px' }} />
            </td>
            <td className="align-middle">$ {props.data.normalPrice}</td>
            <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width: '130px'}}>
                    <button className="btn btn-sm btm-danger" style={{width: '35px'}} onClick={() => wishlistItem(props.data.product_id)}>
                        <i className="fa fa-times" />
                    </button>
                </div>
            </td>
        </tr>
        </>
    )
}

export default WishlistItem

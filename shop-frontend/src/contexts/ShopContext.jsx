import React, { createContext, useEffect, useState } from "react"
import axiosClient from '../api/axios-client'

export const ShopContext = createContext(null)

export const ShopContextProvider = (props) => {
    const [cart, setCart] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const storedCarts = localStorage.getItem('carts')
        const storedCartItems = localStorage.getItem('cartItems')
        const storedTotalItems = localStorage.getItem('totalItems')
        const storedTotalPrice = localStorage.getItem('totalPrice')

        if (storedCarts && storedCartItems && storedTotalItems && storedTotalPrice) {
            setCart(JSON.parse(storedCarts))
            setCartItem(JSON.parse(storedCartItems))
            setTotalItems(JSON.parse(storedTotalItems))
            setTotalPrice(JSON.parse(storedTotalPrice))
        } else {
            // Data not found in localStorage, fetch from the server
            getNewData()
        }
    }, [])

    const getNewData = () => {
        axiosClient.get('/cart')
            .then((response) => {
                const { carts, cartItems, totalItems, totalPrice } = response.data
                setCart(carts)
                setCartItem(cartItems)
                setTotalItems(totalItems)
                setTotalPrice(totalPrice)

                localStorage.setItem('carts', JSON.stringify(carts))
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                localStorage.setItem('totalItems', JSON.stringify(totalItems))
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
            })
    }

    const addToCart = (itemId, price) => {
        const payload = {
            product_id: itemId,
            price: price,
            quantity: 1,
        }
        
        axiosClient.post('/cart/add', payload)
            .then(response => {
                localStorage.removeItem('totalPrice')
                getNewData()
            }).catch(error => {
                console.error(error)
            })
    }

    const removeFromCart = (itemId) => {
        const payload = {
            product_id: itemId,
        }

        axiosClient.post('/cart/remove', payload)
            .then(response => {
                localStorage.removeItem('totalPrice')
                getNewData()
            }).catch(error => {
                console.error(error)
            }) 
    }

    const contextValue = {
        cart,
        cartItem,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart
    }

    return (
        <ShopContext.Provider value={ contextValue }>
            { props.children }
        </ShopContext.Provider>
    )
}
import React, { createContext, useEffect, useState } from "react"
import axiosClient from '../api/axios-client'

export const ShopContext = createContext(null)

export const ShopContextProvider = (props) => {
    const [cart, setCart] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [wishlistedItem, setWishlistedItem] = useState([])
    const [wishlistCount, setWishlistCount] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const storedCarts = localStorage.getItem('carts')
        const storedCartItems = localStorage.getItem('cartItems')
        const storedTotalItems = localStorage.getItem('totalItems')
        const storedTotalPrice = localStorage.getItem('totalPrice')
        const storedWishlistItem = localStorage.getItem('wishlistItem')
        const storedWishlistItemCount = localStorage.getItem('wishlistItemCount')

        if (storedCarts && storedCartItems && storedTotalItems && storedTotalPrice) {
            setCart(JSON.parse(storedCarts))
            setCartItem(JSON.parse(storedCartItems))
            setTotalItems(JSON.parse(storedTotalItems))
            setTotalPrice(JSON.parse(storedTotalPrice))
            setWishlistedItem(JSON.parse(storedWishlistItem))
            setWishlistCount(JSON.parse(storedWishlistItemCount))
        } else {
            // Data not found in localStorage, fetch from the server
            getNewData()
        }
    }, [])

    const getNewData = () => {
        axiosClient.get('/cart')
            .then((response) => {
                const { carts, cartItems, totalItems, totalPrice, wishlistItems, wishlistItemCount } = response.data
                setCart(carts)
                setCartItem(cartItems)
                setTotalItems(totalItems)
                setTotalPrice(totalPrice)
                setWishlistedItem(wishlistItems)
                setWishlistCount(wishlistItemCount)

                localStorage.setItem('carts', JSON.stringify(carts))
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                localStorage.setItem('totalItems', JSON.stringify(totalItems))
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
                localStorage.setItem('wishlistItem', JSON.stringify(wishlistItems))
                localStorage.setItem('wishlistItemCount', JSON.stringify(wishlistItemCount))
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

    const updateCartItemCount = (itemId, newAmount) => {
        const payload = {
            product_id: itemId,
            quantity: newAmount
        }

        axiosClient.post('/cart/update', payload)
            .then(response => {
                localStorage.removeItem('totalPrice')
                getNewData()
            }).catch(error => {
                console.error(error)
            })
    }

    const deleteFromCart = (itemId) => {
        const payload = {
            product_id: itemId,
        }

        axiosClient.post('/cart/delete', payload)
            .then(response => {
                localStorage.removeItem('totalPrice')
                getNewData()
            }).catch(error => {
                console.error(error)
            })
    }

    const wishlistItem = (itemId) => {
        const payload = {
            product_id: itemId,
            is_wishlisted: false
        }

        axiosClient.post('/wishlist/like', payload)
            .then(response => {
                localStorage.removeItem('wishlistItemCount')
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
        wishlistedItem,
        wishlistCount,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        deleteFromCart,
        wishlistItem
    }

    return (
        <ShopContext.Provider value={ contextValue }>
            { props.children }
        </ShopContext.Provider>
    )
}
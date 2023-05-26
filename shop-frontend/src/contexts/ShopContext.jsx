import React, { createContext, useState } from "react"

export const ShopContext = createContext(null)

const getDefaultWisList = () => {
    let wishlist = {}
    for (let i = 1; i < 20 + 1; i++) {
        wishlist[i] = false
    }
    return wishlist
}

const getDefaultCart = () => {
    let cart = {}
    for (let i = 1; i < 20 + 1; i++) {
        cart[i] = 0
    }
    return cart
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [likeItems, setLikeItems] = useState(getDefaultWisList())

    const getTotalWishlistItem = () => {
        let totalLikes = 0
        for (const item in likeItems) {
            if (likeItems[item] === true) {
                totalLikes += 1
            }
        }
        return totalLikes
    }

    const addToLikes = (itemId) => {
        setLikeItems((prev) => ({
            ...prev, [itemId] : !prev[itemId]
        }))
    }

    const getTotalCartAmount = (data) => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                console.log(data)
                let itemInfo = data.find((product) => product.id === Number(item))
                if (itemInfo && itemInfo.price) {
                    totalAmount += cartItems[item] * itemInfo.price
                }
            }
        }
        return totalAmount
    }

    const getTotalCartItem = () => {
        let totalItems = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item]
            }
        }
        return totalItems
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: prev[itemId] + 1
        }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: prev[itemId] - 1
        }))
    }

    const deleteFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: 0
        }))
    }

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: newAmount
        }))
    }

    const contextValue = {
        cartItems,
        setCartItems,
        getTotalCartAmount,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        deleteFromCart,
        getTotalCartItem,
        likeItems,
        setLikeItems,
        addToLikes,
        getTotalWishlistItem
    }

    return (
        <ShopContext.Provider value={ contextValue }>
            { props.children }
        </ShopContext.Provider>
    )
}
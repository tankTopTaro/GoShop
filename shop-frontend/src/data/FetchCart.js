import React, { useEffect, useState } from 'react'
import axiosClient from '../api/axios-client'

const FetchCart = () => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/cart')
                const { carts, totalPrice, totalItems } = response.data
                setCart(carts)
                setTotal(totalPrice)
                setTotalItems(totalItems)
                setLoading(false)

                localStorage.setItem('carts', JSON.stringify(carts))
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
                localStorage.setItem('totalItems', JSON.stringify(totalItems))
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { cart, total, loading, error }
}

export default FetchCart

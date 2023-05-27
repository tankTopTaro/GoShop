import React, { useEffect, useState } from 'react'
import axiosClient from '../api/axios-client'

const FetchCart = () => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/cart')
                setCart(response.data)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { cart, loading, error }
}

export default FetchCart

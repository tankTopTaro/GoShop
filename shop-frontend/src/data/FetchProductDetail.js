import React, { useEffect, useState } from 'react'
import axiosClient from '../api/axios-client'

const FetchProductDetail = (pid) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/products/${pid}`)
                setProduct(response.data)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [pid])

    return { product, loading, error }
}

export default FetchProductDetail

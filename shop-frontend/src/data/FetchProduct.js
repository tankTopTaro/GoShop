// import axios from 'axios'
import axiosClient from '../api/axios-client'
import { useState, useEffect } from 'react'

export default function FetchProduct(url) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosClient.get(url);
                console.log(response.data)
                const shuffledResponse = response.data.sort(() => 0.5 - Math.random())
                setProducts(shuffledResponse)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchProduct()
    }, [url])

    return { products, loading, error }
}

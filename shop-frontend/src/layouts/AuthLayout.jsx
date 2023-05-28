import React, { useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { Topbar } from '../components/Topbar'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BackToTop } from '../components/BackToTop'
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../api/axios-client"

export default function AuthLayout() {
    const { user, token, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to='/login' />
    }

    const logout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                localStorage.removeItem('carts')
                localStorage.removeItem('totalPrice')
                localStorage.removeItem('totalItems')
                localStorage.clear()
                window.location.reload()
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="authLayout" className="animated fadeInDown">
            <Topbar token={token} user={user} logout={logout}/>
            <Navbar />

            <Outlet /> 

            <Footer />
            <BackToTop />
        </div>
    );
}

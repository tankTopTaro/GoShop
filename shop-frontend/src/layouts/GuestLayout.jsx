import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { Topbar } from '../components/Topbar'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BackToTop } from '../components/BackToTop'
import { useStateContext } from "../contexts/ContextProvider"

export default function GuestLayout() {
    const { token } = useStateContext()

    if (token) {
        return <Navigate to='/' />
    }
    return (
        <div id="guestLayout" className="animated fadeInDown">
            <Topbar />
            <Navbar />

            <Outlet />

            <Footer />
            <BackToTop />
        </div>
    );
}

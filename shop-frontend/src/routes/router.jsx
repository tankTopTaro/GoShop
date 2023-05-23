import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout'
import GuestLayout from '../layouts/GuestLayout'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import { Home } from "../views/shop/Home";
import NotFound from "../views/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/home' />
            },
            {
                path: '/home',
                element: <Home />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;

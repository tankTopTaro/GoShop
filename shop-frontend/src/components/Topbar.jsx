import React from 'react'
import { Link } from 'react-router-dom'

export const Topbar = ({ token, user, logout }) => {

 
  return (
    <div className='container-fluid'>
        <div className="row bg-secondary py-1 px-xl-5">
            <div className="col-lg-6 d-none d-lg-block">
                <div className="d-inline-flex align-items-center h-100">
                    <a href="#" className="text-body mr-3">About</a>
                    <a href="#" className="text-body mr-3">Contact</a>
                    <a href="#" className="text-body mr-3">Help</a>
                    <a href="#" className="text-body mr-3">FAQ</a>
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    <div className="btn-group">
                        <button className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{ user ? user?.name : 'Account'}</button>
                        <div className="dropdown-menu dropdown-menu-right">
                            {token ? (<Link href="#" className="dropdown-item" onClick={logout}>Logout</Link>) :
                            (
                            <>
                                <Link to="/login" className="dropdown-item">Login</Link>
                                <Link to="/register" className="dropdown-item">Register</Link>
                            </>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div className="col-lg-4">
                <Link to="/" className="text-decoration-none">
                    <span className="h1 text-uppercase px-2 text-primary bg-dark">Go</span>
                    <span className="h1 text-uppercase px-2 text-dark bg-primary ml-n1">Shop</span>
                </Link>
            </div>
            <div className="col-lg-4 col-6 text-left">
                <form action="#">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for products" />
                        <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search" />
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

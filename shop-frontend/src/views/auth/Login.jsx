import React, { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import { useStateContext } from "../../contexts/ContextProvider"
import axiosClient from "../../api/axios-client"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [errors, setErrors] = useState(null)

    const {setUser, setToken, setUserId} = useStateContext()

    const submit = (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null)

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
                setUserId(data.user.id)
            })
            .catch(err => {
                const response = err.response

                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            <div className="container w-100 mt-8 p-6 bg-light text-center overflow-hidden px-4 py-3">
                <div className="form animated fadeInDown">
                    <h3 className="title">Welcome to Go Shop!</h3>
                    <span>
                        New member?
                        <Link to='/register' className=""> Register</Link>
                    </span>

                    {errors && <div className="alert mt-2">
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div> }

                    <form action="#" method="post" onSubmit={submit}>
                        <div className="mt-3">
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="Email" 
                                ref={emailRef} 
                                className="block mt-1 w-100 p-3"/>
                        </div>
                        <div className="mt-1">
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="Password" 
                                ref={passwordRef}
                                className="block mt-1 w-100 p-3"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-3">
                            <button type="submit" className="btn btn-block btn-outline-secondary" style={{backgroundColor: '#ffc107', width: '120px'}}>LOG IN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

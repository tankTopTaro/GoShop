import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../api/axios-client";

export default function Register() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const [errors, setErrors] = useState(null)

    const {setUser, setToken, setUserId} = useStateContext()

    const submit = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/register', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
                setUserId(data.user.id)
            })
            .catch(err => {
                const response = err.response

                if (response && response.status === 422) {
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            <div className="container w-100 mt-8 p-6 bg-light text-center overflow-hidden px-4 py-3">
                <div className="form animated fadeInDown">
                    <h3 className="title">A new user!?</h3>
                    <span>
                        Already registered?
                        <Link to='/login' className=""> Login</Link>
                    </span>

                    {errors && <div className="alert mt-2">
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div> }

                    <form action="#" method="post" onSubmit={submit}> 
                        <div className="mt-3">
                            <input 
                                ref={nameRef}
                                type="name" 
                                name="name" 
                                id="name"
                                required
                                placeholder="Your name" 
                                className="block mt-1 w-100 p-3"/>
                        </div>
                        <div className="mt-1">
                            <input 
                                ref={emailRef}
                                type="email" 
                                name="email" 
                                id="email"
                                required
                                placeholder="Email Address" 
                                className="block mt-1 w-100 p-3"/>
                        </div>
                        <div className="mt-1">
                            <input 
                                ref={passwordRef}
                                type="password" 
                                name="password" 
                                id="password"
                                required
                                placeholder="Password" 
                                className="block mt-1 w-100 p-3"/>
                        </div>
                        <div className="mt-1">
                            <input 
                                ref={passwordConfirmationRef}
                                type="password" 
                                name="password_confirmation" 
                                id="password_confirmation"
                                required
                                placeholder="Repeat Password" 
                                className="block mt-1 w-100 p-3"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-2">
                            <button type="submit" className="btn btn-block btn-outline-secondary" style={{backgroundColor: '#ffc107', width: '120px'}}>REGISTER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

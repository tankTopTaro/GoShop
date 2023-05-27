import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    userId: null,
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    setUserId: () => {},
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [userId, setUserId] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            userId,
            token,
            setUser,
            setToken,
            setUserId,
        }}>
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
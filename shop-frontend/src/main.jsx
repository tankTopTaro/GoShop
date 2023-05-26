import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import './index.css'
import { ContextProvider } from './contexts/ContextProvider'
import { ShopContextProvider } from './contexts/ShopContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </ContextProvider>
  </React.StrictMode>,
)

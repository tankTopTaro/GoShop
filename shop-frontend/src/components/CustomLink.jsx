import React from 'react'
import { Link, useResolvedPath, useMatch } from 'react-router-dom'

const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <Link to={to} {...props} className={isActive ? 'nav-item nav-link active' : 'nav-item nav-link'}>{children}</Link>
  )
}

export default CustomLink
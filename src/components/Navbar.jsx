import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full'>
        <div className='w-full max-w-[1200px] mx-auto flex justify-between'>
            <div>
                <NavLink to='/'>BLOG BOX</NavLink>
            </div>
            <div>
                <NavLink className='nav-links' to="/">Blogs</NavLink>
                <NavLink className='nav-links' to="/signup">Register</NavLink>
                <NavLink className='nav-links' to="/login">Login</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar

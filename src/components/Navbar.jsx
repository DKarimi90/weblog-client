import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()


  //logout function 
  const handleLogout = () => {
    logout()
  }
  return (
    <div className='w-full'>
        {user && (<div className='w-full h-24 max-w-[1200px] mx-auto flex justify-between items-center'>
            <div>
                <NavLink to='/' className='font-bold'>BLOG<span className='text-[var(--primary)]'>BOX</span></NavLink>
            </div>
            <div>
              <NavLink className='nav-links' to="/">Blogs</NavLink>
              <NavLink className='nav-links' to="/blogform">Create Blog</NavLink>
            </div>
            <div>
                <p className='flex'>Welcome, <p className='text-[var(--primary2)] ml-2'>{user.email}</p></p>
              <button className='flex justify-end w-full text-[var(--danger)]' onClick={handleLogout}>LOGOUT</button>
            </div>
          </div>)}
          {!user && (<div className='flex w-full justify-end h-24 items-center'>
              {/* <NavLink className='nav-links' to="/register">Register</NavLink>
              <NavLink className='nav-links' to="/login">Login</NavLink> */}
          </div>)}
    </div>
  )
}

export default Navbar

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {BsSunFill, BsMoonStarsFill} from 'react-icons/bs'


const Navbar = ( {toggleDarkMode, darkMode} ) => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [showButton, setShowButton] = useState(null)


  //logout function 
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  //logout button 
  const handleLogoutButton = () => {
    setShowButton(!showButton)
  }
  return (
    <div className='w-full flex items-center dark:bg-[var(--charcoal)]'>
        {user && (<div className='w-full h-24 max-w-[1200px] mx-auto flex justify-between items-center'>
            <div>
                <NavLink to='/' className='font-bold'>BLOG<span className='text-[var(--primary)]'>BOX</span></NavLink>
            </div>
            <div>
              <NavLink className='nav-links' to="/resources">Resources</NavLink>
              <NavLink className='nav-links' to="/blogform">Create Blog</NavLink>
            </div>
          
            <div onMouseEnter={handleLogoutButton} onMouseLeave={handleLogoutButton} className='h-6'>
              <p className='flex'>Welcome <p className='text-[var(--primary2)] ml-2'>{user.email}</p></p>
              {showButton? <button className='flex justify-end w-full text-[var(--danger)] items-center' onClick={handleLogout}>Logout</button>: ''}
            </div>
          </div>)}
          {!user && (<div className='flex w-full justify-end h-24 items-center'>
              {/* <NavLink className='nav-links' to="/register">Register</NavLink>
              <NavLink className='nav-links' to="/login">Login</NavLink> */}
          </div>)}
          <div onClick={toggleDarkMode} className='pr-5'>
            {!darkMode? <BsSunFill />:<BsMoonStarsFill className='text-white'/>}
          </div>
          
    </div>
  )
}

export default Navbar

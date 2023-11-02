import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {BsSunFill, BsMoonStarsFill} from 'react-icons/bs'
import { useEffect } from 'react'


const Navbar = ( {toggleDarkMode, darkMode} ) => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [showButton, setShowButton] = useState(null)
  const [scroll, setScroll] = useState(false)


  //logout function 
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  //logout button 
  const handleLogoutButton = () => {
    setShowButton(!showButton)
  }

  //handle nav scroll 
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0) {
        setScroll(true)
      }
      else {
        setScroll(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <div className={`fixed w-full flex items-center dark:bg-[var(--charcoal)] z-10 ${scroll? 'bg-slate-100/95 shadow-xl shadow-black': ''}`}>
        {user && (<div className={`w-full h-24 max-w-[1200px] mx-auto flex justify-between items-center`}>
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
          <div onClick={toggleDarkMode} className='absolute right-5 top-5'>
            {!darkMode? <BsSunFill />:<BsMoonStarsFill className='text-white'/>}
          </div>
          
    </div>
  )
}

export default Navbar

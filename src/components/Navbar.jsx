import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {BsSunFill, BsMoonStarsFill} from 'react-icons/bs'
import { useEffect } from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'


const Navbar = ( {toggleDarkMode, darkMode} ) => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [showButton, setShowButton] = useState(null)
  const [scroll, setScroll] = useState(false)
  const [showMenu, setShowMenu] = useState(false)


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


  //mobile menu
  const handleMenu = () => {
    setShowMenu(!showMenu)
  }


  return (
    <div className={`fixed w-full flex items-center md:dark:bg-[var(--charcoal)] z-10 ${scroll? 'md:bg-slate-100/95 md:shadow-xl md:shadow-black': ''}`}>
        {user && (<div className={`hidden w-full h-24 max-w-[1200px] mx-auto md:flex justify-between items-center px-2`}>
            <div>
                <NavLink to='/' className='font-bold'>BLOG<span className='text-[var(--primary)]'>BOX</span></NavLink>
            </div>
            <div>
              <NavLink className='nav-links' to="/resources">Resources</NavLink>
              {/* {user.email === 'chief@chief.dev' && (
              <NavLink className='nav-links' to="/blogform">
                Create Blog
              </NavLink>
            )} */}
              <NavLink className='nav-links' to="/blogform">
                Create Blog
              </NavLink>

            </div>
          
            <div onMouseEnter={handleLogoutButton} onMouseLeave={handleLogoutButton} className='h-6'>
              <p className='flex'>Welcome <p className='text-[var(--primary2)] ml-2'>{user.email}</p></p>
              {showButton? <button className='flex justify-end w-full text-[var(--danger)] items-center' onClick={handleLogout}>Logout</button>: ''}
            </div>
          </div>)}
          <div onClick={toggleDarkMode} className='absolute right-5 top-8 md:top-5 z-20'>
            {!darkMode? <BsSunFill />:<BsMoonStarsFill className='text-white'/>}
          </div>

          {/* mobile menu  */}
          {user && <div className={`w-full md:hidden ${scroll? 'bg-[var(--default)] dark:bg-[var(--charcoal)] h-16' : ''}`}>
            {/* humburger  */}
            <div onClick={handleMenu} className={`absolute top-4 left-4 z-10 w-full`}>
              {!showMenu? <AiOutlineMenu />:<AiOutlineClose />} 
            </div>
            
            {/* links  */}
            <div>
              <div className={`flex flex-col pt-8 w-full pb-10 transform-translate duration-700 ease-in-out dark:bg-[var(--charcoal)] bg-slate-100/95 ${!showMenu? 'translate-x-[-120vh]' : 'translate-x-0'}`} >
                  <div className='pt-6'>
                      <NavLink onClick={handleMenu} to='/' className='font-bold px-4'>BLOG<span className='text-[var(--primary)]'>BOX</span></NavLink>
                  </div>
                  <div className='flex flex-col'>
                    <NavLink onClick={handleMenu} className='mob-links' to="/resources">Resources</NavLink>
                    <NavLink onClick={handleMenu} className='mob-links' to="/blogform">Create Blog</NavLink>
                  </div>
                  <div className='mob-links' onClick={handleLogout}>
                    <NavLink>Logout</NavLink>
                  </div>
              </div>
            </div>
          </div> }
    </div>
  )
}

export default Navbar

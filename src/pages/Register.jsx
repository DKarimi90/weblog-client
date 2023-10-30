import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useRegister } from '../hooks/useRegister'

const Register = () => {
  const {register, error, isLoading} = useRegister()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState('')
  
  const handleRegister = async(e) => {
      e.preventDefault()
      await register(firstName, lastName, email, password)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
  }

  //handle show password 
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }
  return (
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-[var(--primary)] sm:text-3xl">
      Get started today
    </h1>
    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      A blog site for sharing personal stories, fostering community, and embracing diverse perspectives.
    </p>
    <form
      onSubmit={handleRegister}
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
    <p className="text-center text-lg font-medium">Sign in to your account</p>
    <div>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
    <div>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <input
            type={!showPassword? "password": "text"}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input 
          type='checkbox'
          onClick={handlePasswordToggle}
          className='flex justify-center w-full mt-4'
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg btn px-5 py-3 text-sm font-medium text-white"
      >
        REGISTER
      </button>
      <div className='flex justify-center text-[var(--danger)]'>
        {error && <div>{error}</div>}
      </div>
      <p className="text-center text-sm text-gray-500">
        Already have an Account?
        <Link className="underline pl-2" to="/login"><span className='text-[var(--primary)]'>Login Here!</span></Link>
      </p>
    </form>
  </div>
</div>
  )
}

export default Register

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const { login, error, isLoading } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail('');
    setPassword('');
  };

  // Handle show password
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-48 sm:px-6 lg:px-8 min-h-screen">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-[var(--primary)] sm:text-3xl">
          Welcome Back!
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          A blog site for sharing personal stories, fostering community, and embracing diverse perspectives.
        </p>
        <form
          onSubmit={handleRegister}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Login in to your account</p>
          <div>
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-[var(--charcoal)]"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type={!showPassword ? "password" : "text"}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-[var(--charcoal)]"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="checkbox"
                onClick={handlePasswordToggle}
                className="flex justify-center w-full mt-4"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg btn px-5 py-3 text-sm font-medium text-white"
            disabled={isLoading}
          >
            {isLoading ? (
                <div>Processing...2mins@most</div>
            ) : (
              'LOGIN'
            )}
          </button>
          <div className="flex justify-center text-[var(--danger)]">
            {error && <div>{error}</div>}
          </div>
          <p className="text-center text-sm text-gray-500">
            Don't have an Account?
            <Link className="underline pl-2" to="/register">
              <span className="text-[var(--primary)]" onClick={() => window.scrollTo(0, 0)}>Register Here!</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogsContextProvider } from './contexts/BlogsContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import {HelmetProvider} from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BlogsContextProvider>
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    </BlogsContextProvider>
  </AuthContextProvider>
)

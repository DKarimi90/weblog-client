import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogsContextProvider } from './contexts/BlogsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogsContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BlogsContextProvider>
)

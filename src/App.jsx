import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import BlogDetails from "./components/BlogDetails"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAuthContext } from "./hooks/useAuthContext"
import BlogForm from "./components/BlogForm"
import { useState } from "react"
import Resources from "./pages/Resources"
import Footer from "./components/Footer"
function App() {
  const {user} = useAuthContext()
  const [darkMode, setDarkMode] = useState(false)

  const url = 'https://weblog-server.onrender.com'

  //darkMode 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }


  return (
    <div className={`${darkMode? 'dark': ''}`}>
      <Router>
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path="/" element={user? <Landing />: <Navigate to="/login" url={url}/> }/>
          <Route path="/register" element={!user? <Register />: <Navigate to="/" />} url={url} darkMode={darkMode}/>
          <Route path="/login" element={!user? <Login />: <Navigate to="/" />} url={url} darkMode={darkMode}/>
          <Route path="/blogs/:_id" element={user? <BlogDetails />: <Navigate to="/login"/>} url={url}/>
          <Route path="/blogform" element={<BlogForm /> } url={url}/>
           <Route path="/resources" element={<Resources /> } url={url}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App

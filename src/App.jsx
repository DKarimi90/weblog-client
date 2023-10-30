import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import BlogDetails from "./components/BlogDetails"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAuthContext } from "./hooks/useAuthContext"
import BlogForm from "./components/BlogForm"
function App() {
  const {user} = useAuthContext()

  const url = 'https://weblog-server.onrender.com'

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={user? <Landing />: <Navigate to="/login" url={url}/> }/>
          <Route path="/register" element={!user? <Register />: <Navigate to="/" />} url={url}/>
          <Route path="/login" element={!user? <Login />: <Navigate to="/" />} url={url}/>
          <Route path="/blogs/:_id" element={user? <BlogDetails />: <Navigate to="/login"/>} url={url}/>
          <Route path="/blogform" element={<BlogForm /> } url={url}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

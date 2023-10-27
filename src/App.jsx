import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import BlogDetails from "./components/BlogDetails"
function App() {

  const url = 'http://localhost:4000'

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing url={url}/>}/>
          <Route path="/blogs/:_id" element={<BlogDetails />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

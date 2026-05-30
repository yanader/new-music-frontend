import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Login"
import AlbumDetail from "./AlbumDetail"
import Nav from "./Nav"
import Stats from "./Stats"
import Albums from "./Albums"
import Home from "./Home"


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"


function App() {

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div>
      <Nav token={token} onLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/login" element={<Login />} />
      <Route path="/albums/:id" element={<AlbumDetail />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
    </div>
  )
}

export default App
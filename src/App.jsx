import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Login"
import AlbumDetail from "./AlbumDetail"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

function Albums() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    fetch(`${API_URL}/albums`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Albums</h1>
        {token
          ? <button onClick={handleLogout}>Logout</button>
          : <button onClick={() => navigate("/login")}>Login</button>
        }
      </div>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Artist</th>
            <th>Album</th>
            <th>Rating</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {albums.map(album => (
            <tr
              key={album.id}
              onClick={() => navigate(`/albums/${album.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{album.artist?.name}</td>
              <td>{album.name}</td>
              <td>{album.rating ?? ""}</td>
              <td>{album.notes ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Albums />} />
      <Route path="/login" element={<Login />} />
      <Route path="/albums/:id" element={<AlbumDetail />} />
    </Routes>
  )
}

export default App
import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Login"
import AlbumDetail from "./AlbumDetail"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

function Albums() {
  const [albums, setAlbums] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
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
        const years = [...new Set(data.map(a => a.yearSet.listeningYear))]
        setSelectedYear(Math.max(...years))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])
  

  const filteredAlbums = albums.filter(album => album.yearSet.listeningYear === selectedYear)

  let uniqueYears = [...new Set(albums.map(album => album.yearSet.listeningYear))].sort((a, b) => a - b);  

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

    <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
      {uniqueYears.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Year</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Rating</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlbums.map(album => (
            <tr
              key={album.id}
              onClick={() => navigate(`/albums/${album.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{album.yearSet.listeningYear}</td>
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
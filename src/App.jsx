import { useEffect, useState } from "react"

function App() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/albums`)
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
      <h1>Albums</h1>
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
            <tr key={album.id}>
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

export default App
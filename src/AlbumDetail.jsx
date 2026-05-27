import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

function AlbumDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [album, setAlbum] = useState(null)
  const [rating, setRating] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    fetch(`${API_URL}/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        setAlbum(data)
        setRating(data.rating ?? "")
        setNotes(data.notes ?? "")
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async () => {
    setError(null)
    setSuccess(false)

    if (!rating || rating < 1 || rating > 10) {
      setError("Rating must be between 1 and 10")
      return
    }

    try {
      const res = await fetch(`${API_URL}/albums/${id}/rating`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rating: parseInt(rating), notes })
      })

      if (res.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      if (!res.ok) {
        setError("Failed to save rating")
        return
      }

      setSuccess(true)
    } catch (err) {
      setError("Failed to connect to server")
    }
  }

  if (loading) return <p>Loading...</p>
  if (error && !album) return <p>Error: {error}</p>

  return (
    
    <div>
      
      
      <button onClick={() => navigate("/")}>← Back</button>
      <h1>{album?.name}</h1>
      <h2>{album?.artist?.name}</h2>

      {success && <p style={{ color: "green" }}>Rating saved!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}



      <div>
        <label>Rating (1-10)</label><br />
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
      </div>
      <div>
        <label>Notes</label><br />
        <textarea
          rows="5"
          cols="40"
          maxLength="1000"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Save Rating</button>
    </div>
  )
}

export default AlbumDetail
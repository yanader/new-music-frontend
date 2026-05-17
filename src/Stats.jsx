import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Nav from "./Nav"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

function Stats() {

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
  localStorage.removeItem("token")
  navigate("/login")
  }

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
        <Nav token={token} onLogout={handleLogout} />
        <button onClick={() => navigate("/")}>← Back</button>
        <h1>Stats</h1>
        


        <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Count</th>
                    <th>Count 7+</th>
                    <th>Mean</th>
                    <th>Median</th>
                    <th>Mode</th>
                    <th>% 7+</th>
                    <th>Std Dev</th>
                </tr>
            </thead>
            <tbody>
                {stats.yearStats.filter(stat => stat.count > 0).map(stat => (
                    <tr key ={stat.year}>
                        <td>{stat.year}</td>                                
                        <td>{stat.count}</td>                        
                        <td>{stat.countSevenPlus}</td>                        
                        <td>{stat.mean.toFixed(2)}</td>                        
                        <td>{stat.median.toFixed(2)}</td>
                        <td>{stat.mode}</td>
                        <td>{stat.percentSevenPlus.toFixed(2)}</td>
                        <td>{stat.stdDev.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}

export default Stats
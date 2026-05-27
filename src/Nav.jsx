import { Link } from "react-router-dom"

function Nav({ token, onLogout }) {
  return (
    <nav class="navbar">
      <ul>
        <li><Link to="/">Albums</Link></li>
        <li><Link to="/stats">Stats</Link></li>
      </ul>
      {token
        ? <button onClick={onLogout}>Logout</button>
        : <Link to="/login">Login</Link>
      }
    </nav>
  )
}

export default Nav
import { Link } from "react-router-dom"

function Nav({ token, onLogout }) {
  return (
    <nav>
      <Link to="/">Albums</Link>
      <Link to="/stats">Stats</Link>
      {token
        ? <button onClick={onLogout}>Logout</button>
        : <Link to="/login">Login</Link>
      }
    </nav>
  )
}

export default Nav
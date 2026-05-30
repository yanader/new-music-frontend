import { Link } from "react-router-dom"

function Nav({ token, onLogout }) {
  return (
    <nav class="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/albums">Albums</Link></li>
        <li><Link to="/stats">Stats</Link></li>

        <li>{token
        ? <Link onClick={onLogout}>Logout</Link>
        : <Link to="/login">Login</Link>
        }</li>
      </ul>
      
    </nav>
  )
}

export default Nav
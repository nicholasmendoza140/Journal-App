import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className="container">
        <div className="nav-center">
          <Link to="/">
            JOTFUL
          </Link>
        </div>
        <nav>
          {user && (
            <div className="nav-right">
              <span>{user.email}</span>
              <button className="logout-button" onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div className="nav-right">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
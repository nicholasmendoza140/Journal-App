import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
          <div className="container">
            <div className="nav-center">
              <Link to="/">
                JOTFUL
              </Link>
            </div>
          </div>
        </header>
    )
}

export default Navbar
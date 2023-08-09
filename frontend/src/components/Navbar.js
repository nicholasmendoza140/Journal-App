import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
          <div className="container">
            <div className="nav-center">
              <Link to="/">
                <h1 style={{textAlign: 'center'}}>JOTFUL</h1>
              </Link>
            </div>
          </div>
        </header>
    )
}

export default Navbar
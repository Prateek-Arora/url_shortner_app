import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav className="z-depth-2">
        <div className="nav-wrapper blue darken-3">
          <Link
            to="/"
            style={{
              fontFamily: "monospace"
            }}
            className="col s5 brand-logo center white-text"
          >
            URL SHORTNER
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar

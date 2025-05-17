// Navbar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light 
                        bg-light shadow top-0">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Agrawal's DocManager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/AddDocument" className="nav-link">
                Add New Document
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

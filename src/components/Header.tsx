import React from "react";
import styles from '../components/Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-white fixed-top">
    <div className="container-fluid">
      <a className="navbar-brand text-dark" href="#">Sabor & Saúde</a>
      <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end text-bg-dark"  id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Sabor & Saúde</h5>
          <button type="button" className="btn-close btn-close-white " data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body bg-white">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
            <li className="nav-item">
              <a className="nav-link active text-dark" aria-current="page" href="#">Cadastre-se/Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Dieta</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Opções
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-dark">
                <li><a className="dropdown-item" href="#">Nutri</a></li>
                <li><a className="dropdown-item" href="#">Quem somos nós ?</a></li>
                <li>
     
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
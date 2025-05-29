import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-success bg-success">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">VENDAS</a>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-success" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-light" id="offcanvasDarkNavbarLabel">VENDAS</h5>
              <button type="button" className="btn-close btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li> <Link to={'/login'} className="nav-link active text-light" >Login</Link></li>
                <li> <Link to={'/perfil'} className="nav-link active text-light" >Perfil</Link></li>
                <li> <Link to={'/Home'} className="nav-link active text-light" >Home</Link></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Listagens
                  </a>
                  <ul className="dropdown-menu dropdown-menu-success">
                    <li> <Link to={'/listagem/cliente'} className="dropdown-item" >Listagem Cliente</Link></li>
                    <li> <Link to={'/listagem/produtos'} className="dropdown-item" >Listagem Produtos</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Cadastros
                  </a>
                  <ul className="dropdown-menu dropdown-menu-success">
                    <li><Link to={'/cadastro/cliente'} className="dropdown-item" >Cadastro Cliente</Link></li>
                    <li><Link to={'/cadastro/produto'} className="dropdown-item" >Cadastro Produto</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    VENDA
                  </a>
                  <ul className="dropdown-menu dropdown-menu-success">
                    <li><Link to={'/listagem/venda'} className="dropdown-item" >Listagem Venda</Link></li>
                    <li><Link to={'/venda'} className="dropdown-item" >Realizar Venda</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
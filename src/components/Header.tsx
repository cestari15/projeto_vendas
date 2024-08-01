import React from "react";
import styles from '../components/Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/loguinho.png";

const Navbar = () => {
  return (
<header>
 <img  src={logo}  className={styles.logo} />
<nav>
  <ul className={styles.navlinks}>
    <li><a href="#">Dieta</a></li>
    <li><a href="">Nutri</a></li>
    <li><a href="#">Refeição</a></li>
  </ul>
</nav>
<a className={styles.cta} href=""><button>Login</button></a>
</header>
  );
}

export default Navbar;
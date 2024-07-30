import React from "react";
import styles from '../components/Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
<header>
 <img  src="../images/loguinho.png"  className={styles.logo} />
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
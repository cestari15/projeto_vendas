import React from "react";
import styles from '../components/Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
        <div className={styles.logo}><a href="">Logo</a></div>
        <ul className={styles.links}>
        <li><a href="">Home</a></li>
        <li><a href="">about</a></li>
        <li><a href="">services</a></li>
        <li><a href="">Contact</a></li>
        </ul>
        <a href="" className={styles.actionBtn}>Get Started</a>
        <div className={styles.togglerBtn} >
       <svg xmlns="" ></svg>
        </div>
      </nav>
    );
}

export default Navbar;
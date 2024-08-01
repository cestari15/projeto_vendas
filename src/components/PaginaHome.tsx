import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from '../components/Home.module.css'
import Navbar from "./Header";
import logo from "../images/logo2.png"

const PaginaHome = () => {
    return (

        <div>
            <Navbar />

            <div className={styles.banner}>

                <img src={logo} className={styles.logo} />
                <h5>Melhore sua vida com novos hábitos alimentares</h5>
            </div>

            <div >

            </div>
        </div>





    );
}

export default PaginaHome;
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from '../components/Home.module.css'
import Navbar from "./Header";
import logo from "../images/logo.png"
import banner from "../images/banner.jpg"

const PaginaHome = () => {
    return (
        <div>

            <Navbar />

            <div className="container text-center">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    <div className="col">
                        <div className="p-3">Row column</div>
                    </div>
                    <div className="col">
                        <div className="p-3">Row column</div>
                    </div>
                    <div className="col">
                        <div className="p-3">Row column</div>
                    </div>
                    <div className="col">
                        <div className="p-3">Row column</div>
                    </div>
                    <div className="col">
                        <div className="p-3">Row column</div>
                    </div>
                    <div className="col">
                        <div className="p-5"><a href="#">Receitas</a></div>
                    </div>
                    <div className="col">
                        <div className="p-5"><a href="#">Alimentos</a></div>
                    </div>
                    <div className="col">
                        <div className="p-5"><a href="#">IMC</a></div>
                    </div>
                    <div className="col">
                        <div className="p-5"><a href="#" className={styles.color}>Percentual gordura</a></div>
                    </div>
                    <div className="col">
                        <div className="p-5 bg-text-dark"><a href="#">Perfil</a></div>
                    </div>
                </div>

            </div>
        </div>




    );
}

export default PaginaHome;
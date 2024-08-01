import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from '../components/Home.module.css'
import Navbar from "./Header";
import logo from "../images/logo.png"
import banner from "../images/banner.jpg"

const PaginaHome = () => {
    return (

        <div>
            <Navbar />

            <div className={styles.banner}>

                <img src={logo} className={styles.logo} />
                <h5 className={styles.slogan}>Descubra o Sabor da Saúde</h5>
                <h5 className={styles.slogan2}>Nutrição Personalizada ao seu Alcance!</h5>
            </div>

            <div className={styles.banner2}>
                <h5 className={styles.text1}>Tratamento com os melhores nutricionistas</h5>
                <h4 className={styles.text2}>Acompanhe sua dieta aqui!</h4>

                <img src={banner} className={styles.imagem} />
            </div>

            <div className={styles.banner3}>
                <h2 className={styles.titulo}>Sabor & Saúde</h2>


                <h5 className={styles.subtitle}>Você sabia ?</h5>
                <h5 className={styles.subtitle1}>Basicamente o gasto energético do metabolismo humano é dividido em:</h5>

                <div className="">

                </div>

                <p className={styles.p1}>Quando se faz uma dieta, </p>
                <p className={styles.p2}>todos os gastos energéticos diminuem, mas a massa muscular é a mais afetada, pois ela sofre </p>
                <p className={styles.p3}>degradação durante o emagrecimento.</p>

            </div>

        </div>





    );
}

export default PaginaHome;
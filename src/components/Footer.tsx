import React from "react";
import styles from "./Footer.module.css"
import { Link } from "react-router-dom";
import Feedback from "react-bootstrap/esm/Feedback";

const Footer = () => {
    return (
        <footer>
            <div className={styles.container0footer}>
                <div className={styles.row0footer}>
                    <div className={styles.footer0col}>
                        <h4>Vendas</h4>
                        <ul>
                            <li><a href="#"> Quem somos </a></li>
                            <li><a href=""> nossos serviços </a></li>
                            <li><a href=""> política de privacidade </a></li>
                        </ul>
                    </div>
                    <div className={styles.footer0col}>
                        <h4>Obter ajuda</h4>
                        <ul>
                            <li><a href="#">Entre em contato</a></li>
                            <li><a href=""> Contrate nossos serviços</a></li>
                        </ul>
                    </div>
                    <div className={styles.footer0col}>
                        <h4>Blog online</h4>
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Profissionais</a></li>
                        </ul>
                    </div>
                    <div className={styles.footer0col}>
                        <h4>Mande aqui sua opinião!</h4>
                        <div className={styles.form0sub}>
                            <Link to={"/feedback/store/"} className=' zoom p-1  btn btn-light btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer
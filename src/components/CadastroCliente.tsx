import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import button from '../components/Button.module.css';
import Styles from '../app.module.css';
import { cadastroClienteInterface } from '../interface/cadastroClienteInterface';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';


const CadastroCliente = () => {
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nomeErro, setNomeErro] = useState<string>("");
    const [cpfErro, setCpfErro] = useState<string>("");
    const [passwordErro, setPasswordErro] = useState<string>("");
    const CadastroCliente = (e: React.FormEvent) => {
        e.preventDefault();
        setNomeErro("");
        setCpfErro("");
        setPasswordErro("");
        const dadosDoCliente = {
            nome: nome,
            cpf: cpf,
            password: password,
        }
        axios.post('http://127.0.0.1:8000/api/cliente/store', dadosDoCliente, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.data.success === false) {
                if ('nome' in response.data.error) {
                    setNomeErro(response.data.error.nome[0]);
                }
                if ('cpf' in response.data.error) {
                    setCpfErro(response.data.error.cpf[0]);
                }
                if ('password' in response.data.error) {
                    setPasswordErro(response.data.error.password[0]);
                }
            } else {
                Swal.fire({
                    title: "Cadastrado com sucesso",
                    icon: "success",
                    text: "redirecionando para Listagem...",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(() => {
                    window.location.href = "/listagem/cliente";
                }, 3600);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value);
        }
        if (e.target.name === "cpf") {
            setCpf(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }
    return (
        <div>
            <Header />
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card text-bg-success'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastro de Cliente</h5>
                            <form onSubmit={CadastroCliente} className='row g-4'>
                                <div className='col-8'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control opacity-100' required onChange={handleState} value={nome} />
                                    <div className='text-dark'>{nomeErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Cpf</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} value={cpf} />
                                    <div className='text-dark'>{cpfErro}</div>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="password" className='form-label'>Senha</label>
                                    <input type="password" name='password' className='form-control' required onChange={handleState} value={password} />
                                    <div className='text-dark'>{passwordErro}</div>
                                </div>
                                <div className='col-12'>
                                    <button type='submit' className={button.button}>Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CadastroCliente;

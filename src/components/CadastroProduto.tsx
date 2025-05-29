import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import button from '../components/Button.module.css';
import Styles from '../app.module.css';
import { cadastroProdutoInterface } from '../interface/cadastroProdutoInterface';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';


const CadastroProduto = () => {

    const [nome, setNome] = useState<string>("");
    const [valor_unit, setValor_unit] = useState<string>("");
    const [nomeErro, setNomeErro] = useState<string>("");
    const [valor_unitErro, setValor_unitErro] = useState<string>("");

    const CadastroProduto = (e: React.FormEvent) => {
        e.preventDefault();
        setNomeErro("");
        const dadosDoProduto = {
            nome: nome,
            valor_unit: valor_unit
        }
        axios.post('http://127.0.0.1:8000/api/produto/store', dadosDoProduto, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.data.success === true) {
                Swal.fire({
                    title: "Cadastrado com sucesso",
                    icon: "success",
                    text: "redirecionando para Listagem...",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(() => {
                    window.location.href = "/listagem/produtos";
                }, 3600);
            } else {
                if ('nome' in response.data.error) {
                    setNomeErro(response.data.error.nome[0]);
                }
                if ('valor_unit' in response.data.error) {
                    setValor_unitErro(response.data.error.valor_unit[0]);
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value);
        }
        if (e.target.name === "valor_unit") {
            setValor_unit(e.target.value);
        }
    }
    return (
        <div>
            <Header />
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card text-bg-success'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastro de Produto</h5>
                            <form onSubmit={CadastroProduto} className='row g-4'>
                                <div className='col-12'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control opacity-100' required onChange={handleState} value={nome} />
                                    <div className='text-dark'>{nomeErro}</div>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="valor_unit" className='form-label'>Valor Unitário</label>
                                    <input type="text" name='valor_unit' className='form-control opacity-100' required onChange={handleState} value={valor_unit} placeholder='Ex:29,99' />
                                    <div className='text-dark'>{valor_unitErro}</div>
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

export default CadastroProduto;

import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Button from "./Button.module.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";




const UpdateCliente = () => {

    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>();
    const [id, setId] = useState<number>();
    const [nomeErro, setNomeErro] = useState<string>("");
    const [cpfErro, setCpfErro] = useState<string>("");
    const parametro = useParams();
    const UpdateCliente = (e: FormEvent) => {
        setNomeErro("")
        setCpfErro("")
        e.preventDefault();

        const dadosDoCliente = {
            nome: nome,
            cpf: cpf,
            id: id
        }
        axios.put("http://127.0.0.1:8000/api/cliente/update", dadosDoCliente,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response.data.success == false) {
                    if ('nome' in response.data.error) {
                        setNomeErro(response.data.error.nome[0])
                    }
                    if ('cpf' in response.data.error) {
                        setCpfErro(response.data.error.cpf[0])
                    }

                }
                else {
                    window.location.href = "/listagem/cliente";
                }
            }).catch(function (error) {
                console.log('ocorreu um erro ao atualizar');

            })

    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/cliente/pesquisa/" + parametro.id);
                setNome(response.data.data.nome);
                setCpf(response.data.data.cpf);
                setId(response.data.data.id);
            } catch (error) {
                console.log("erro ao buscar dados da api");

            }
        }
        fetchData();
    }, []);

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value)
        }
    
  
        if (e.target.name === "cpf") {
            setCpf(e.target.value)
        }
        
    }
    return (
        <div>
            <Header />
            <main>
                <div className='container'>
                    <div className='card '>
                        <div className='card-body '>
                            <h5 className='card-title'>Update Cliente</h5>
                            <form onSubmit={UpdateCliente} className='row g-4'>
                                <div className='col-8'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} value={nome} />
                                    <div className='text-dark'>{nomeErro}</div>

                                </div>                     
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Cpf</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} value={cpf} />
                                    <div className='text-dark'>{cpfErro}</div>

                                </div>
                                <div className='col-12'>
                                    <button type='submit' className={Button.button} role="button">Atualizar</button>
                                </div>
                            </form></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default UpdateCliente;
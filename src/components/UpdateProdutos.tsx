import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Button from "./Button.module.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";




const UpdateProdutos = () => {

    const [nome, setNome] = useState<string>("");
    const [valor_unit, setValor_unit] = useState<string>();
    const [id, setId] = useState<number>();
    const [nomeErro, setNomeErro] = useState<string>("");
    const [valor_unitErro, setValor_unitErro] = useState<string>("");
    const parametro = useParams();

    const UpdateProdutos = (e: FormEvent) => {
        setNomeErro("")
        setValor_unitErro("")
        e.preventDefault();

        const dadosDoProduto = {
            nome: nome,
            valor_unit: valor_unit,
            id: id
        }

        axios.put("http://127.0.0.1:8000/api/produto/update", dadosDoProduto,
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
                        setValor_unitErro(response.data.error.valor_unit[0])
                    }

                }
                else {
                    window.location.href = "/listagem/produtos";
                }
            }).catch(function (error) {
                console.log('ocorreu um erro ao atualizar');

            })

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/produto/pesquisa/" + parametro.id);
                setNome(response.data.data.nome);
                setValor_unit(response.data.data.valor_unit);
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
    
  
        if (e.target.name === "valor_unit") {
            setValor_unit(e.target.value)
        }
        
    }
    return (
        <div>
            <Header />
            <main>
                <div className='container'>
                    <div className='card '>
                        <div className='card-body '>
                            <h5 className='card-title'>Update Produtos</h5>
                            <form onSubmit={UpdateProdutos} className='row g-4'>
                                <div className='col-8'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} value={nome} />
                                    <div className='text-dark'>{nomeErro}</div>

                                </div>                   
                                <div className='col-4'>
                                    <label htmlFor="valor_unit" className='form-label'>Valor Unitário</label>
                                    <input type="text" name='valor_unit' className='form-control' required onChange={handleState} value={valor_unit} />
                                    <div className='text-dark'>{valor_unitErro}</div>

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

export default UpdateProdutos;
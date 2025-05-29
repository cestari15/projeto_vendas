import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { cadastroClienteInterface } from '../interface/cadastroClienteInterface';
import Header from './Header';

const ListagemClientes = () => {
    const [cliente, setCliente] = useState<cadastroClienteInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState('');
    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }
    const buscar = (e: FormEvent) => {
        e.preventDefault();
        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cliente/pesquisar',
                    { pesquisa: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true === response.data.status) {
                        setCliente(response.data.data);
                    }
                    else {
                        setCliente([]);
                    }
                }).catch(function (error) {
                    console.log(error)
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cliente/all');
                if (response.data.status === true) {
                    setCliente(response.data.data);
                }
                else {
                    setCliente(response.data.message)
                }
            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }
        fetchData();
    }, []);
    function handleDelete(id: number) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O Cliente foi excluido",
                    icon: "success"
                });
                axios.delete('http://127.0.0.1:8000/api/cliente/delete/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/cliente"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O Cliente não foi excluido :)",
                    icon: "error"
                });
            }
        });
    }
    return (
        <div>
            <Header />
            <main>
                <div className='container '>
                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <Link to={"/cadastro/cliente"} className=' zoom p-1  btn btn-primary btn-sm'>Adicionar Cliente<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                </svg></Link>
                                <div className='row'>
                                    <div className='col-5'>
                                        <h5 className='card-title  text-center'>
                                            Pesquisar
                                        </h5>
                                    </div>
                                </div>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-5'>
                                        <input type="text" name='pesquisa' className='form-control'
                                            onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-primary'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='card-title display-6 '>Listagem de Clientes</h4>
                            <hr />
                            {cliente.length === 0 ? (
                                <p className="text-body-success fs-5">Não há nenhum registro no sistema!</p>
                            ) : (
                                <table className='table table-hover table-success rounded-4 '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>CPF</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {cliente.map(cliente => (
                                            <tr key={cliente.id}>
                                                <td>{cliente.id}</td>
                                                <td>{cliente.nome}</td>
                                                <td>{cliente.cpf}</td>
                                                <td className='col-2'>
                                                    <Link to={"/update/cliente/" + cliente.id} className=' zoom p-1  btn btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                    </svg></Link>
                                                    <a onClick={e => handleDelete(cliente.id)} className='zoom p-1 m-1 btn btn-danger btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                    </svg></a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default ListagemClientes;
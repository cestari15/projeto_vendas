import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';


import { Link } from 'react-router-dom';
import Footer from './Footer';

import Header from './Header';
import { cadastroVendaInterface } from '../interface/cadastroVendaInterface';

const gerarPDF = (v: cadastroVendaInterface) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Resumo da Venda #${v.id}`, 10, 20);

    doc.setFontSize(12);
    doc.text(`Cliente ID: ${v.cliente_id}`, 10, 30);
    doc.text(`Produto ID: ${v.produto_id}`, 10, 40);
    doc.text(`Quantidade: ${v.quantidade}`, 10, 50);
    doc.text(`Valor Unitário: R$ ${Number(v.valor_unit).toFixed(2)}`, 10, 60);
    doc.text(`Valor Total: R$ ${Number(v.valor).toFixed(2)}`, 10, 70);
    doc.text(`Data: ${v.data}`, 10, 80);
    doc.text(`Tipo de Pagamento: ${v.tipo_pagamento || "N/A"}`, 10, 90);

    if (Array.isArray(v.parcelas) && v.parcelas.length > 0) {
        doc.text("Parcelas:", 10, 100);
        v.parcelas.forEach((p, i) => {
            doc.text(`Parcela ${p.parcela || i + 1}: R$ ${Number(p.valor).toFixed(2)} - Vence em ${p.data_vencimento}`, 15, 110 + i * 10);
        });
    } else {
        doc.text("Parcelas: Sem parcelas", 10, 100);
    }

    doc.save(`resumo_venda_${v.id}.pdf`);
};

const ListagemVendas = () => {
    const [venda, setVenda] = useState<cadastroVendaInterface[]>([]);
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
                const response = await axios.post('http://127.0.0.1:8000/api/venda/pesquisar',
                    { pesquisa: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true === response.data.status) {

                        setVenda(response.data.data);
                    }
                    else {

                        setVenda([]);



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
                const response = await axios.get('http://127.0.0.1:8000/api/venda/all');
                if (response.data.status === true) {

                    setVenda(response.data.data);
                }
                else {
                    setVenda(response.data.message)
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
                    text: "A Venda foi excluida",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/venda/delete/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/venda"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "A Venda não foi excluida :)",
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
                                <Link to={"/venda"} className=' zoom p-1  btn btn-primary btn-sm'>Realizar Vendas<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
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
                            <h4 className='card-title display-6 '>Listagem de vendas</h4>
                            <hr />
                            {venda.length === 0 ? (
                                <p className="text-body-success fs-5">Não há nenhum registro no sistema!</p>
                            ) : (
                                <table className='table table-hover table-success rounded-4 '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Cliente</th>
                                            <th>Produto</th>
                                            <th>Valor Unitário</th>
                                            <th>Quantidade</th>
                                            <th>Tipo De Pagamento</th>
                                            <th>Parcelas</th>
                                            <th>Valor</th>
                                            <th>Data</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {venda.map(v => (
                                            <tr key={v.id}>
                                                <td>{v.id}</td>
                                                <td>{v.cliente_id}</td>
                                                <td>{v.produto_id}</td>
                                                <td>{v.valor_unit}</td>
                                                <td>{v.quantidade}</td>
                                                <td>{v.tipo_pagamento}</td>
                                                <td>
                                                    {Array.isArray(v.parcelas) && v.parcelas.length > 0 ? (
                                                        v.parcelas.map((p, i) => (
                                                            <div key={i}>
                                                                Parcela {p.parcela}: R$ {Number(p.valor).toFixed(2)} - Vence em {p.data_vencimento}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span>Sem parcelas</span>
                                                    )}
                                                </td>
                                                <td>{v.valor}</td>
                                                <td>{v.data}</td>
                                                <td className='col-2'>
                                                    <Link to={"/update/venda/" + v.id} className='zoom p-1 btn btn-primary btn-sm'>Editar</Link>
                                                    <a onClick={() => handleDelete(v.id)} className='zoom p-1 m-1 btn btn-danger btn-sm'>Excluir</a>
                                                    <button
                                                        className='zoom p-1 m-1 btn btn-info btn-sm'
                                                        onClick={() => gerarPDF(v)}
                                                        title="Baixar Resumo PDF"
                                                    >
                                                        PDF
                                                    </button>
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
export default ListagemVendas;
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Styles from '../app.module.css';
import button from './Button.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import Swal from 'sweetalert2';
import { cadastroClienteInterface } from '../interface/cadastroClienteInterface';
import { cadastroProdutoInterface } from '../interface/cadastroProdutoInterface';

const Venda = () => {

    const [cliente_id, setCliente_id] = useState<string>("");
    const [produto_id, setProduto_id] = useState<string>("");
    const [quantidade, setQuantidade] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [valor, setValor] = useState<string>("");
    const [valor_unit, setValor_unit] = useState<string>("");
    const [tipo_pagamento, setTipoPagamento] = useState("Parcelamento");


    const [cliente_idErro, setCliente_idErro] = useState<string>("");
    const [valor_erro, setValor_Erro] = useState<string>("");
    const [produto_idErro, setProduto_idErro] = useState<string>("");
    const [dataErro, setDataErro] = useState<string>("");
    const [status_idErro, setStatus_idErro] = useState<string>("");
    const [valorParcela, setValorParcela] = useState('');
    const [parcelaEditada, setParcelaEditada] = useState(false);
    const [parcelas, setParcelas] = useState("");
    const [clientes, setCliente] = useState<cadastroClienteInterface[]>([]);
    const [produtos, setProduto] = useState<cadastroProdutoInterface[]>([]);
    const [parcelasDetalhadas, setParcelasDetalhadas] = useState<{ valor: string; data: string }[]>([]);


    const Venda = (e: FormEvent) => {
        setCliente_idErro("")
        setProduto_idErro("")
        setDataErro("")
        setValor_Erro("")
        setStatus_idErro("")
        e.preventDefault();
        const dadosDaVenda = {
            cliente_id,
            produto_id,
            data,
            valor,
            quantidade,
            tipo_pagamento,
            parcelas: parcelasDetalhadas
        };
        axios.post('http://127.0.0.1:8000/api/venda/store', dadosDaVenda)
            .then(response => {
                if (response.data.success) {
                    Swal.fire({
                        title: "Venda registrada com sucesso",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    setTimeout(() => window.location.href = "/listagem/venda", 3600);
                } else {
                    Swal.fire("Erro", response.data.message, "error");
                }
            }).catch(error => {
                console.log(error);
                Swal.fire("Erro", "Erro ao enviar a venda. Verifique os dados.", "error");
            });
    };
    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "data") {
            setData(e.target.value)
        }
        if (e.target.name === "valor") {
            setValor(e.target.value)
        }


    }


    useEffect(() => {
        if (produto_id) {
            const produto = produtos.find(p => p.id.toString() === produto_id);
            if (produto) {
                setValor_unit(produto.valor_unit.toString());
                if (quantidade) {
                    const total = parseFloat(produto.valor_unit) * parseInt(quantidade);
                    setValor(total.toFixed(2));
                }
            }
        }
    }, [produto_id, quantidade, produtos]);


    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'produtos') {
            setProduto_id(e.target.value);
            console.log(e.target.name);
            console.log(e.target.value);
            console.log(produtos);
        }

        if (e.target.name === 'clientes') {
            setCliente_id(e.target.value);
            console.log(e.target.name);
            console.log(e.target.value);
            console.log(clientes);

        }
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cliente/all')
            .then(response => {
                if (response.data.status) {
                    setCliente(response.data.data);
                }
            });
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/produto/all')
            .then(response => {
                if (response.data.status) {
                    setProduto(response.data.data);
                }
            });
    }, [])

    useEffect(() => {
        if (valor && parcelas && !parcelaEditada) {
            const calculado = (parseFloat(valor) / parseInt(parcelas)).toFixed(2);
            setValorParcela(calculado);
        }
    }, [valor, parcelas, parcelaEditada]);


    const enviarVenda = (e: FormEvent) => {
        e.preventDefault();

        const dadosDaVenda = {
            cliente_id,
            produto_id,
            data,
            valor,
            quantidade,
            tipo_pagamento: "Cartão",
            parcelas: parcelasDetalhadas
        };

        axios.post('http://127.0.0.1:8000/api/venda/store', dadosDaVenda)
            .then(response => {
                if (response.data.success) {
                    Swal.fire({
                        title: "Venda registrada com sucesso",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    setTimeout(() => window.location.href = "/listagem/venda", 3600);
                } else {
                    Swal.fire("Erro", response.data.message, "error");
                }
            }).catch(error => {
                console.log(error);
                Swal.fire("Erro", "Erro ao enviar a venda. Verifique os dados.", "error");
            });
    };


    useEffect(() => {
        const qtd = parseInt(parcelas);
        const total = parseFloat(valor);
        if (qtd > 0 && !isNaN(total)) {
            const valorBase = Math.floor((total / qtd) * 100) / 100;
            const restante = total - valorBase * qtd;
            const hoje = new Date();

            const novasParcelas = Array.from({ length: qtd }, (_, i) => {
                const dataVenc = new Date(hoje);
                dataVenc.setMonth(dataVenc.getMonth() + i);
                return {
                    valor: (valorBase + (i === 0 ? restante : 0)).toFixed(2),
                    data: dataVenc.toISOString().split('T')[0]
                };
            });
            setParcelasDetalhadas(novasParcelas);
        } else {
            setParcelasDetalhadas([]);
        }
    }, [parcelas, valor]);

    const handleParcelaChange = (index: number, field: 'valor' | 'data', value: string) => {
        const novas = [...parcelasDetalhadas];
        novas[index][field] = value;
        setParcelasDetalhadas(novas);
    };


    return (
        <div>
            <Header />
            <main className={Styles.main}>
                <div className='container '>
                    <div className='card text-bg-success'>
                        <div className='card-body'>
                            <h5 className='card-title'>Venda</h5>
                            <form onSubmit={enviarVenda} className="row g-4">
                                <div className="col-4">
                                    <label className="form-label">Cliente</label>
                                    <select className="form-control" value={cliente_id} onChange={e => setCliente_id(e.target.value)} required>
                                        <option value="">Selecione o Cliente</option>
                                        {clientes.map((c: any) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                    </select>
                                </div>

                                <div className="col-4">
                                    <label className="form-label">Produto</label>
                                    <select className="form-control" value={produto_id} onChange={e => setProduto_id(e.target.value)} required>
                                        <option value="">Selecione o Produto</option>
                                        {produtos.map((p: any) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                    </select>
                                </div>

                                <div className="col-4">
                                    <label className="form-label">Valor Unitário</label>
                                    <input type="text" className="form-control" value={valor_unit} readOnly />
                                </div>

                                <div className="col-4">
                                    <label className="form-label">Quantidade</label>
                                    <input type="number" className="form-control" min="1" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
                                </div>
                                <div className="col-4">
                                    <label className="form-label">Tipo de Pagamento</label>
                                    <input type="text" className="form-control" value={tipo_pagamento} readOnly />
                                </div>

                                <div className="col-4">
                                    <label className="form-label">Parcelas</label>
                                    <input type="number" className="form-control" min="1" value={parcelas} onChange={e => setParcelas(e.target.value)} required />
                                </div>

                                {parcelasDetalhadas.length > 0 && (
                                    <div className="col-12">
                                        <label className="form-label">Detalhes das Parcelas</label>
                                        {parcelasDetalhadas.map((parcela, i) => (
                                            <div key={i} className="row mb-2">
                                                <div className="col-md-2">
                                                    <label>Parcela {i + 1}</label>
                                                </div>
                                                <div className="col-md-5">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={parcela.valor}
                                                        onChange={e => handleParcelaChange(i, 'valor', e.target.value)}
                                                        step="0.01"
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="col-md-5">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={parcela.data}
                                                        onChange={e => handleParcelaChange(i, 'data', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="col-4">
                                    <label className="form-label">Valor Total</label>
                                    <input type="text" className="form-control" value={valor} readOnly />
                                </div>

                                <div className="col-4">
                                    <label className="form-label">Data de Vencimento (Venda)</label>
                                    <input type="date" className="form-control" value={data} onChange={e => setData(e.target.value)} required />
                                </div>

                                <div className="col-12">
                                    <button type="submit" className="btn btn-success">Realizar Venda</button>
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

export default Venda;
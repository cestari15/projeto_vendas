import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button.module.css";

const UpdateVendas = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente_id, setClienteId] = useState(0);
  const [produto_id, setProdutoId] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);
  const [valor_unit, setValorUnit] = useState(0);
  const [tipo_pagamento, setTipoPagamento] = useState("");
  const [data, setData] = useState("");
  const [parcelas, setParcelas] = useState<{ valor: number; data_vencimento: string }[]>([]);
  const [erros, setErros] = useState<Record<string, string>>({});

  // Buscar dados da venda
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/venda/pesquisar/${id}`)
      .then((response) => {
        if (response.data.status) {
          const venda = response.data.data;
          setClienteId(Number(venda.cliente_id) || 0);
          setProdutoId(Number(venda.produto_id) || 0);
          setQuantidade(Number(venda.quantidade) || 0);
          setValor(Number(venda.valor) || 0);
          setValorUnit(Number(venda.valor_unit) || 0);
          setTipoPagamento(venda.tipo_pagamento || "");
          setData(venda.data || "");
          setParcelas(venda.parcelas || []);
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: response.data.message || "Venda não encontrada",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao carregar venda",
        });
      });
  }, [id]);

  // Atualiza valor total quando quantidade ou valor_unit mudam
  useEffect(() => {
    const valorTotal = quantidade * valor_unit;
    setValor(parseFloat(valorTotal.toFixed(2)));
  }, [quantidade, valor_unit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErros({});

    // Validação simples das parcelas
    for (let i = 0; i < parcelas.length; i++) {
      if (!parcelas[i].data_vencimento) {
        setErros({ data_vencimento: "Data de vencimento da parcela é obrigatória." });
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Data de vencimento da parcela é obrigatória.",
        });
        return;
      }
    }

    // Verifica se soma das parcelas não ultrapassa o valor total
    const somaParcelas = parcelas.reduce((acc, p) => acc + p.valor, 0);
    if (somaParcelas > valor) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: `A soma das parcelas (${somaParcelas.toFixed(2)}) não pode ultrapassar o valor total da venda (${valor.toFixed(2)}).`,
      });
      return;
    }

    axios
      .put("http://127.0.0.1:8000/api/venda/update", {
        id: Number(id),
        cliente_id,
        produto_id,
        quantidade,
        valor,
        valor_unit,
        tipo_pagamento,
        data,
        parcelas,
      })
      .then((response) => {
        if (response.data.status === false && response.data.message) {
          Swal.fire({ icon: "error", title: "Erro", text: response.data.message });
          setErros(response.data.error || {});
        } else {
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Venda atualizada com sucesso.",
          }).then(() => {
            navigate("/listagem/vendas");
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao atualizar venda",
        });
      });
  };

  const handleParcelaChange = (index: number, field: string, value: string | number) => {
    const novasParcelas = [...parcelas];
    novasParcelas[index] = {
      ...novasParcelas[index],
      [field]: field === "valor" ? Number(value) : value,
    };
    setParcelas(novasParcelas);
  };

  const adicionarParcela = () => {
    const hoje = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    setParcelas((prev) => [...prev, { valor: 0, data_vencimento: hoje }]);
  };

  const removerParcela = (index: number) => {
    setParcelas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Atualizar Venda</h5>
              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-4">
                  <label className="form-label">Cliente ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={cliente_id}
                    onChange={(e) => setClienteId(Number(e.target.value))}
                  />
                  {erros.cliente_id && <div className="text-danger">{erros.cliente_id}</div>}
                </div>

                <div className="col-4">
                  <label className="form-label">Produto ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={produto_id}
                    onChange={(e) => setProdutoId(Number(e.target.value))}
                  />
                  {erros.produto_id && <div className="text-danger">{erros.produto_id}</div>}
                </div>

                <div className="col-4">
                  <label className="form-label">Quantidade</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                  />
                </div>

                <div className="col-4">
                  <label className="form-label">Valor Total</label>
                  <input
                    type="text"
                    className="form-control"
                    value={typeof valor === "number" && !isNaN(valor) ? valor.toFixed(2) : "0.00"}
                    readOnly
                  />
                </div>

                <div className="col-4">
                  <label className="form-label">Valor Unitário</label>
                  <input
                    type="number"
                    className="form-control"
                    value={valor_unit}
                    onChange={(e) => setValorUnit(Number(e.target.value))}
                  />
                </div>

                <div className="col-4">
                  <label className="form-label">Tipo Pagamento</label>
                  <input type="text" className="form-control" value="Parcelamento" readOnly />
                </div>

                <div className="col-4">
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>

                <div className="col-12 mt-3">
                  <h6>Parcelas</h6>

                  {erros.data_vencimento && <div className="text-danger mb-3">{erros.data_vencimento}</div>}

                  {parcelas.map((parcela, index) => (
                    <div key={index} className="row mb-2">
                      <div className="col-5">
                        <label className="form-label">Valor</label>
                        <input
                          type="number"
                          className="form-control"
                          value={parcela.valor}
                          onChange={(e) => handleParcelaChange(index, "valor", e.target.value)}
                        />
                      </div>
                      <div className="col-5">
                        <label className="form-label">Vencimento</label>
                        <input
                          type="date"
                          className="form-control"
                          value={parcela.data_vencimento}
                          onChange={(e) => handleParcelaChange(index, "data_vencimento", e.target.value)}
                        />
                      </div>
                      <div className="col-2 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-danger w-100"
                          onClick={() => removerParcela(index)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-3">
                    <button type="button" className="btn btn-secondary" onClick={adicionarParcela}>
                      Adicionar Parcela
                    </button>
                  </div>
                </div>

                <div className="col-12">
                  <button type="submit" className={Button.button}>
                    Atualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdateVendas;

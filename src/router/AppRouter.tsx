import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroCliente from "../components/CadastroCliente";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CadastroProduto from "../components/CadastroProduto";
import ListagemClientes from "../components/LiastagemClientes";
import UpdateCliente from "../components/UpdateClientes";
import ListagemProdutos from "../components/ListagemProdutos";
import UpdateProdutos from "../components/UpdateProdutos";
import Venda from "../components/Venda";
import ListagemVendas from "../components/ListagemVendas";
import UpdateVenda from "../components/UpdateVenda";
import Login from "../components/Login";



const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* CADASTROS */}
                <Route path="cadastro/cliente" element={<CadastroCliente />} />
                <Route path="cadastro/produto" element={<CadastroProduto />} />
                <Route path="venda" element={<Venda />} />
                {/* NAVBAR & FOOTER */}
                <Route path="/header" element={<Header />} />
                <Route path="/Footer" element={<Footer />} />
                {/* LISTAGENS */}
                <Route path="/listagem/cliente" element={<ListagemClientes />} />
                <Route path="/listagem/produtos" element={<ListagemProdutos />} />
                <Route path="/listagem/venda" element={<ListagemVendas />} />
                {/* UPDATES */}
                <Route path="/update/cliente/:id" element={<UpdateCliente />} />
                <Route path="/update/produto/:id" element={<UpdateProdutos />} />
                <Route path="/update/venda/:id" element={<UpdateVenda />} />
                {/* LOGIN */}
                  <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )

}

export default AppRouter;
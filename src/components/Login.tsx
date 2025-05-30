import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';
import Styles from '../App.module.css';
import button from '../components/Button.module.css';

const Login = () => {
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpfErro, setCpfErro] = useState<string>("");
  const [passwordErro, setPasswordErro] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setCpfErro("");
    setPasswordErro("");

    // Validação simples antes do envio
    let hasError = false;
    if (!cpf.trim()) {
      setCpfErro("CPF é obrigatório");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordErro("Senha é obrigatória");
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        Swal.fire("Erro", data.message || "CPF ou senha inválidos", "error");
        return;
      }

      localStorage.setItem("cliente", JSON.stringify(data.data));
      Swal.fire("Sucesso", "Login efetuado com sucesso!", "success");
      navigate("/perfil");
    } catch (error) {
      Swal.fire("Erro", "Erro ao conectar com o servidor", "error");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <main className={Styles.main}>
        <div className='container'>
          <div className='card text-bg-success'>
            <div className='card-body'>
              <h5 className='card-title'>Login</h5>
              <form onSubmit={handleSubmit} className='row g-4'>
                <div className='col-12'>
                  <label htmlFor="cpf" className='form-label'>CPF</label>
                  <input
                    type="text"
                    id="cpf"
                    className='form-control opacity-100'
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    placeholder="Digite seu CPF"
                    required
                  />
                  <div className='text-dark'>{cpfErro}</div>
                </div>
                <div className='col-12'>
                  <label htmlFor="password" className='form-label'>Senha</label>
                  <input
                    type="password"
                    id="password"
                    className='form-control opacity-100'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />
                  <div className='text-dark'>{passwordErro}</div>
                </div>
                <div className='col-12'>
                  <button type='submit' className={button.button}>Entrar</button>
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

export default Login;

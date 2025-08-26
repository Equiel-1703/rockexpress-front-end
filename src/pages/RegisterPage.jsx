import "../styles/RegisterPage.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [tipoConta, setTipoConta] = useState("cliente"); // cliente ou vendedor
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const payload =
      tipoConta === "cliente"
        ? { nome, email, senha, cpf }
        : { nome, email, senha, cnpj };

    console.log("Dados da conta a ser criada:", payload);

    try {
      const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Register success:", data);
      } else {
        console.error("Register failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Crie sua conta</h2>
        <p className="register-subtitle">Cadastro com Email</p>

        {/* Escolha entre Cliente ou Vendedor */}
        <div className="account-type">
          <label>
            <input
              type="radio"
              value="cliente"
              checked={tipoConta === "cliente"}
              onChange={() => setTipoConta("cliente")}
            />
            Cliente (CPF)
          </label>
          <label>
            <input
              type="radio"
              value="vendedor"
              checked={tipoConta === "vendedor"}
              onChange={() => setTipoConta("vendedor")}
            />
            Vendedor (CNPJ)
          </label>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          {/* Campo CPF ou CNPJ dependendo do tipo de conta */}
          {tipoConta === "cliente" ? (
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          )}

          <button type="submit" className="register-button">
            CRIAR CONTA
          </button>
        </form>

        <p className="login-link">
          <Link to="/login">Já tem uma conta? Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

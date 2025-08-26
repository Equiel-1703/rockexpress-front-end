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
  const [erros, setErros] = useState({});

  // Formatar CPF enquanto digita (xxx.xxx.xxx-xx)
  const formatarCPF = (valor) => {
    const v = valor.replace(/\D/g, '');
    if (v.length <= 11) {
      return v
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return valor;
  };

  // Formatar CNPJ enquanto digita (xx.xxx.xxx/xxxx-xx)
  const formatarCNPJ = (valor) => {
    const v = valor.replace(/\D/g, '');
    if (v.length <= 14) {
      return v
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
    return valor;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const novosErros = {};

    // Validar se as senhas coincidem
    if (senha !== confirmarSenha) {
      novosErros.senha = "As senhas não coincidem.";
    }

    // Validar CPF ou CNPJ conforme o tipo de conta
    if (tipoConta === "cliente") {
      const cpfNumeros = cpf.replace(/\D/g, '');
      if (cpfNumeros.length !== 11 || !/^\d+$/.test(cpfNumeros)) {
        novosErros.cpf = "CPF deve ter 11 números.";
      }
    } else {
      const cnpjNumeros = cnpj.replace(/\D/g, '');
      if (cnpjNumeros.length !== 14 || !/^\d+$/.test(cnpjNumeros)) {
        novosErros.cnpj = "CNPJ deve ter 14 números.";
      }
    }

    // Se houver erros, exibir e não prosseguir
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    // Limpar erros se tudo estiver válido
    setErros({});

    const payload =
      tipoConta === "cliente"
        ? { nome, email, senha, cpf: cpf.replace(/\D/g, '') }
        : { nome, email, senha, cnpj: cnpj.replace(/\D/g, '') };

    console.log("Dados da conta a ser criada:", payload);

    try {
      const endpoint = (tipoConta === "cliente")
        ? "http://localhost:8080/usuarios/cliente"
        : "http://localhost:8080/usuarios/vendedor";

      console.log("Endpoint:", endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Register success:", data);
        alert("Conta criada com sucesso!");
      } else {
        console.error("Register failed:", data.message);
        alert(`Erro no cadastro: ${data.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro de conexão. Tente novamente.");
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
              onChange={() => {
                setTipoConta("cliente");
                setErros({}); // Limpar erros ao mudar o tipo
              }}
            />
            Cliente (CPF)
          </label>
          <label>
            <input
              type="radio"
              value="vendedor"
              checked={tipoConta === "vendedor"}
              onChange={() => {
                setTipoConta("vendedor");
                setErros({}); // Limpar erros ao mudar o tipo
              }}
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
          {erros.senha && <span className="error-message">{erros.senha}</span>}

          {/* Campo CPF ou CNPJ dependendo do tipo de conta */}
          {tipoConta === "cliente" ? (
            <div>
              <input
                type="text"
                placeholder="CPF"
                value={formatarCPF(cpf)}
                onChange={(e) => {
                  const valor = e.target.value;
                  // Permite apenas números e limita a 14 caracteres (com formatação)
                  if (valor.replace(/\D/g, '').length <= 11) {
                    setCpf(valor);
                  }
                }}
                maxLength="14"
                required
              />
              {erros.cpf && <span className="error-message">{erros.cpf}</span>}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="CNPJ"
                value={formatarCNPJ(cnpj)}
                onChange={(e) => {
                  const valor = e.target.value;
                  // Permite apenas números e limita a 18 caracteres (com formatação)
                  if (valor.replace(/\D/g, '').length <= 14) {
                    setCnpj(valor);
                  }
                }}
                maxLength="18"
                required
              />
              {erros.cnpj && <span className="error-message">{erros.cnpj}</span>}
            </div>
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
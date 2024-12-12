import React, { useState } from "react";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    genero: "",
    dataNascimento: "",
    telefone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCpfChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    setFormData({ ...formData, cpf: value });
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    setFormData({ ...formData, telefone: value });
  };

  const handleDataNascimentoChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    if (value.length <= 8) {
      value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3"); 
    }
    setFormData({ ...formData, dataNascimento: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório.";
    }
    if (!formData.cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      newErrors.cpf = "CPF inválido.";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "E-mail inválido.";
    }
    if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem.";
    }
    if (!formData.dataNascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      newErrors.dataNascimento = "Data de nascimento inválida.";
    }
    if (!formData.telefone.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)) {
      newErrors.telefone = "Telefone inválido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setFormData({
          nome: "", cpf: "", email: "", senha: "",confirmarSenha: "", genero: "",
          dataNascimento: "",
          telefone: "",
        });
        setErrors({});
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            className="input"
            value={formData.nome}
            onChange={handleChange}
          />
          {errors.nome && <span className="error">{errors.nome}</span>}

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="input"
            value={formData.cpf}
            onChange={handleCpfChange}
          />
          {errors.cpf && <span className="error">{errors.cpf}</span>}
        </div>
        <div className="form-row">
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            className="input"
            value={formData.telefone}
            onChange={handleTelefoneChange}
          />
          {errors.telefone && <span className="error">{errors.telefone}</span>}

          <input
            type="text"
            name="dataNascimento"
            placeholder="Data de nascimento"
            className="input"
            value={formData.dataNascimento}
            onChange={handleDataNascimentoChange}
          />
          {errors.dataNascimento && <span className="error">{errors.dataNascimento}</span>}
        </div>
        <div className="form-row">
          <input
            name="genero"
            placeholder="Gênero"
            className="input"
            value={formData.genero}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-row">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className="input"
            value={formData.senha}
            onChange={handleChange}
          />
          {errors.senha && <span className="error">{errors.senha}</span>}

          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirma sua senha"
            className="input"
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
        </div>
        <div className="checkbox-container">
          <label className="checkbox">
            <input type="checkbox" />
            Li e estou de acordo com as políticas da empresa
          </label>
        </div>
        <button className="submit-button">Cadastrar-se</button>
      </form>
    </div>
  );
};

export default Cadastro;

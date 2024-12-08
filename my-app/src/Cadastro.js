import React from "react";
import "./Cadastro.css";

const Cadastro = () => {
  return (
    <div className="cadastro-container">
      <div className="social-login">
        <button className="google-login">Cadastrar com o Google</button>
        <button className="apple-login">Cadastrar com a Apple</button>
      </div>
      <div className="separator">
        <hr className="line" />
        <span className="or">ou</span>
        <hr className="line" />
      </div>
      <form className="form">
        <div className="form-row">
          <input type="text" placeholder="Nome Completo" className="input" />
          <input type="text" placeholder="CPF" className="input" />
        </div>
        <div className="form-row">
          <input type="text" placeholder="Telefone" className="input" />
          <input type="text" placeholder="Data de nascimento" className="input" />
        </div>
        <div className="form-row">
          <input type="text" placeholder="Gênero" className="input" />
          <input type="email" placeholder="E-mail" className="input" />
        </div>
        <div className="form-row">
          <input type="password" placeholder="Senha" className="input" />
          <input type="password" placeholder="Confirma sua senha" className="input" />
        </div>
        <div className="checkbox-container">
          <label className="checkbox">
            <input type="checkbox" />
            Quero receber ofertas e novidades
          </label>
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

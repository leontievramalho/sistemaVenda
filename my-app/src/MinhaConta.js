import React, { useState, useEffect } from "react";
import "./MinhaConta.css";
import HomeIcon from "./home.png";
import DadosIcon from "./dadosBasicos.png";
import SenhaIcon from "./senha.png";

function MinhaConta() {
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        genero: "",
        nascimento: "",
        senha: "",
        confirmarSenha: "",
    });

    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/usuarios/2b05")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar os dados do usuário");
                }
                return response.json();
            })
            .then((data) =>
                setFormData({
                    nome: data.nome || "",
                    cpf: data.cpf || "",
                    telefone: data.telefone || "",
                    email: data.email || "",
                    genero: data.genero || "",
                    nascimento: data.dataNascimento || "",
                    senha: "",
                    confirmarSenha: "",
                })
            )
            .catch(() => setError(true));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        fetch("http://localhost:3001/usuarios/2b05", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao salvar as alterações");
                }
                return response.json();
            })
            .then(() => alert("Alterações salvas com sucesso!"))
            .catch(() => alert("Erro ao salvar as alterações"));
    };

    const handleDataNascimentoChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        if (value.length <= 8) {
            value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
        }
        setFormData({ ...formData, nascimento: value });
    };

    const handleTelefoneChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        setFormData({ ...formData, telefone: value });
    };

    if (error) {
        return <div>Erro ao carregar os dados do usuário</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <img src={HomeIcon} alt="icone-tela-inicial" />
                <span>MINHA CONTA</span>
            </div>

            <div className="section">
                <hr />
                <div className="section-title">
                    <img src={DadosIcon} alt="icone-dados-basicos" />
                    <span>Dados Básicos</span>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="nome"
                        className="input-field"
                        placeholder="Nome Completo"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cpf"
                        className="input-field"
                        placeholder="CPF"
                        value={(formData.cpf || "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                        disabled
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="telefone"
                        className="input-field"
                        placeholder="Telefone"
                        value={(formData.telefone || "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                        onChange={handleTelefoneChange}
                    />
                    <input
                        type="text"
                        name="email"
                        className="input-field"
                        placeholder="E-mail"
                        value={formData.email}
                        disabled
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="genero"
                        className="input-field"
                        placeholder="Gênero"
                        value={formData.genero}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nascimento"
                        placeholder="Data de nascimento"
                        className="input-field"
                        value={(formData.nascimento || "").replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")}
                        onChange={handleDataNascimentoChange}
                    />
                </div>
            </div>

            <div className="section">
                <hr />
                <div className="section-title">
                    <img src={SenhaIcon} alt="icone-senha" />
                    <span>Alterar Senha</span>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="senha"
                        className="input-field"
                        placeholder="Nova Senha"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirmarSenha"
                        className="input-field"
                        placeholder="Confirme sua senha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <hr />
            <button className="button" onClick={handleSave}>
                Salvar Alterações
            </button>
        </div>
    );
}

export default MinhaConta;

import React, { useEffect, useState } from "react";
import "./Login.css";
import { LoginType } from "../../types/Login.type";
import { EmpresaType } from "../../types/Empresa.type";
import { fetchApi } from "../../utils/req";

export const Login: React.FC<{
  isLogin: (is: boolean) => void;
}> = ({ isLogin }) => {
  const [empresas, setEmpresas] = useState<EmpresaType[] | null>(null);
  const [loginData, setLoginData] = useState<LoginType>({
    nome: "",
    senha: "",
    codigo: "",
    cargo: "",
    id_empresa: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const result = await fetchApi<{ token: string }>(loginData, "POST", "/login");
    if (result?.token) {
      localStorage.setItem("token", result.token);
      isLogin(true);
      return;
    } 
    console.error("Login falhou");
    isLogin(false);
  };

  useEffect(() => {
    const getEmpresas = async () => {
      try {
        const result = await fetchApi<EmpresaType[]>(null, "GET", "/empresa");
        setEmpresas(result);
      } catch (error) {
        console.error(error);
        setEmpresas(null);
      }
    };
    getEmpresas();
  }, []);

  return (
    <form className="form" id="form">
      <span className="input-span">
        <label htmlFor="nome" className="label">
          nome
        </label>
        <input
          type="text"
          id="nome"
          required
          value={loginData.nome}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="input-span">
        <label htmlFor="senha" className="label">
          senha
        </label>
        <input
          type="password"
          id="senha"
          required
          value={loginData.senha}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="input-span">
        <label htmlFor="codigo" className="label">
          codigo
        </label>
        <input
          type="text"
          id="codigo"
          required
          value={loginData.codigo}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="input-span">
        <label htmlFor="cargo" className="label">
          cargo
        </label>
        <input
          type="text"
          id="cargo"
          required
          value={loginData.cargo}
          onChange={(e) => handleChange(e)}
        />
      </span>
      <span className="input-span">
        <label htmlFor="empresas" className="label">
          empresa
        </label>
        <select
          id="id_empresa"
          required
          value={loginData.id_empresa}
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {empresas?.map((empresa) => (
            <option key={empresa.id_empresa} value={empresa.id_empresa}>
              {empresa.nome_empresa}
            </option>
          ))}
        </select>
      </span>

      <button className="animated-button" onClick={login}>
        <svg
          viewBox="0 0 24 24"
          className="arr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
        <span className="text">SIGN IN</span>
        <span className="circle"></span>
        <svg
          viewBox="0 0 24 24"
          className="arr-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </button>
    </form>
  );
};

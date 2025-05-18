import { JSX, useEffect, useState } from "react";
import { decodeJWT, useJWTToken } from "../../hook/useJwtToken";
import { LoginType } from "../../types/Login.type";
import "./Container.css";
import { Produtos } from "../Produtos/Produtos";
import { fetchApi } from "../../utils/req";
import { Produto } from "../../types/Produto.type";
import { Users } from "../Users/Users";
import { User } from "../../types/User.type";
import { Vendas } from "../Vendas/Vendas";
import { VendasDay } from "../VendasDay/VendasDay";
import { Empresa } from "../Empresa/Empresa";
import { EmpresaType } from "../../types/Empresa.type";
import { Venda } from "../../types/Venda.type";
import { Arquivos } from "../Arquivos/Arquivos";
import { Arquivo } from "../../types/Arquivo.type";
import { ContainerDesktop } from "./ContainerDesktop";
import { ContainerMobile } from "./ContainerMobile";
import {} from "../../asset";

export const Container: React.FC<{ dataUser: LoginType }> = ({ dataUser }) => {
  useJWTToken(dataUser);
  const [ehMobile, setEhMobile] = useState(window.innerWidth <= 768);
  const [component, setComponent] = useState<string>("user");
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const [user, setUser] = useState<User[] | null>(null);
  const [empresa, setEmpresa] = useState<EmpresaType | null>(null);
  const [vendas, setVendas] = useState<Venda[] | null>(null);
  const [arquivos, setArquivos] = useState<Arquivo[] | null>(null);

  const token = sessionStorage.getItem("token");

  const components: Record<string, JSX.Element> = {
    produtos: (
      <Produtos data={produtos} ehMobile={ehMobile} stade={setProdutos} />
    ),
    vendas: <Vendas data={vendas} stade={setVendas} />,
    vendasDay: <VendasDay />,
    arquivos: <Arquivos data={arquivos} ehMobile={ehMobile} />,
    empresa: <Empresa data={empresa} stade={setEmpresa} />,
    user: <Users data={user} ehMobile={ehMobile} />,
  };

  useEffect(() => {
    const handleResize = () => {
      setEhMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = decodeJWT(sessionStorage.getItem("token") || "");

        const [produtos, users, empresa, vendas, arquivos] = await Promise.all([
          fetchApi<Produto[]>(
            null,
            "GET",
            `/produto/empresa/${token?.id_empresa}`,
          ),
          fetchApi<User[]>(null, "POST", `/user/`),
          fetchApi<EmpresaType>(null, "GET", `/empresa/${token?.id_empresa}`),
          fetchApi<Venda[]>(null, "POST", "/venda/"),
          fetchApi<Arquivo[]>(null, "POST", "/arquivo/"),
        ]);

        setProdutos(produtos);
        setUser(users);
        setEmpresa(empresa);
        setVendas(vendas);
        setArquivos(arquivos);
      } catch (error) {
        console.error(error);
        setProdutos(null);
        setUser(null);
        setVendas(null);
        setArquivos(null);
      }
    };
    fetchAllData();
  }, [token]);

  return ehMobile ? (
    <ContainerMobile
      children={components[component]}
      ehMobile={ehMobile}
      onTroca={setComponent}
    />
  ) : (
    <ContainerDesktop
      children={components[component]}
      ehMobile={ehMobile}
      onTroca={setComponent}
    />
  );
};

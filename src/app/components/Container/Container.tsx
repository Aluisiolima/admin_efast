import { JSX, useEffect, useState } from "react";
import { useJWTToken } from "../../hook/useJwtToken";
import "./Container.css";
import { Produtos } from "../Produtos/Produtos";
import { Users } from "../Users/Users";
import { Vendas } from "../Vendas/Vendas";
import { VendasDay } from "../VendasDay/VendasDay";
import { Empresa } from "../Empresa/Empresa";
import { Arquivos } from "../Arquivos/Arquivos";
import { ContainerDesktop } from "./ContainerDesktop";
import { ContainerMobile } from "./ContainerMobile";
import {} from "../../asset";
import { ProdutosDesativados } from "../Produtos/ProdutosDesativados";

export const Container: React.FC = () => {
  useJWTToken();
  const [ehMobile, setEhMobile] = useState(window.innerWidth <= 768);
  const [component, setComponent] = useState<string>("user");

  const components: Record<string, JSX.Element> = {
    produtos: <Produtos ehMobile={ehMobile} />,
    produtosDesativados: <ProdutosDesativados ehMobile={ehMobile} />,
    vendas: <Vendas />,
    vendasDay: <VendasDay />,
    arquivos: <Arquivos ehMobile={ehMobile} />,
    empresa: <Empresa />,
    user: <Users ehMobile={ehMobile} />,
  };

  useEffect(() => {
    const handleResize = () => {
      setEhMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

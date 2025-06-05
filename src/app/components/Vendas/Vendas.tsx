import { useState } from "react";
import { Venda } from "../../types/Venda.type";
import "./Vendas.css";
import { DetalhesVendas } from "../DetalhesVendas/DetalhesVendas";
import { useDados } from "../../hook/useDados";
import { fetchApi } from "../../utils/req";

export const Vendas: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detalhes, setDetalhes] = useState<Venda | null>(null);
  const { data, isLoading, error, refetch } = useDados<Venda[]>({
    nameDate: "vendas",
    queryFn: async () => {
      return await fetchApi<Venda[]>(null, "POST", "/venda/");
    },
  });

  if (isLoading) {
    return <>Carragando...</>;
  }

  if (error) {
    return (
      <div>
        Erro ao carregar vendas, espere um pouco ja estamos resolvendo o
        problema
      </div>
    );
  }

  const icons = {
    pendente: "bi bi-x-lg",
    entregue: "bi bi-check-lg",
    cancelado: "bi bi-check-lg",
  };

  const mostrarDetalhes = (data_pedido: string) => {
    const venda = data?.find((v) => v.data_pedido === data_pedido);
    setDetalhes(venda ?? null);
    setIsOpen(true);
  };

  return (
    <>
      <div className="_div2">
        {data?.map((venda, index) => {
          return (
            <div
              className="cards_venda"
              key={index}
              onClick={() => mostrarDetalhes(venda.data_pedido)}
            >
              <div
                className="card_status"
                style={{ color: venda.status !== "entregue" ? "red" : "green" }}
              >
                <i className={icons[venda.status]}></i>
              </div>
              <p>{venda.data_pedido}</p>
            </div>
          );
        })}
      </div>
      <div className="other" id="other">
        {isOpen ? (
          <DetalhesVendas
            data={detalhes as Venda}
            exit={setIsOpen}
            stade={refetch}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

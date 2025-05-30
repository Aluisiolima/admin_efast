import { useEffect, useRef, useState } from "react";
import { Venda } from "../../types/Venda.type";
import { fetchApi } from "../../utils/req";
import { DetalhesVendas } from "../DetalhesVendas/DetalhesVendas";

export const VendasDay: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detalhes, setDetalhes] = useState<Venda | null>(null);
  const ultimoIdVenda = useRef<number | null>(null);

  useEffect(() => {
    try {
      const getVendas = async () => {
        const result = await fetchApi<Venda[]>(null, "POST", "/venda/hoje");

        if (result.length > 0 && result[0].id !== ultimoIdVenda.current) {
          ultimoIdVenda.current = result[0].id;
          setVendas(result);
        }
      };
      getVendas();

      const timer = setInterval(getVendas, 30000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      setVendas([]);
    }
  }, []);

  async function modificarVenda(
    id: number,
    status: "pendente" | "entregue" | "cancelado",
  ) {
    const venda = vendas.find((v) => v.id === id);
    if (!venda) return;
    venda.status = status;
  }

  if (!vendas) {
    return <>Carregando...</>;
  }

  const mostrarDetalhes = (data_pedido: string) => {
    const venda = vendas.find((v) => v.data_pedido === data_pedido);
    setDetalhes(venda ?? null);
    setIsOpen(true);
  };

  const icons = {
    pendente: "bi bi-x-lg",
    entregue: "bi bi-check-lg",
    cancelado: "bi bi-check-lg",
  };
  return (
    <>
      <div className="_div2">
        {vendas.map((venda, index) => {
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
            stade={() => modificarVenda(detalhes?.id || 0, "entregue")}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

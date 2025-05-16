import { Venda } from "../../types/Venda.type";
import { fetchApi } from "../../utils/req";

interface DetalhesVendasPros {
  data: Venda;
  exit: (is: boolean) => void;
  stade: (v: Venda[]) => void;
}

export const DetalhesVendas: React.FC<DetalhesVendasPros> = ({
  data,
  exit,
  stade,
}) => {
  const updateStatus = async (id: number) => {
    try {
      await fetchApi<{ message: string }>(
        { status: "Entregue" },
        "POST",
        `/pedido/status/${id}`,
      );
      const resultNew = await fetchApi<Venda[]>(null, "POST", `/venda/`);
      stade(resultNew);
      exit(false);
    } catch (error) {
      console.error(error);
      exit(false);
    }
  };

  return (
    <div className="details">
      <div className="btn_exit">
        <button onClick={() => exit(false)}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <h2>Venda</h2>
      <div className="details_client">
        <h3>
          client: {data.cliente} - R$ {data.valor_total}
        </h3>
      </div>
      <div className="details_sale">
        <h3>Detalhes:</h3>
        <ul>
          <li className="sale_details">Pagamento : {data.tipo_pagamento}</li>
          <li className="sale_details">Endereço : {data.endereco}</li>
          <li className="sale_details">Mesa : {data.mesa}</li>
          <li className="sale_details">Data : {data.data_pedido}</li>
          <li className="sale_details">Status : {data.status}</li>
        </ul>
      </div>
      <div className="details_sale">
        <h3>Produtos:</h3>
        <ul>
          {data.produtos.map((data) => {
            return (
              <li>
                {data.nome_produto} R$ {data.valor} nº {data.quantidade}{" "}
                desconto {data.desconto}%
              </li>
            );
          })}
        </ul>
      </div>
      <div className="btn_ok">
        <button onClick={() => updateStatus(data.id)}>Pronto</button>
      </div>
    </div>
  );
};

import { Produto } from "../../types/Produto.type";
import "./Produtos.css";
import { ImageError } from "../../utils/ImageErro";
import { ReactNode, useState } from "react";
import { NewProduct } from "../Form/NewProduct";
import { fetchApi } from "../../utils/req";
import { UpdateProduto } from "../Form/UpdateProduct";

interface ProdutosPros {
  data: Produto[] | null;
  ehMobile: boolean;
  stade: (p: Produto[]) => void;
}
export const Produtos: React.FC<ProdutosPros> = ({ data, ehMobile, stade }) => {
  const [form, setForm] = useState<string>("default");
  const [produto, setProduto] = useState<Produto | null>(null);

  if (!data) {
    return <div>Carregando...</div>;
  }

  const exit = () => {
    setForm("default");
  };

  const update = async (id: number) => {
    try {
      const result = await fetchApi<Produto>(null, "GET", `/produto/${id}`);
      setProduto(result);
      setForm("updateProduto");
    } catch (error) {
      setForm("default");
    }
  };

  const forms: Record<string, ReactNode> = {
    default: <></>,
    newProduct: <NewProduct exit={exit} success={stade} />,
    updateProduto: (
      <UpdateProduto data={produto as Produto} exit={exit} success={stade} />
    ),
  };

  return (
    <>
      <div className={"_div" + (ehMobile ? "_mobile" : "")} id="cards">
        {data.map((produto) => {
          return (
            <div
              className="cards_produto"
              key={produto.id_produto}
              onClick={() => update(produto.id_produto)}
            >
              <img
                src={produto.path}
                alt="imagem_user"
                className="img_user"
                onError={(e) => ImageError(produto.tipo, e)}
              />
              <p>{produto.nome_produto}</p>
              <p>{produto.valor}</p>
              <p>{produto.desconto}%</p>
            </div>
          );
        })}
      </div>
      <div className="btn_insert" onClick={() => setForm("newProduct")}>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="other" id="other">
        {forms[form]}
      </div>
    </>
  );
};

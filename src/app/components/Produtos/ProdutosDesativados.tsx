import { useDados } from "../../hook/useDados";
import { Produto } from "../../types/Produto.type";
import { ImageError } from "../../utils/ImageErro";
import { fetchApi } from "../../utils/req";

export const ProdutosDesativados: React.FC<{ ehMobile: boolean }> = ({
  ehMobile,
}) => {
  const { data, isLoading, error, refetch } = useDados<Produto[]>({
    nameDate: "produtosDesativados",
    queryFn: async () => {
      return await fetchApi<Produto[]>(null, "POST", `/produto/desativados/`);
    },
  });

  const ativa = async (id: number) => {
    try {
      await fetchApi<Produto>(null, "POST", `/produto/ativa/${id}`);
      refetch();
    } catch (error) {
      console.error("Erro ao ativar produto:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return (
      <div>
        Erro ao carregar produtos desativados, espere um pouco, já estamos
        resolvendo o problema.
      </div>
    );
  }

  return (
    <div
      className={"_div" + (ehMobile ? "_mobile" : "")}
      id="cards"
      style={{ position: "static" }}
    >
      {data?.map((produto) => {
        return (
          <div className="cards_produto" key={produto.id_produto}>
            <img
              src={process.env.REACT_APP_LINK_IMG + produto.path}
              alt="imagem_user"
              className="img_user"
              onError={(e) => ImageError(produto.tipo, e)}
            />
            <p>{produto.nome_produto}</p>
            <p>{produto.valor}</p>
            <p>{produto.desconto}%</p>
            <button
              style={{
                fontWeight: "bold",
                width: "65%",
                color: "var(--bg-light)",
                background: "var(--clr)",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                transition: "all 0.3s ease",
              }}
              onClick={() => ativa(produto.id_produto)}
            >
              Ativar
            </button>
          </div>
        );
      })}
    </div>
  );
};

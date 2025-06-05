import { notFound } from "../../asset";
import { Arquivo } from "../../types/Arquivo.type";
import "./Arquivos.css";
import { fetchApi } from "../../utils/req";
import { useDados } from "../../hook/useDados";

export const CardArquivos: React.FC<{
  setIdArquivo: (id: number) => void;
}> = ({ setIdArquivo }) => {
  const { data, isLoading, error } = useDados<Arquivo[]>({
    nameDate: "arquivos",
    queryFn: async () => {
      return await fetchApi<Arquivo[]>(null, "POST", "/arquivo");
    },
  });

  if (isLoading) {
    return <>Carregando...</>;
  }

  if (error) {
    return (
      <div>
        Erro ao carregar arquivos, espere um pouco ja estamos resolvendo o
        problema
      </div>
    );
  }

  return (
    <>
      <div
        className={"_div_mobile"}
        id="cards"
        style={{ height: "auto", width: "90%" }}
      >
        {data?.map((arquivo, index) => {
          return (
            <div
              className="file_card"
              key={index}
              onClick={() => setIdArquivo(arquivo.id_arquivo)}
            >
              <img
                src={process.env.REACT_APP_LINK_IMG + arquivo.path}
                alt={arquivo.tipo}
                onError={(e) => ((e.target as HTMLImageElement).src = notFound)}
              />
              <p>{arquivo.tipo}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

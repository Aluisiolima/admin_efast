import { useState } from "react";
import { notFound } from "../../asset";
import { Arquivo } from "../../types/Arquivo.type";
import "./Arquivos.css";
import { UploadImagem } from "../Form/UploadImagem";
import { fetchApi } from "../../utils/req";
import { useDados } from "../../hook/useDados";

export const Arquivos: React.FC<{
  ehMobile: boolean;
}> = ({ ehMobile }) => {
  const [form, setForm] = useState<"uploadImagem" | null>(null);
  const { data, isLoading, error, refetch } = useDados<Arquivo[]>({
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

  const handleRemove = async (id: number) => {
    const idConfirm: boolean = window.confirm(
      "Tem certeza que deseja remover este arquivo?",
    );

    if (idConfirm) {
      await fetchApi<{ message: string }>(
        null,
        "DELETE",
        `/arquivo/delete/${id}`,
      );
      refetch();
    }
  };

  return (
    <>
      <div className={"_div" + (ehMobile ? "_mobile" : "")} id="cards">
        {data?.map((arquivo, index) => {
          return (
            <div className="file_card" key={index}>
              <img
                src={process.env.REACT_APP_LINK_IMG + arquivo.path}
                alt={arquivo.tipo}
                onError={(e) => ((e.target as HTMLImageElement).src = notFound)}
              />
              <p>{arquivo.tipo}</p>
              <div>
                <button
                  onClick={() => handleRemove(arquivo.id_arquivo)}
                  className="btn_remove"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="btn_insert" onClick={() => setForm("uploadImagem")}>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="other" id="other">
        {form !== null ? (
          <UploadImagem exit={() => setForm(null)} success={refetch} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

import { notFound } from "../../asset";
import { Arquivo } from "../../types/Arquivo.type";
import "./Arquivos.css";

export const Arquivos: React.FC<{
  data: Arquivo[] | null;
  ehMobile: boolean;
}> = ({ data, ehMobile }) => {
  if (!data) {
    return <>Carregando...</>;
  }

  return (
    <>
      <div className={"_div" + (ehMobile ? "_mobile" : "")} id="cards">
        {data.map((arquivo, index) => {
          return (
            <div className="file_card" key={index}>
              <img
                src={arquivo.path}
                alt={arquivo.tipo}
                onError={(e) => ((e.target as HTMLImageElement).src = notFound)}
              />
              <p>{arquivo.tipo}</p>
            </div>
          );
        })}
      </div>
      <div className="btn_insert">
        <i className="bi bi-plus-lg"></i>
      </div>
    </>
  );
};

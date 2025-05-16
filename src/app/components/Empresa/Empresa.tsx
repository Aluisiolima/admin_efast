import { EmpresaType } from "../../types/Empresa.type";
import logo from "../../asset/image.png";
import "./Empresa.css";
import { ReactNode, useState } from "react";
import { UpdateEmpresa } from "../Form/UpdateEmpresa";
import { AddFrete } from "../Form/AddFrete";

interface EmpresaPros {
  data: EmpresaType | null;
  stade: (e: EmpresaType) => void;
}
export const Empresa: React.FC<EmpresaPros> = ({ data, stade }) => {
  const [form, setForm] = useState<string>("default");

  if (!data) {
    return <>Carregando...</>;
  }

  const forms: Record<string, ReactNode> = {
    default: <></>,
    addFrete: <AddFrete exit={() => setForm("default")} />,
    updateEmpresa: (
      <UpdateEmpresa
        data={data}
        exit={() => setForm("default")}
        success={stade}
      />
    ),
  };

  const qrcode = async () => {
    const imagem = await fetch(`${process.env.REACT_APP_LINK_API}/qrcode`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    const blob = await imagem.blob(); // Converte a imagem recebida
    const urlTemporaria = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlTemporaria;
    a.download = `qrcode_${data.nome_empresa}.png`; // Nome do arquivo que será baixado
    a.click();
  };

  return (
    <>
      <div className="bussiness">
        <img
          src={data.path}
          alt="logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logo;
          }}
        />
        <p>{data.nome_empresa}</p>
        <button
          className="btns_bussiness"
          onClick={() => setForm("updateEmpresa")}
        >
          editar empressa
        </button>
        <button className="btns_bussiness" onClick={() => qrcode()}>
          gera qrcode
        </button>
        <button className="btns_bussiness" onClick={() => setForm("addFrete")}>
          frete
        </button>
      </div>
      <div className="other" id="other">
        {forms[form]}
      </div>
    </>
  );
};

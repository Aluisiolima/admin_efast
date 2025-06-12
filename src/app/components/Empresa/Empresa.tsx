import { EmpresaType } from "../../types/Empresa.type";
import logo from "../../asset/image.png";
import "./Empresa.css";
import { ReactNode, useState } from "react";
import { UpdateEmpresa } from "../Form/UpdateEmpresa";
import { AddFrete } from "../Form/AddFrete";
import { fetchApi } from "../../utils/req";
import { useDados } from "../../hook/useDados";
import { decodeJWT } from "../../hook/useJwtToken";

export const Empresa: React.FC = () => {
  const token = decodeJWT(localStorage.getItem("token") || "");
  const [form, setForm] = useState<string>("default");
  const { data, isLoading, error, refetch } = useDados<EmpresaType>({
    nameDate: "empresa",
    queryFn: async () => {
      return await fetchApi<EmpresaType>(
        null,
        "GET",
        `/empresa/${token?.id_empresa}`,
      );
    },
  });

  if (isLoading) {
    return <>Carregando...</>;
  }

  if (error) {
    return <>Erro ao carregar empresa</>;
  }

  const forms: Record<string, ReactNode> = {
    default: <></>,
    addFrete: <AddFrete exit={() => setForm("default")} />,
    updateEmpresa: (
      <UpdateEmpresa
        data={data as EmpresaType}
        exit={() => setForm("default")}
        success={refetch}
      />
    ),
  };

  const qrcode = async () => {
    const imagem = await fetch(`${process.env.REACT_APP_LINK_API}/qrcode`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const blob = await imagem.blob(); // Converte a imagem recebida
    const urlTemporaria = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlTemporaria;
    a.download = `qrcode_${data?.nome_empresa}.png`; // Nome do arquivo que será baixado
    a.click();
  };

  return (
    <>
      <div className="bussiness">
        <img
          src={process.env.REACT_APP_LINK_IMG + (data?.path as string)}
          alt="logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logo;
          }}
        />
        <p className="name_empresa">{data?.nome_empresa}</p>
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

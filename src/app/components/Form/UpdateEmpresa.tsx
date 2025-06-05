import { useState } from "react";
import { EmpresaUpdate, EmpresaType } from "../../types/Empresa.type";
import "./Form.css";
import { fetchApi } from "../../utils/req";
import { UploadImagem } from "./UploadImagem";

interface UpdateEmpresaPros {
  data: EmpresaType;
  exit: () => void;
  success: () => void;
}

export const UpdateEmpresa: React.FC<UpdateEmpresaPros> = ({
  data,
  exit,
  success,
}) => {
  const [openImg, setOpenImg] = useState<boolean>(false);
  const [dateUpdate, setDateUpdate] = useState<EmpresaUpdate>({
    id: data.id_empresa,
    nome: data.nome_empresa,
    email: data.email,
    endereco: data.endereco,
    facebook: data.facebook,
    instagram: data.instagram,
    whatsapp: data.whatsapp,
    logo: data.logo_img,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDateUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateEmpresa = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await fetchApi<{ message: string }>(dateUpdate, "PUT", "/empresa/update");

      success();
      exit();
    } catch (error) {
      console.error(error);
      exit();
    }
  };

  return (
    <form className="details" id="meuForm">
      <div className="btn_exit">
        <button onClick={() => exit()}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="input-field">
        <input
          type="text"
          id="name"
          required
          autoComplete="off"
          name="nome"
          value={dateUpdate.nome}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="nome">nome</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          id="price"
          required
          autoComplete="off"
          name="endereco"
          value={dateUpdate.endereco}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="endereco">endereco</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          id="price"
          required
          autoComplete="off"
          name="instagram"
          value={dateUpdate.instagram || ""}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="instagram">instagram</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          id="price"
          required
          autoComplete="off"
          name="whatsapp"
          value={dateUpdate.whatsapp}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="whatsapp">whatsapp</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          id="discount"
          required
          autoComplete="off"
          name="facebook"
          value={dateUpdate.facebook || ""}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="facebook">facebook</label>
      </div>
      <div className="actions_btn">
        <button
          type="button"
          className="btn_success"
          onClick={() => setOpenImg(true)}
          style={{ marginTop: "10px" }}
        >
          Altera Imagem
        </button>
        <button className="btn_success" onClick={(e) => updateEmpresa(e)}>
          Ok
        </button>
      </div>
      <div className="other" id="other">
        {openImg ? (
          <UploadImagem
            exit={() => setOpenImg(false)}
            setIdImage={(id: number) => {
              setDateUpdate((prev) => ({ ...prev, logo: id }));
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

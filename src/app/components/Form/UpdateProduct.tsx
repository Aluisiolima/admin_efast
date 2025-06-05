import { useEffect, useState } from "react";
import { Produto, TypeProdutos, UpdateProduct } from "../../types/Produto.type";
import { fetchApi } from "../../utils/req";
import { decodeJWT } from "../../hook/useJwtToken";
import { ImageError } from "../../utils/ImageErro";
import { UploadImagem } from "./UploadImagem";

interface UpdateProdutoPros {
  exit: () => void;
  data: Produto;
  success: () => void;
}

export const UpdateProduto: React.FC<UpdateProdutoPros> = ({
  data,
  exit,
  success,
}) => {
  const [notType, setNotType] = useState<boolean>(false);
  const [types, setTypes] = useState<TypeProdutos[] | null>(null);
  const [openImg, setOpenImg] = useState<boolean>(false);
  const [dateUpdate, setDateUpdate] = useState<UpdateProduct>({
    id: data.id_produto,
    desconto: data.desconto,
    descricao: data.descricao,
    nome: data.nome_produto,
    tipo: data.tipo,
    valor: data.valor,
    path: data.path,
    id_img: data.id_img,
  });

  useEffect(() => {
    const token = decodeJWT(localStorage.getItem("token") || "");
    const getTypes = async () => {
      try {
        const result = await fetchApi<TypeProdutos[]>(
          null,
          "POST",
          `/produto/getTypes/${token?.id_empresa}`,
        );
        setTypes(result);
      } catch (error) {
        console.error(error);
        setTypes(null);
      }
    };
    getTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setDateUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProduto = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await fetchApi<{ message: string }>(dateUpdate, "PUT", "/produto/update");

      success();
      exit();
    } catch (error) {
      console.error(error);
      exit();
    }
  };

  const remove = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetchApi<{ message: string }>(
      dateUpdate,
      "DELETE",
      `/produto/desativa/${id}`,
    );

    success();
    exit();
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
          id="valor"
          required
          autoComplete="off"
          name="valor"
          value={dateUpdate.valor}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="valor">valor</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          id="discount"
          required
          autoComplete="off"
          name="desconto"
          value={dateUpdate.desconto}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="desconto">desconto</label>
      </div>
      <select
        className="select_date"
        name="tipo"
        onChange={(e) => handleChange(e)}
      >
        <option value={dateUpdate.tipo} onClick={() => setNotType(false)}>
          {data.tipo}
        </option>
        {types?.map((data, index) => {
          return (
            <option
              value={data.tipo}
              onClick={() => setNotType(false)}
              key={index}
            >
              {data.tipo}
            </option>
          );
        })}
        <option value={""} onClick={() => setNotType(true)}>
          outro tipo
        </option>
      </select>
      {notType ? (
        <div className="input-field" id="otherType">
          <input
            type="text"
            autoComplete="off"
            name="tipo"
            value={dateUpdate.tipo}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="tipo">Tipo</label>
        </div>
      ) : (
        <></>
      )}
      <div className="text_area">
        <label htmlFor="descricao" className="label">
          descricao do produto:
        </label>
        <textarea
          className="text-area"
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            fontSize: "1rem",
            padding: "10px",
          }}
          name="descricao"
          value={dateUpdate.descricao ?? ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="input-field" id="otherType">
        <div
          style={{
            margin: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={process.env.REACT_APP_LINK_IMG + (data?.path as string)}
            alt="Preview"
            width="150"
            onError={(e) => ImageError(data.tipo, e)}
          />

          <button
            type="button"
            className="btn_success"
            onClick={() => setOpenImg(true)}
            style={{ marginTop: "10px" }}
          >
            Altera Imagem
          </button>
        </div>
      </div>
      <div className="actions_btn">
        <button
          className="btn_remove"
          onClick={(e) => remove(data.id_produto, e)}
        >
          Remove
        </button>
        <button className="btn_success" onClick={(e) => updateProduto(e)}>
          Ok
        </button>
      </div>
      <div className="other" id="other">
        {openImg ? (
          <UploadImagem
            exit={() => setOpenImg(false)}
            setIdImage={(id: number) => {
              setDateUpdate((prev) => ({ ...prev, id_img: id }));
            }}
            isProduct={true}
          />
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

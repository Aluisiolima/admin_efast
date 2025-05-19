import { useEffect, useState } from "react";
import { NewProduto, Produto, TypeProdutos } from "../../types/Produto.type";
import "./Form.css";
import { decodeJWT } from "../../hook/useJwtToken";
import { fetchApi } from "../../utils/req";

interface NewProductPros {
  exit: () => void;
  success: (p: Produto[]) => void;
}

export const NewProduct: React.FC<NewProductPros> = ({ exit, success }) => {
  const [notType, setNotType] = useState<boolean>(false);
  const [types, setTypes] = useState<TypeProdutos[] | null>(null);
  const token = decodeJWT(sessionStorage.getItem("token") || "");
  const [dateNewProduto, setDateNewProduto] = useState<NewProduto>({
    desconto: 0,
    descricao: null,
    nome: "",
    tipo: "",
    valor: "",
    id_img: 1,
  });

  useEffect(() => {
    const token = decodeJWT(sessionStorage.getItem("token") || "");
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDateNewProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const newProduto = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await fetchApi<{ message: string }>(
        dateNewProduto,
        "POST",
        "/produto/inseri",
      );
      const resultNew = await fetchApi<Produto[]>(
        null,
        "GET",
        `/produto/empresa/${token?.id_empresa}`,
      );
      success(resultNew);
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
          value={dateNewProduto.nome}
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
          name="valor"
          value={dateNewProduto.valor}
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
          value={dateNewProduto.desconto}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="desconto">desconto</label>
      </div>
      <select
        className="select_date"
        name="tipo"
        id="typePrimary"
        onChange={(e) => handleChange(e)}
      >
        <option value="">Selecione um tipo</option>
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
        <option value="" onClick={() => setNotType(true)}>
          Outro tipo
        </option>
      </select>
      {notType ? (
        <div className="input-field" id="otherType">
          <input
            type="text"
            autoComplete="off"
            name="tipo"
            value={dateNewProduto.tipo}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="tipo">Tipo</label>
        </div>
      ) : (
        <></>
      )}
      <div className="text_area">
        <label htmlFor="descricao" className="label">descricao do produto:</label>
      <textarea
      className="text-area"
            maxLength={250}
            style={{
              width: "100%",
              height: "100px",
              fontSize: "1rem",
              padding: "10px"
            }}
            name="descricao"
            value={dateNewProduto.descricao ?? ""}
            onChange={(e) => handleChange(e)}
          />
      </div>
      <div className="actions_btn">
        <button className="btn_success" onClick={(e) => newProduto(e)}>
          Ok
        </button>
      </div>
    </form>
  );
};

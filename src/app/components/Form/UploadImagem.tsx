import React, { useState } from "react";
import { fetchApi } from "../../utils/req";
import { CardArquivos } from "../Arquivos/CardArquivos";

interface UploadImagemProps {
  exit: () => void;
  setIdImage?: (id: number) => void;
  success?: () => void;
  isProduct?: boolean;
}
export const UploadImagem: React.FC<UploadImagemProps> = ({
  exit,
  setIdImage,
  success,
  isProduct = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArquivo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (!arquivo) {
        alert("Selecione uma imagem primeiro!");
        return;
      }

      const formData = new FormData();
      formData.append("img", arquivo);

      console.log(formData);

      const result = await fetchApi<{ mesage: string; id: number }>(
        formData,
        "POST",
        "/arquivo/inserir",
        false,
      );

      setIdImage?.(result?.id);
      success?.();
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    } finally {
      exit();
    }
  };

  return (
    <>
      <form
        className="details"
        id="meuForm"
        style={
          isProduct
            ? {
                height: "80vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                border: "2px solid #ecf0f1",
                borderRadius: "8px",
                padding: "20px",
              }
            : {}
        }
      >
        <div className="btn_exit">
          <button onClick={() => exit()}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <h2 style={{ margin: "20px" }}>Enviar Imagem</h2>
        <p style={{ color: "red" }}>click em PROCURA pra seleciona a foto!!</p>
        <div className="input-field" style={{ margin: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagem}
            required
          />
        </div>

        {preview && (
          <div style={{ margin: "20px" }}>
            <img src={preview} alt="Preview" width="300" />
          </div>
        )}

        <button
          type="button"
          className="btn_success"
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        {isProduct ? (
          <CardArquivos
            setIdArquivo={(id: number) => {
              setIdImage?.(id);
              exit();
            }}
          />
        ) : (
          <></>
        )}
      </form>
    </>
  );
};

import { useState } from "react";
import { Frete } from "../../types/Frete.type";
import "./Form.css";
import { fetchApi } from "../../utils/req";

interface AddFretePros {
  exit: () => void;
}
export const AddFrete: React.FC<AddFretePros> = ({ exit }) => {
  const [dateFrete, setDateFrete] = useState<string>("");

  const updateFrete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      console.error("Geolocalização não é suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const dates: Frete = {
          lat: latitude,
          lon: longitude,
          t_frete: Number(dateFrete),
        };

        await fetchApi<{ message: string }>(dates, "PUT", "/frete/update");
        exit();
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000000,
        maximumAge: 0,
      },
    );
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
          type="number"
          id="name"
          required
          autoComplete="off"
          name="valor"
          placeholder="valor por km"
          value={dateFrete}
          onChange={(e) => setDateFrete(e.target.value)}
        />
      </div>
      <button onClick={(e) => updateFrete(e)} className="btn_success">
        ok
      </button>
    </form>
  );
};

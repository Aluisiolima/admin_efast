import { useState } from "react";
import "./App.css";
import { Login } from "./components/Login/Login";
import { LoginType } from "./types/Login.type";
import { Container } from "./components/Container/Container";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState<LoginType>({
    nome: "",
    senha: "",
    codigo: "",
    cargo: "",
    id_empresa: "",
  });

  return (
    <div className="container" id="container">
      {!isLoggedIn ? (
        <Login isLogin={setIsLoggedIn} setData={setDataUser} />
      ) : (
        <Container dataUser={dataUser} />
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Container } from "./components/Container/Container";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_LINK_API}/login/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (data?.error) {
          console.error(data.error);
          setIsLoggedIn(false);
        } else {
          localStorage.setItem("token", data.data.token);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }

      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container" id="container">
      {!isLoggedIn ? <Login isLogin={setIsLoggedIn} /> : <Container />}
    </div>
  );
};

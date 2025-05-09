import { useState } from "react";
import { Login } from "./components/Login/Login";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container" id="container">
      {!isLoggedIn ? <Login isLogin={setIsLoggedIn} /> : "ja fez o login"}
    </div>
  );
};

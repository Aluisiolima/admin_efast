import "./Nav.css";
import logo from "../../asset/image.png";

export const Nav: React.FC<{ onTroca: (on: string) => void }> = ({
  onTroca,
}) => {
  return (
    <nav className="container_nav">
      <h1 className="title">
        Efast Menu <span className="line"></span>
      </h1>
      <div className="perfil" onClick={() => onTroca("user")}>
        <img src={logo} alt="img perfil" />
      </div>
    </nav>
  );
};

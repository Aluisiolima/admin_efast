import { User } from "../../types/User.type";
import imageUser from "../../asset/image.png";
import "./Users.css";

export const Users: React.FC<{ data: User[] | null; ehMobile: boolean }> = ({
  data,
  ehMobile,
}) => {
  if (!data) {
    return <>Carregando...</>;
  }
  return (
    <div id="cards" className={"_div" + (ehMobile ? "_mobile" : "")}>
      {data.map((user) => {
        return (
          <div className="cards_user" key={user.id_adm}>
            <img src={imageUser} alt="imagem user" className="img_user" />
            <p>{user.nome}</p>
            <p>{user.cargo}</p>
          </div>
        );
      })}
    </div>
  );
};

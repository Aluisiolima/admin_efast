import { User } from "../../types/User.type";
import imageUser from "../../asset/image.png";
import "./Users.css";
import { fetchApi } from "../../utils/req";
import { useDados } from "../../hook/useDados";

export const Users: React.FC<{ ehMobile: boolean }> = ({ ehMobile }) => {
  const { data, isLoading, error } = useDados<User[]>({
    nameDate: "users",
    queryFn: async () => {
      return await fetchApi<User[]>(null, "POST", "/user/");
    },
  });

  if (isLoading) {
    return <>Carregando...</>;
  }

  if (error) {
    return <>Erro ao carregar usuários</>;
  }

  return (
    <div id="cards" className={"_div" + (ehMobile ? "_mobile" : "")}>
      {data?.map((user) => {
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

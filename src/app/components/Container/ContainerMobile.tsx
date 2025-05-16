import { ReactNode, useState } from "react";
import { Menu } from "../Menu/Menu";
import { Main } from "../Main/Main";

interface ContainerPros {
  onTroca: (on: string) => void;
  ehMobile: boolean;
  children: ReactNode;
}

export const ContainerMobile: React.FC<ContainerPros> = ({
  children,
  ehMobile,
  onTroca,
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <>
      <nav className="container_nav">
        <h1 className="title">
          Efast Menu <span className="line"></span>
        </h1>
        <i
          className="bi bi-list"
          style={{ fontSize: "2em" }}
          onClick={() => setOpenMenu(!openMenu)}
        ></i>
      </nav>
      <div className="container_mobile">
        <div
          className="menu_container"
          id="menu"
          style={{ display: openMenu ? "flex" : "none" }}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Menu onTroca={onTroca} ehMobile={ehMobile} />
        </div>
        <div className="container_body_mobile">
          <Main children={children} />
        </div>
      </div>
    </>
  );
};

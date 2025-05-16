import { ReactNode } from "react";
import { Main } from "../Main/Main";
import { Menu } from "../Menu/Menu";
import { Nav } from "../Nav/Nav";

interface ContainerPros {
  onTroca: (on: string) => void;
  ehMobile: boolean;
  children: ReactNode;
}
export const ContainerDesktop: React.FC<ContainerPros> = ({
  children,
  ehMobile,
  onTroca,
}) => {
  return (
    <>
      <Nav onTroca={onTroca} />
      <div className="container_body">
        <div className="container_menu">
          <Menu onTroca={onTroca} ehMobile={ehMobile} />
        </div>
        <Main children={children} />
      </div>
    </>
  );
};

export const Menu: React.FC<{
  onTroca: (on: string) => void;
  ehMobile: boolean;
}> = ({ onTroca, ehMobile }) => {
  const onSair = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className={"menu" + (ehMobile ? "_mobile" : "")}>
        <div className="options" onClick={() => onTroca("produtos")}>
          Produtos
        </div>
        <div className="options" onClick={() => onTroca("produtosDesativados")}>
          Produtos Desativados
        </div>
        <div className="options" onClick={() => onTroca("vendasDay")}>
          Vendas de Hoje
        </div>
        <div className="options" onClick={() => onTroca("vendas")}>
          Todas as Vendas
        </div>
        <div className="options" onClick={() => onTroca("arquivos")}>
          Arquivos
        </div>
        <div className="options" onClick={() => onTroca("empresa")}>
          Empresa
        </div>
        {ehMobile ? (
          <div className="options" onClick={() => onTroca("user")}>
            Usuarios
          </div>
        ) : (
          ""
        )}

        <div>
          <div className="options options_sair" onClick={onSair}>
            Sair
          </div>
        </div>
      </div>
    </>
  );
};

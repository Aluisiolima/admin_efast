import "./Login.css";

export const Login: React.FC<{ isLogin: (is: boolean) => void }> = ({
  isLogin,
}) => {
  const login = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isLogin(true);
    // lógica de login aqui
    console.log("Login iniciado...");
  };

  return (
    <form className="form" id="form">
      <span className="input-span">
        <label htmlFor="nome" className="label">
          nome
        </label>
        <input type="text" name="nome" id="nome" required />
      </span>
      <span className="input-span">
        <label htmlFor="senha" className="label">
          senha
        </label>
        <input type="password" name="senha" id="senha" required />
      </span>
      <span className="input-span">
        <label htmlFor="codigo" className="label">
          codigo
        </label>
        <input type="text" name="codigo" id="codigo" required />
      </span>
      <span className="input-span">
        <label htmlFor="cargo" className="label">
          cargo
        </label>
        <input type="text" name="cargo" id="cargo" required />
      </span>
      <span className="input-span">
        <label htmlFor="empresas" className="label">
          empresa
        </label>
        <select name="id_empresa" id="empresas" required defaultValue="">
          <option value="" disabled>
            Selecione uma opção
          </option>
          {/* opções dinâmicas aqui, se houver */}
        </select>
      </span>

      <button className="animated-button" onClick={login}>
        <svg
          viewBox="0 0 24 24"
          className="arr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
        <span className="text">SIGN IN</span>
        <span className="circle"></span>
        <svg
          viewBox="0 0 24 24"
          className="arr-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </button>
    </form>
  );
};

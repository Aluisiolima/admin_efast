import "./Main.css";
export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="cards" id="options-cards">
      {children}
    </div>
  );
};

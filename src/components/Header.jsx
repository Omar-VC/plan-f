import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const getTitle = () => {
    if (location.pathname === "/") return "Plan F";
    if (location.pathname === "/plantel-superior") return "Plantel Superior";
    if (location.pathname.includes("/asistencias")) return "Asistencias";
    if (location.pathname.includes("/jugadores/")) return "Ficha del Jugador";
    if (location.pathname.includes("/jugadores")) return "Lista de Jugadores";

    return "Plan F";
  };

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex items-center shadow-md">
      {!isHome && (
        <button
          onClick={() => navigate("/", { replace: true })}
          className="text-xl mr-4"
          title="Inicio"
        >
          🏠
        </button>
      )}

      <h1 className="text-lg font-bold">{getTitle()}</h1>
    </header>
  );
}

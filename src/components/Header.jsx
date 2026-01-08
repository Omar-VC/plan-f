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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="flex items-center">
        {!isHome && (
          <button
            onClick={() => navigate("/", { replace: true })}
            className="text-xl mr-4"
            title="Inicio"
          >
            🏠
          </button>
        )}

        <div>
          <h1 className="text-lg font-bold leading-tight">{getTitle()}</h1>
          <p className="text-sm text-gray-300 capitalize">
            Temporada 2026 · {formattedDate}
          </p>
        </div>
      </div>
    </header>
  );
}

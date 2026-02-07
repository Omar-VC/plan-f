import { useLocation, useNavigate } from "react-router-dom";
import { getDivisionLabel, isValidDivision } from "../utils/divisions";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const firstSegment = location.pathname.split("/")[1];
  const currentDivision = isValidDivision(firstSegment)
    ? firstSegment
    : "plantel-superior";

  const getTitle = () => {
    if (isHome) return "Plan F";
    if (location.pathname === `/${currentDivision}`) return getDivisionLabel(currentDivision);
    if (location.pathname.includes("/asistencias")) return "Asistencias";
    if (location.pathname.includes("/jugadores/")) return "Ficha del Jugador";
    if (location.pathname.includes("/jugadores")) return "Lista de Jugadores";
    if (location.pathname.includes("/plan")) return "Plan de Entrenamiento";
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
            {isHome ? "" : `${getDivisionLabel(currentDivision)} · `}
            Temporada 2026 · {formattedDate}
          </p>
        </div>
      </div>
    </header>
  );
}

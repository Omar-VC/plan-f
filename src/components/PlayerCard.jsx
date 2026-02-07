import { Link } from "react-router-dom";
import { getDivisionLabel } from "../utils/divisions";

export default function PlayerCard({ player }) {
  const division = player.division || "plantel-superior";

  return (
    <Link to={`/${division}/jugadores/${player.id}`}>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex items-center space-x-4">
        <img
          src={`/players/${player.foto || "placeholder.png"}`}
          alt={`${player.nombre} ${player.apellido}`}
          className="w-16 h-16 object-cover rounded-full border"
        />

        <div>
          <h3 className="font-semibold text-lg">
            {player.nombre} {player.apellido}
          </h3>
          <p className="text-gray-500 text-sm">
            {player.posicion} · {player.edad} años
          </p>
          <p className="text-gray-500 text-sm">DNI: {player.dni || "—"}</p>
          <p className="text-gray-500 text-sm">
            Categoría: {player.categoria || "plantel-superior"} ·{" "}
            {getDivisionLabel(division)}
          </p>
        </div>
      </div>
    </Link>
  );
}

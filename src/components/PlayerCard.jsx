import { Link } from "react-router-dom";

export default function PlayerCard({ player }) {
  return (
    <Link to={`/plantel-superior/jugadores/${player.id}`}>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
        <h3 className="font-semibold text-lg">
          {player.nombre} {player.apellido}
        </h3>
        <p className="text-gray-500 text-sm">
          {player.posicion} · {player.edad} años
        </p>
      </div>
    </Link>
  );
}

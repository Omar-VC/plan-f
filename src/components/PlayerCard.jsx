import { Link } from "react-router-dom";

export default function PlayerCard({ player }) {
  return (
    <Link to={`/plantel-superior/jugadores/${player.id}`}>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex items-center space-x-4">
        
        {/* 👇 Foto del jugador */}
        <img
          src={`/players/${player.foto || "placeholder.png"}`} // usa placeholder si no hay foto
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
          {/* 👇 nuevo campo DNI */}
          <p className="text-gray-500 text-sm">
            DNI: {player.dni || "—"}
          </p>
        </div>
      </div>
    </Link>
  );
}

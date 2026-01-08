import { useParams } from "react-router-dom";
import { players } from "../data/players";

export default function PlayerDetail() {
  const { id } = useParams();
  const player = players.find(p => p.id === Number(id));

  if (!player) {
    return <p className="p-6">Jugador no encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {player.nombre} {player.apellido}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <p><strong>Edad:</strong> {player.edad}</p>
        <p><strong>Posición:</strong> {player.posicion}</p>
      </div>
    </div>
  );
}

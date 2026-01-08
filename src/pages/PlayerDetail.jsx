import { useParams } from "react-router-dom";
import { usePlayers } from "../context/PlayersContext";
import { getMonthlySummary } from "../utils/attendanceUtils";

export default function PlayerDetail() {
  const { id } = useParams();
  const { players } = usePlayers();

  const player = players.find(p => p.id === Number(id));

  if (!player) {
    return <p className="p-6">Jugador no encontrado</p>;
  }

  const monthlySummary = getMonthlySummary(player.attendance);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {player.nombre} {player.apellido}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p><strong>Edad:</strong> {player.edad}</p>
        <p><strong>Posición:</strong> {player.posicion}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Asistencia mensual
        </h2>

        {Object.keys(monthlySummary).length === 0 && (
          <p className="text-gray-500">
            No hay asistencias registradas.
          </p>
        )}

        {Object.entries(monthlySummary).map(([month, data]) => (
          <div key={month} className="border rounded-lg p-4 mb-3">
            <p className="font-medium">{month}</p>
            <p>Presentes: {data.present} / {data.total}</p>
            <p className="font-semibold">
              Asistencia: {data.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

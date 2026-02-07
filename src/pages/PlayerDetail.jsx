import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPerformanceForm from "../components/EditPerformanceForm";
import EditPlayerForm from "../components/EditPlayerForm";
import PerformanceSection from "../components/PerformanceSection";
import { usePlayers } from "../context/PlayersContext";
import { getMonthlySummary } from "../utils/attendanceUtils";
import { getDivisionLabel, isValidDivision } from "../utils/divisions";

export default function PlayerDetail() {
  const { id, division = "plantel-superior" } = useParams();
  const navigate = useNavigate();
  const { players, clearAttendanceByDate, clearAllAttendance, deletePlayer } = usePlayers();

  const [showEditForm, setShowEditForm] = useState(false);
  const [showPerformanceForm, setShowPerformanceForm] = useState(false);

  const player = useMemo(() => players.find((p) => p.id === id), [players, id]);

  if (!isValidDivision(division)) {
    return <div className="p-6">División no válida.</div>;
  }

  if (!player) {
    return <div className="p-6">Jugador no encontrado</div>;
  }

  const monthlySummary = getMonthlySummary(player.attendanceHistory || []);

  const handleDelete = async () => {
    await deletePlayer(player.id);
    navigate(`/${division}/jugadores`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-1">
        {player.nombre} {player.apellido}
      </h1>
      <p className="text-gray-600 mb-6">{getDivisionLabel(division)}</p>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <img
          src={`/players/${player.foto || "placeholder.png"}`}
          alt={`${player.nombre} ${player.apellido}`}
          className="w-32 h-32 object-cover rounded-full border mb-4"
        />
        <p>
          <strong>Edad:</strong> {player.edad}
        </p>
        <p>
          <strong>Posición:</strong> {player.posicion}
        </p>
        <p>
          <strong>DNI:</strong> {player.dni || "—"}
        </p>
        <p>
          <strong>Categoría:</strong> {player.categoria || "plantel-superior"}
        </p>

        <div className="flex gap-4 mt-4">
          <button onClick={() => setShowEditForm(true)} className="text-blue-600 text-sm">
            Editar
          </button>
          <button onClick={handleDelete} className="text-red-600 text-sm">
            Eliminar
          </button>
        </div>
      </div>

      {showEditForm && <EditPlayerForm player={player} onClose={() => setShowEditForm(false)} />}

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Asistencia mensual</h2>

        {Object.keys(monthlySummary).length === 0 && (
          <p className="text-gray-500">No hay asistencias registradas.</p>
        )}

        {Object.entries(monthlySummary).map(([month, data]) => (
          <div key={month} className="border rounded-lg p-4 mb-3">
            <p className="font-medium">{month}</p>
            <p>
              Presentes: {data.present} / {data.total}
            </p>
            <p className="font-semibold">Asistencia: {data.percentage}%</p>
          </div>
        ))}

        {player.attendanceHistory?.length > 0 && (
          <button
            onClick={() => clearAllAttendance(player.id)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🧹 Limpiar historial completo
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Registro individual</h2>

        {player.attendanceHistory?.length === 0 && (
          <p className="text-gray-500">No hay registros individuales.</p>
        )}

        {player.attendanceHistory?.map((record) => (
          <div key={record.date} className="flex justify-between items-center border-b py-2">
            <span>
              {record.date} – {record.status === "present" && "✔ Asiste"}
              {record.status === "absent" && "❌ Falta"}
              {record.status === "late" && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  ⏱️ Asiste (con tardanza)
                </span>
              )}
            </span>
            <button
              onClick={() => clearAttendanceByDate(player.id, record.date)}
              className="text-sm text-red-600 hover:underline"
            >
              Borrar
            </button>
          </div>
        ))}
      </div>

      {player.rendimiento && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <PerformanceSection rendimiento={player.rendimiento} />
          <button
            onClick={() => setShowPerformanceForm(true)}
            className="mt-4 text-blue-600 text-sm"
          >
            Editar rendimiento
          </button>
        </div>
      )}

      {showPerformanceForm && (
        <EditPerformanceForm player={player} onClose={() => setShowPerformanceForm(false)} />
      )}
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlayers } from "../context/PlayersContext";
import { getMonthlySummary } from "../utils/attendanceUtils";
import EditPlayerForm from "../components/EditPlayerForm";
import PerformanceSection from "../components/PerformanceSection";
import EditPerformanceForm from "../components/EditPerformanceForm";

export default function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { players, deletePlayer, clearAttendanceByDate, clearAllAttendance } =
    usePlayers();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPerformanceForm, setShowPerformanceForm] = useState(false);

  const player = players.find((p) => p.id === id);

  if (!player) {
    return <p className="p-6">Jugador no encontrado</p>;
  }

  const monthlySummary = getMonthlySummary(player.attendanceHistory || []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {player.nombre} {player.apellido}
      </h1>

      {/* Datos generales */}
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
        {/* 👇 nuevo campo DNI */}{" "}
        <p>
          {" "}
          <strong>DNI:</strong> {player.dni || "—"}{" "}
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setShowEditForm(true)}
            className="text-blue-600 text-sm"
          >
            Editar
          </button>

          <button
            onClick={() => {
              deletePlayer(player.id);
              navigate("/plantel-superior/jugadores");
            }}
            className="text-red-600 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario de edición de datos generales */}
      {showEditForm && (
        <EditPlayerForm
          player={player}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {/* Asistencia mensual */}
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

        {/* Botón para limpiar todo el historial */}
        {player.attendanceHistory?.length > 0 && (
          <button
            onClick={() => clearAllAttendance(player.id)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🧹 Limpiar historial completo
          </button>
        )}
      </div>

      {/* Lista de asistencias individuales */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Registro individual</h2>

        {player.attendanceHistory?.length === 0 && (
          <p className="text-gray-500">No hay registros individuales.</p>
        )}

        {player.attendanceHistory?.map((record) => (
          <div
            key={record.date}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {record.date} –{" "}
              {record.status === "present" ? "✔ Asiste" : "❌ Falta"}
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

      {/* Rendimiento físico */}
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

      {/* Formulario de edición de rendimiento */}
      {showPerformanceForm && (
        <EditPerformanceForm
          player={player}
          onSave={(updatedData) => {
            player.rendimiento = updatedData;
            setShowPerformanceForm(false);
          }}
          onClose={() => setShowPerformanceForm(false)}
        />
      )}
    </div>
  );
}

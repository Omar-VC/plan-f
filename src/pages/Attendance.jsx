import { useState } from "react";
import { players } from "../data/players";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  const [attendance, setAttendance] = useState({});

  const markAttendance = (playerId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [playerId]: status,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-2">
        Asistencias
      </h1>

      <p className="text-gray-500 mb-6">
        Fecha: {today}
      </p>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {player.nombre} {player.apellido}
              </p>
              <p className="text-sm text-gray-500">
                {attendance[player.id] || "Sin marcar"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => markAttendance(player.id, "Asiste")}
                className="px-3 py-1 rounded bg-green-500 text-white text-sm"
              >
                Asiste
              </button>

              <button
                onClick={() => markAttendance(player.id, "Falta")}
                className="px-3 py-1 rounded bg-red-500 text-white text-sm"
              >
                Falta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

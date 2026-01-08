import { useState } from "react";
import { players } from "../data/players";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [attendanceData, setAttendanceData] = useState({});

  const markAttendance = (playerId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [playerId]: status,
      },
    }));
  };

  const currentDayAttendance = attendanceData[selectedDate] || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Asistencias
      </h1>

      {/* Selector de fecha */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Fecha
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Lista de jugadores */}
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
                {currentDayAttendance[player.id] || "Sin marcar"}
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

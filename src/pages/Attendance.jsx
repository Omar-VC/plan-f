import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayers } from "../context/PlayersContext";
import { getDivisionLabel, isValidDivision } from "../utils/divisions";

export default function Attendance() {
  const { players, markAttendance } = usePlayers();
  const { division = "plantel-superior" } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const divisionPlayers = useMemo(
    () => players.filter((p) => (p.division || "plantel-superior") === division),
    [players, division]
  );

  if (!isValidDivision(division)) {
    return <div className="p-6">División no válida.</div>;
  }

  const presentCount = divisionPlayers.filter((p) =>
    p.attendanceHistory?.some(
      (h) => h.date === selectedDate && (h.status === "present" || h.status === "late")
    )
  ).length;

  const absentCount = divisionPlayers.filter((p) =>
    p.attendanceHistory?.some((h) => h.date === selectedDate && h.status === "absent")
  ).length;

  const lateCount = divisionPlayers.filter((p) =>
    p.attendanceHistory?.some((h) => h.date === selectedDate && h.status === "late")
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-1">Asistencia – {selectedDate}</h1>
      <p className="text-gray-600 mb-4">{getDivisionLabel(division)}</p>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <div className="mb-4 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Resumen</h2>
        <p className="text-gray-700">
          ✔ Presentes: <strong>{presentCount}</strong> &nbsp; | &nbsp; ✖ Ausentes:{" "}
          <strong>{absentCount}</strong> &nbsp; | &nbsp; ⏱️ Tardanzas:{" "}
          <strong>{lateCount}</strong>
        </p>
      </div>

      {divisionPlayers.map((player) => {
        const status = player.attendanceHistory?.find((h) => h.date === selectedDate)?.status;

        return (
          <div
            key={player.id}
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            <span>
              {player.nombre} {player.apellido}
            </span>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => markAttendance(player.id, selectedDate, "present")}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  status === "present"
                    ? "bg-green-700 shadow-md scale-105"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Asiste {status === "present" && <span className="ml-2">✔️</span>}
              </button>

              <button
                onClick={() => markAttendance(player.id, selectedDate, "absent")}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  status === "absent"
                    ? "bg-red-700 shadow-md scale-105"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Falta {status === "absent" && <span className="ml-2">❌</span>}
              </button>

              <button
                onClick={() => markAttendance(player.id, selectedDate, "late")}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  status === "late"
                    ? "bg-yellow-600 shadow-md scale-105"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                Tardanza {status === "late" && <span className="ml-2">⏱️</span>}
              </button>
            </div>

            {!status && <span className="ml-4 text-gray-400 text-sm">Sin marcar</span>}
          </div>
        );
      })}
    </div>
  );
}

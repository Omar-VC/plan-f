import { usePlayers } from "../context/PlayersContext";

export default function Attendance() {
  const { players, markAttendance } = usePlayers();

  const today = new Date().toISOString().split("T")[0];

  const presentCount = players.filter(
    (p) => p.attendance?.[today] === "present"
  ).length;

  const absentCount = players.filter(
    (p) => p.attendance?.[today] === "absent"
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Asistencia – {today}</h1>
      <div className="mb-4 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Asistencia de hoy</h2>
        <p className="text-gray-700">
          ✔ Presentes: <strong>{presentCount}</strong> &nbsp; | &nbsp; ✖
          Ausentes: <strong>{absentCount}</strong>
        </p>
      </div>

      {players.map((player) => {
        const todayStatus = player.attendance?.[today];

        return (
          <div
            key={player.id}
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            <span>
              {player.nombre} {player.apellido}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => markAttendance(player.id, today, "present")}
                className={`px-3 py-1 rounded text-white flex items-center gap-2 transition
                  ${
                    todayStatus === "present"
                      ? "bg-green-600"
                      : "bg-green-400 hover:bg-green-500"
                  }`}
              >
                Asiste
                {todayStatus === "present" && <span>✔</span>}
              </button>

              <button
                onClick={() => markAttendance(player.id, today, "absent")}
                className={`px-3 py-1 rounded text-white flex items-center gap-2 transition
    ${todayStatus === "absent" ? "bg-red-600" : "bg-red-400 hover:bg-red-500"}`}
              >
                Falta
                {todayStatus === "absent" && <span>✖</span>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

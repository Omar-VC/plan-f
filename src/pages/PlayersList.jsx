import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AddPlayerForm from "../components/AddPlayerForm";
import PlayerCard from "../components/PlayerCard";
import { usePlayers } from "../context/PlayersContext";
import { getDivisionLabel, isValidDivision } from "../utils/divisions";

export default function PlayersList() {
  const { players } = usePlayers();
  const { division = "plantel-superior" } = useParams();
  const [showForm, setShowForm] = useState(false);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const playerDivision = player.division || "plantel-superior";
      return playerDivision === division;
    });
  }, [players, division]);

  if (!isValidDivision(division)) {
    return <div className="p-6">División no válida.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-2">Lista de jugadores</h1>
      <p className="text-gray-600 mb-6">{getDivisionLabel(division)}</p>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {showForm ? "Cerrar formulario" : "+ Agregar jugador"}
      </button>

      {showForm && (
        <AddPlayerForm
          division={division}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-4">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

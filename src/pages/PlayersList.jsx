import { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import AddPlayerForm from "../components/AddPlayerForm"; // asegúrate de tener este componente creado
import { usePlayers } from "../context/PlayersContext";

export default function PlayersList() {
  const { players } = usePlayers();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de jugadores</h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {showForm ? "Cerrar formulario" : "+ Agregar jugador"}
      </button>

      {showForm && <AddPlayerForm onClose={() => setShowForm(false)} />}

      <div className="grid gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

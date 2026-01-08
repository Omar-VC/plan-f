import { players } from "../data/players";
import PlayerCard from "../components/PlayerCard";

export default function PlayersList() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Lista de jugadores
      </h1>

      <div className="grid gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

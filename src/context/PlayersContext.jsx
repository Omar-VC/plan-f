import { createContext, useContext, useState } from "react";
import { players as initialPlayers } from "../data/players";

const PlayersContext = createContext();


export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState(initialPlayers);

  // Marcar asistencia
  const markAttendance = (playerId, date, status) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              attendance: {
                ...player.attendance,
                [date]: status,
              },
            }
          : player
      )
    );
  };

  // Agregar nuevo jugador
  const addPlayer = (newPlayer) => {
    setPlayers((prev) => [
      ...prev,
      {
        id: Date.now(),
        attendance: {},
        rendimiento: {},
        ...newPlayer,
      },
    ]);
  };

  // Eliminar jugador
  const deletePlayer = (playerId) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
  };

  // Actualizar datos del jugador
  const updatePlayer = (playerId, updatedData) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId ? { ...player, ...updatedData } : player
      )
    );
  };

  return (
    <PlayersContext.Provider
      value={{ players, addPlayer, markAttendance, deletePlayer, updatePlayer }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  return useContext(PlayersContext);
}

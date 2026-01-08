import { createContext, useContext, useState } from "react";
import { players as initialPlayers } from "../data/players";

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState(initialPlayers);

  // Marcar asistencia
  const markAttendance = (playerId, date, status) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? {
              ...player,
              attendance: {
                ...player.attendance,
                [date]: status
              }
            }
          : player
      )
    );
  };

  return (
    <PlayersContext.Provider
      value={{ players, markAttendance }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  return useContext(PlayersContext);
}

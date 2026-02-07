import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDivisionFromCategory } from "../utils/divisions";

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snapshot) => {
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setPlayers(data);
    });

    return () => unsub();
  }, []);

  const addPlayer = async (newPlayer) => {
    const categoria = newPlayer.categoria || "plantel-superior";
    const division = newPlayer.division || getDivisionFromCategory(categoria);

    await addDoc(collection(db, "players"), {
      attendanceHistory: [],
      rendimiento: {},
      categoria,
      division,
      ...newPlayer,
    });
  };

  const deletePlayer = async (playerId) => {
    await deleteDoc(doc(db, "players", playerId));
  };

  const updatePlayer = async (playerId, updatedData) => {
    const payload = { ...updatedData };

    if (payload.categoria) {
      payload.division = getDivisionFromCategory(payload.categoria);
    }

    await updateDoc(doc(db, "players", playerId), payload);
  };

  const markAttendance = async (playerId, date, status) => {
    const playerRef = doc(db, "players", playerId);
    const player = players.find((p) => p.id === playerId);
    const history = player?.attendanceHistory || [];

    const existingIndex = history.findIndex((h) => h.date === date);

    let updatedHistory;
    if (existingIndex >= 0) {
      updatedHistory = [...history];
      updatedHistory[existingIndex] = {
        ...updatedHistory[existingIndex],
        status,
      };
    } else {
      updatedHistory = [...history, { date, status }];
    }

    await updateDoc(playerRef, {
      attendanceHistory: updatedHistory,
    });
  };

  const clearAttendanceByDate = async (playerId, date) => {
    const playerRef = doc(db, "players", playerId);
    const player = players.find((p) => p.id === playerId);
    const history = player?.attendanceHistory || [];

    const updatedHistory = history.filter((h) => h.date !== date);

    await updateDoc(playerRef, { attendanceHistory: updatedHistory });
  };

  const clearAllAttendance = async (playerId) => {
    const playerRef = doc(db, "players", playerId);
    await updateDoc(playerRef, { attendanceHistory: [] });
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        addPlayer,
        markAttendance,
        clearAttendanceByDate,
        clearAllAttendance,
        deletePlayer,
        updatePlayer,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  return useContext(PlayersContext);
}

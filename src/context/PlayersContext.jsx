import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(data);
    });
    return () => unsub();
  }, []);

  const addPlayer = async (newPlayer) => {
    await addDoc(collection(db, "players"), {
      attendanceHistory: [],   // ✅ inicializamos con array
      rendimiento: {},
      ...newPlayer,
    });
  };

  const deletePlayer = async (playerId) => {
    await deleteDoc(doc(db, "players", playerId));
  };

  const updatePlayer = async (playerId, updatedData) => {
    await updateDoc(doc(db, "players", playerId), updatedData);
  };

  const markAttendance = async (playerId, date, status) => {
    const playerRef = doc(db, "players", playerId);
    const player = players.find((p) => p.id === playerId);
    const history = player.attendanceHistory || [];

    const existingIndex = history.findIndex((h) => h.date === date);

    let updatedHistory;
    if (existingIndex >= 0) {
      updatedHistory = [...history];
      updatedHistory[existingIndex].status = status;
    } else {
      updatedHistory = [...history, { date, status }];
    }

    await updateDoc(playerRef, {
      attendanceHistory: updatedHistory,
    });
  };

  // ✅ limpiar una fecha puntual
  const clearAttendanceByDate = async (playerId, date) => {
    const playerRef = doc(db, "players", playerId);
    const player = players.find((p) => p.id === playerId);
    const history = player.attendanceHistory || [];

    const updatedHistory = history.filter((h) => h.date !== date);

    await updateDoc(playerRef, { attendanceHistory: updatedHistory });
  };

  // ✅ limpiar todo el historial
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

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
      attendance: {},
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
    await updateDoc(playerRef, {
      [`attendance.${date}`]: status,
    });
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

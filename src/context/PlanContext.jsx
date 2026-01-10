// context/PlanContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlans(data);
    });
    return () => unsub();
  }, []);

  // Crear un nuevo plan (ej: temporada)
  const addPlan = async (newPlan) => {
    await addDoc(collection(db, "plans"), {
      seasonYear: new Date().getFullYear(),
      objectives: { annual: "", monthly: [] },
      weeklyPlans: [],
      ...newPlan,
    });
  };

  // Actualizar un plan existente
  const updatePlan = async (planId, updatedData) => {
    await updateDoc(doc(db, "plans", planId), updatedData);
  };

  // Eliminar un plan
  const deletePlan = async (planId) => {
    await deleteDoc(doc(db, "plans", planId));
  };

  return (
    <PlanContext.Provider
      value={{ plans, addPlan, updatePlan, deletePlan }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}

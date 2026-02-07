import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
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

  const addPlan = async (newPlan) => {
    await addDoc(collection(db, "plans"), newPlan);
  };

  return (
    <PlanContext.Provider value={{ plans, addPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}

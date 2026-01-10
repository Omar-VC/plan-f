// pages/Plan.jsx
import { useState } from "react";
import { usePlan } from "../context/PlanContext";

export default function Plan() {
  const { plans, addPlan, updatePlan, deletePlan } = usePlan();
  const [annualObjective, setAnnualObjective] = useState("");

  const [newMonth, setNewMonth] = useState("");
  const [newObjective, setNewObjective] = useState("");

  const [newWeek, setNewWeek] = useState("");
  const [newWeekObjective, setNewWeekObjective] = useState("");

  const handleCreatePlan = () => {
    addPlan({
      seasonYear: new Date().getFullYear(),
      objectives: { annual: "", monthly: [] },
      weeklyPlans: [],
    });
  };

  const handleUpdateAnnualObjective = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    updatePlan(planId, {
      objectives: { ...plan.objectives, annual: annualObjective },
    });
    setAnnualObjective("");
  };

  const handleAddMonthlyObjective = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    const updatedMonthly = [
      ...(plan.objectives.monthly || []),
      { month: newMonth, focus: newObjective },
    ];
    updatePlan(planId, {
      objectives: { ...plan.objectives, monthly: updatedMonthly },
    });
    setNewMonth("");
    setNewObjective("");
  };

  const handleEditMonthlyObjective = (planId, idx, currentMonth, currentFocus) => {
    const nuevoMes = prompt("Editar mes:", currentMonth);
    const nuevoFocus = prompt("Editar objetivo:", currentFocus);
    if (nuevoMes && nuevoFocus) {
      const plan = plans.find((p) => p.id === planId);
      const updatedMonthly = plan.objectives.monthly.map((obj, i) =>
        i === idx ? { month: nuevoMes, focus: nuevoFocus } : obj
      );
      updatePlan(planId, {
        objectives: { ...plan.objectives, monthly: updatedMonthly },
      });
    }
  };

  const handleAddWeeklyPlan = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    const updatedWeeks = [
      ...(plan.weeklyPlans || []),
      { week: newWeek, objective: newWeekObjective },
    ];
    updatePlan(planId, { weeklyPlans: updatedWeeks });
    setNewWeek("");
    setNewWeekObjective("");
  };

  const handleEditWeeklyPlan = (planId, idx, currentWeek, currentObjective) => {
    const nuevoWeek = prompt("Editar semana:", currentWeek);
    const nuevoObjective = prompt("Editar objetivo:", currentObjective);
    if (nuevoWeek && nuevoObjective) {
      const plan = plans.find((p) => p.id === planId);
      const updatedWeeks = plan.weeklyPlans.map((obj, i) =>
        i === idx ? { week: nuevoWeek, objective: nuevoObjective } : obj
      );
      updatePlan(planId, { weeklyPlans: updatedWeeks });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Plan de Entrenamiento</h1>

      <button
        onClick={handleCreatePlan}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        ➕ Crear nuevo plan
      </button>

      <div className="mt-6">
        {plans.length === 0 ? (
          <p className="text-gray-500">No hay planes registrados.</p>
        ) : (
          <ul className="space-y-6">
            {plans.map((plan) => (
              <li key={plan.id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold">Temporada {plan.seasonYear}</p>
                    <p className="text-gray-600">
                      Objetivo anual: {plan.objectives?.annual || "Sin definir"}
                    </p>
                  </div>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>

                {/* Objetivo anual */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Objetivo anual"
                    value={annualObjective}
                    onChange={(e) => setAnnualObjective(e.target.value)}
                    className="border px-2 py-1 rounded w-2/3"
                  />
                  <button
                    onClick={() => handleUpdateAnnualObjective(plan.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Guardar
                  </button>
                </div>

                {/* Objetivos mensuales */}
                <h3 className="text-lg font-semibold mb-2">Objetivos mensuales</h3>
                {plan.objectives?.monthly?.length > 0 ? (
                  <ul className="list-disc pl-6 mb-4">
                    {plan.objectives.monthly.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div>
                          <strong>{m.month}:</strong> {m.focus}
                        </div>
                        <button
                          onClick={() =>
                            handleEditMonthlyObjective(plan.id, idx, m.month, m.focus)
                          }
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Editar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mb-4">No hay objetivos mensuales.</p>
                )}

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Mes"
                    value={newMonth}
                    onChange={(e) => setNewMonth(e.target.value)}
                    className="border px-2 py-1 rounded w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="Objetivo"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    className="border px-2 py-1 rounded w-2/3"
                  />
                  <button
                    onClick={() => handleAddMonthlyObjective(plan.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    ➕ Agregar
                  </button>
                </div>

                {/* Plan semanal */}
                <h3 className="text-lg font-semibold mb-2">Plan semanal</h3>
                {plan.weeklyPlans?.length > 0 ? (
                  <ul className="list-disc pl-6 mb-4">
                    {plan.weeklyPlans.map((w, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div>
                          <strong>{w.week}:</strong> {w.objective}
                        </div>
                        <button
                          onClick={() =>
                            handleEditWeeklyPlan(plan.id, idx, w.week, w.objective)
                          }
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Editar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mb-4">No hay semanas cargadas.</p>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Semana"
                    value={newWeek}
                    onChange={(e) => setNewWeek(e.target.value)}
                    className="border px-2 py-1 rounded w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="Objetivo"
                    value={newWeekObjective}
                    onChange={(e) => setNewWeekObjective(e.target.value)}
                    className="border px-2 py-1 rounded w-2/3"
                  />
                  <button
                    onClick={() => handleAddWeeklyPlan(plan.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    ➕ Agregar semana
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


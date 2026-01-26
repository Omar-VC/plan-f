// pages/Plan.jsx
import { useState } from "react";
import { usePlan } from "../context/PlanContext";

export default function Plan() {
  const { plans, addPlan, updatePlan, deletePlan } = usePlan();

  // Inputs globales por plan (para evitar colisiones entre varios planes en pantalla)
  const [annualInputs, setAnnualInputs] = useState({}); // { [planId]: "texto" }
  const [monthlyInputs, setMonthlyInputs] = useState({}); // { [planId]: { month: "", objective: "" } }
  const [weeklyInputs, setWeeklyInputs] = useState({}); // { [planId_monthIdx]: { week: "", objective: "" } }
  const [sessionInputs, setSessionInputs] = useState({}); // { [planId_monthIdx_weekIdx]: { date:"", type:"", notes:"" } }

  const handleCreatePlan = () => {
    addPlan({
      seasonYear: new Date().getFullYear(),
      objectives: { annual: "", monthly: [] },
      weeklyPlans: [], // legacy field (no usado si usamos monthly.weeklyPlans)
    });
  };

  /* ---------- ANUAL ---------- */
  const handleChangeAnnual = (planId, value) => {
    setAnnualInputs((s) => ({ ...s, [planId]: value }));
  };

  const handleSaveAnnual = (planId) => {
    const value = annualInputs[planId] ?? "";
    const plan = plans.find((p) => p.id === planId);
    updatePlan(planId, {
      objectives: { ...plan.objectives, annual: value },
    });
    setAnnualInputs((s) => ({ ...s, [planId]: "" }));
  };

  /* ---------- MENSUAL ---------- */
  const handleChangeMonthlyInput = (planId, field, value) => {
    setMonthlyInputs((s) => ({
      ...s,
      [planId]: { ...(s[planId] || { month: "", objective: "" }), [field]: value },
    }));
  };

  const handleAddMonthlyObjective = (planId) => {
    const input = monthlyInputs[planId] || { month: "", objective: "" };
    if (!input.month) return;
    const plan = plans.find((p) => p.id === planId);
    const updatedMonthly = [...(plan.objectives?.monthly || []), { month: input.month, focus: input.objective || "", weeklyPlans: [] }];
    updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
    setMonthlyInputs((s) => ({ ...s, [planId]: { month: "", objective: "" } }));
  };

  const handleEditMonthly = (planId, monthIdx) => {
    const plan = plans.find((p) => p.id === planId);
    const current = plan.objectives?.monthly?.[monthIdx];
    if (!current) return;
    const nuevoMes = prompt("Editar mes:", current.month);
    const nuevoFocus = prompt("Editar objetivo mensual:", current.focus);
    if (nuevoMes !== null && nuevoFocus !== null) {
      const updatedMonthly = plan.objectives.monthly.map((m, i) => (i === monthIdx ? { ...m, month: nuevoMes, focus: nuevoFocus } : m));
      updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
    }
  };

  const handleDeleteMonthly = (planId, monthIdx) => {
    const plan = plans.find((p) => p.id === planId);
    const updatedMonthly = (plan.objectives?.monthly || []).filter((_, i) => i !== monthIdx);
    updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
  };

  /* ---------- SEMANAL (dentro del mes) ---------- */
  const keyWeek = (planId, monthIdx) => `${planId}_${monthIdx}`;
  const handleChangeWeeklyInput = (planId, monthIdx, field, value) => {
    const key = keyWeek(planId, monthIdx);
    setWeeklyInputs((s) => ({ ...s, [key]: { ...(s[key] || { week: "", objective: "" }), [field]: value } }));
  };

  const handleAddWeeklyToMonth = (planId, monthIdx) => {
    const key = keyWeek(planId, monthIdx);
    const input = weeklyInputs[key] || { week: "", objective: "" };
    if (!input.week) return;
    const plan = plans.find((p) => p.id === planId);
    const monthly = plan.objectives?.monthly || [];
    const monthObj = monthly[monthIdx] || { weeklyPlans: [] };
    const updatedMonth = { ...monthObj, weeklyPlans: [...(monthObj.weeklyPlans || []), { week: input.week, objective: input.objective || "", dailySessions: [] }] };
    const updatedMonthly = monthly.map((m, i) => (i === monthIdx ? updatedMonth : m));
    updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
    setWeeklyInputs((s) => ({ ...s, [key]: { week: "", objective: "" } }));
  };

  const handleEditWeekly = (planId, monthIdx, weekIdx) => {
    const plan = plans.find((p) => p.id === planId);
    const weekObj = plan.objectives.monthly[monthIdx].weeklyPlans[weekIdx];
    const nuevoWeek = prompt("Editar semana:", weekObj.week);
    const nuevoObjective = prompt("Editar objetivo semanal:", weekObj.objective);
    if (nuevoWeek !== null && nuevoObjective !== null) {
      const updatedMonthly = plan.objectives.monthly.map((m, mi) =>
        mi === monthIdx
          ? { ...m, weeklyPlans: m.weeklyPlans.map((w, wi) => (wi === weekIdx ? { ...w, week: nuevoWeek, objective: nuevoObjective } : w)) }
          : m
      );
      updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
    }
  };

  const handleDeleteWeekly = (planId, monthIdx, weekIdx) => {
    const plan = plans.find((p) => p.id === planId);
    const updatedMonthly = plan.objectives.monthly.map((m, mi) =>
      mi === monthIdx ? { ...m, weeklyPlans: m.weeklyPlans.filter((_, wi) => wi !== weekIdx) } : m
    );
    updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
  };

  /* ---------- SESIONES DIARIAS (dentro de la semana) ---------- */
  const keySession = (planId, monthIdx, weekIdx) => `${planId}_${monthIdx}_${weekIdx}`;
  const handleChangeSessionInput = (planId, monthIdx, weekIdx, field, value) => {
    const key = keySession(planId, monthIdx, weekIdx);
    setSessionInputs((s) => ({ ...s, [key]: { ...(s[key] || { date: "", type: "", notes: "" }), [field]: value } }));
  };

  const handleAddSession = (planId, monthIdx, weekIdx) => {
    const key = keySession(planId, monthIdx, weekIdx);
    const input = sessionInputs[key] || { date: "", type: "", notes: "" };
    if (!input.date) return;
    const plan = plans.find((p) => p.id === planId);
    const updatedMonthly = plan.objectives.monthly.map((m, mi) =>
      mi === monthIdx
        ? {
            ...m,
            weeklyPlans: m.weeklyPlans.map((w, wi) =>
              wi === weekIdx ? { ...w, dailySessions: [...(w.dailySessions || []), { date: input.date, type: input.type || "", notes: input.notes || "" }] } : w
            ),
          }
        : m
    );
    updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
    setSessionInputs((s) => ({ ...s, [key]: { date: "", type: "", notes: "" } }));
  };

  const handleEditSession = (planId, monthIdx, weekIdx, sessionIdx) => {
    const plan = plans.find((p) => p.id === planId);
    const session = plan.objectives.monthly[monthIdx].weeklyPlans[weekIdx].dailySessions[sessionIdx];
    const nuevaFecha = prompt("Editar fecha (YYYY-MM-DD):", session.date);
    const nuevoTipo = prompt("Editar tipo de trabajo:", session.type);
    const nuevasNotas = prompt("Editar notas:", session.notes);
    if (nuevaFecha !== null && nuevoTipo !== null && nuevasNotas !== null) {
      const updatedMonthly = plan.objectives.monthly.map((m, mi) =>
        mi === monthIdx
          ? {
              ...m,
              weeklyPlans: m.weeklyPlans.map((w, wi) =>
                wi === weekIdx
                  ? { ...w, dailySessions: w.dailySessions.map((s, si) => (si === sessionIdx ? { date: nuevaFecha, type: nuevoTipo, notes: nuevasNotas } : s)) }
                  : w
              ),
            }
          : m
      );
      updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
    }
  };

  const handleDeleteSession = (planId, monthIdx, weekIdx, sessionIdx) => {
    const plan = plans.find((p) => p.id === planId);
    const updatedMonthly = plan.objectives.monthly.map((m, mi) =>
      mi === monthIdx
        ? {
            ...m,
            weeklyPlans: m.weeklyPlans.map((w, wi) =>
              wi === weekIdx ? { ...w, dailySessions: w.dailySessions.filter((_, si) => si !== sessionIdx) } : w
            ),
          }
        : m
    );
    updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
  };

  /* ---------- RENDER ---------- */
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
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold">Temporada {plan.seasonYear}</p>
                    <p className="text-gray-600">Objetivo anual: {plan.objectives?.annual || "Sin definir"}</p>
                  </div>
                  <button onClick={() => deletePlan(plan.id)} className="text-sm text-red-600 hover:underline">
                    Eliminar
                  </button>
                </div>

                {/* Editar objetivo anual (input simple) */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Objetivo anual"
                    value={annualInputs[plan.id] ?? ""}
                    onChange={(e) => handleChangeAnnual(plan.id, e.target.value)}
                    className="border px-2 py-1 rounded w-2/3"
                  />
                  <button onClick={() => handleSaveAnnual(plan.id)} className="bg-blue-600 text-white px-3 py-1 rounded">
                    Guardar
                  </button>
                </div>

                {/* Mensuales: tarjetas */}
                <h3 className="text-lg font-semibold mb-2">Objetivos mensuales</h3>
                {plan.objectives?.monthly?.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {plan.objectives.monthly.map((m, monthIdx) => (
                      <div key={monthIdx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold">{m.month}</h4>
                            <p className="text-sm text-gray-600">Objetivo: {m.focus}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <button onClick={() => handleEditMonthly(plan.id, monthIdx)} className="text-sm text-blue-600 hover:underline">
                              Editar mes
                            </button>
                            <button onClick={() => handleDeleteMonthly(plan.id, monthIdx)} className="text-sm text-red-600 hover:underline">
                              Eliminar mes
                            </button>
                          </div>
                        </div>

                        {/* Semanas dentro del mes */}
                        <div className="mb-3">
                          <h5 className="font-semibold mb-1">Semanas</h5>
                          {m.weeklyPlans?.length > 0 ? (
                            <ul className="list-disc pl-6 mb-2">
                              {m.weeklyPlans.map((w, weekIdx) => (
                                <li key={weekIdx} className="mb-2">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <strong>{w.week}:</strong> {w.objective}
                                    </div>
                                    <div className="flex gap-2">
                                      <button onClick={() => handleEditWeekly(plan.id, monthIdx, weekIdx)} className="text-sm text-blue-600 hover:underline">
                                        Editar
                                      </button>
                                      <button onClick={() => handleDeleteWeekly(plan.id, monthIdx, weekIdx)} className="text-sm text-red-600 hover:underline">
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>

                                  {/* Sesiones diarias dentro de la semana */}
                                  <div className="mt-2 ml-4">
                                    <p className="text-sm font-medium mb-1">Sesiones</p>
                                    {w.dailySessions?.length > 0 ? (
                                      <ul className="list-disc pl-6 mb-2">
                                        {w.dailySessions.map((s, sessionIdx) => (
                                          <li key={sessionIdx} className="flex justify-between items-start mb-1">
                                            <div className="text-sm">
                                              <strong>{s.date}:</strong> {s.type} — {s.notes}
                                            </div>
                                            <div className="flex gap-2">
                                              <button onClick={() => handleEditSession(plan.id, monthIdx, weekIdx, sessionIdx)} className="text-sm text-blue-600 hover:underline">
                                                Editar
                                              </button>
                                              <button onClick={() => handleDeleteSession(plan.id, monthIdx, weekIdx, sessionIdx)} className="text-sm text-red-600 hover:underline">
                                                Eliminar
                                              </button>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-xs text-gray-500 mb-2">No hay sesiones cargadas.</p>
                                    )}

                                    {/* Formulario para agregar sesión */}
                                    <div className="flex flex-col gap-2">
                                      <input
                                        type="date"
                                        value={sessionInputs[keySession(plan.id, monthIdx, weekIdx)]?.date ?? ""}
                                        onChange={(e) => handleChangeSessionInput(plan.id, monthIdx, weekIdx, "date", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Tipo de trabajo"
                                        value={sessionInputs[keySession(plan.id, monthIdx, weekIdx)]?.type ?? ""}
                                        onChange={(e) => handleChangeSessionInput(plan.id, monthIdx, weekIdx, "type", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Notas"
                                        value={sessionInputs[keySession(plan.id, monthIdx, weekIdx)]?.notes ?? ""}
                                        onChange={(e) => handleChangeSessionInput(plan.id, monthIdx, weekIdx, "notes", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                      />
                                      <button
                                        onClick={() => handleAddSession(plan.id, monthIdx, weekIdx)}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                      >
                                        ➕ Agregar sesión
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-gray-500 mb-2">No hay semanas cargadas.</p>
                          )}

                          {/* Formulario para agregar semana */}
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              placeholder="Semana (ej. Semana 1)"
                              value={weeklyInputs[keyWeek(plan.id, monthIdx)]?.week ?? ""}
                              onChange={(e) => handleChangeWeeklyInput(plan.id, monthIdx, "week", e.target.value)}
                              className="border px-2 py-1 rounded w-1/3"
                            />
                            <input
                              type="text"
                              placeholder="Objetivo semanal"
                              value={weeklyInputs[keyWeek(plan.id, monthIdx)]?.objective ?? ""}
                              onChange={(e) => handleChangeWeeklyInput(plan.id, monthIdx, "objective", e.target.value)}
                              className="border px-2 py-1 rounded w-2/3"
                            />
                            <button onClick={() => handleAddWeeklyToMonth(plan.id, monthIdx)} className="bg-green-600 text-white px-3 py-1 rounded">
                              ➕ Agregar semana
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">No hay objetivos mensuales.</p>
                )}

                {/* Formulario para agregar objetivo mensual */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mes"
                    value={monthlyInputs[plan.id]?.month ?? ""}
                    onChange={(e) => handleChangeMonthlyInput(plan.id, "month", e.target.value)}
                    className="border px-2 py-1 rounded w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="Objetivo"
                    value={monthlyInputs[plan.id]?.objective ?? ""}
                    onChange={(e) => handleChangeMonthlyInput(plan.id, "objective", e.target.value)}
                    className="border px-2 py-1 rounded w-2/3"
                  />
                  <button onClick={() => handleAddMonthlyObjective(plan.id)} className="bg-green-600 text-white px-3 py-1 rounded">
                    ➕ Agregar
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


